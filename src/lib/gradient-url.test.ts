import { describe, it, expect } from "vitest";
import {
  encodeGradient,
  decodeGradient,
  encodeGradientToParams,
  decodeGradientFromParams,
  gradientToCSS,
  parseGradientCSS,
  createGradient,
  getGradientColors,
  isValidHexColor,
  isValidGradientDefinition,
  type GradientDefinition,
} from "./gradient-url";

describe("isValidHexColor", () => {
  it("accepts valid 6-digit hex colors", () => {
    expect(isValidHexColor("667eea")).toBe(true);
    expect(isValidHexColor("FFFFFF")).toBe(true);
    expect(isValidHexColor("000000")).toBe(true);
    expect(isValidHexColor("AbCdEf")).toBe(true);
  });

  it("rejects invalid hex colors", () => {
    expect(isValidHexColor("#667eea")).toBe(false); // Has #
    expect(isValidHexColor("fff")).toBe(false); // 3 digits
    expect(isValidHexColor("gggggg")).toBe(false); // Invalid chars
    expect(isValidHexColor("")).toBe(false);
    expect(isValidHexColor("667eea00")).toBe(false); // 8 digits
  });
});

describe("isValidGradientDefinition", () => {
  it("accepts valid gradient definitions", () => {
    const valid: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(isValidGradientDefinition(valid)).toBe(true);
  });

  it("rejects invalid gradient type", () => {
    const invalid = {
      type: "invalid" as any,
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it("rejects invalid angle", () => {
    const invalid: GradientDefinition = {
      type: "linear",
      angle: 400,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it("rejects fewer than 2 stops", () => {
    const invalid: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [{ color: "667eea", position: 0 }],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it("rejects invalid color in stops", () => {
    const invalid: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "invalid", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it("rejects invalid position in stops", () => {
    const invalid: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: -10 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });
});

describe("encodeGradient (internal storage format)", () => {
  it("encodes a simple 2-color linear gradient with default angle", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    // Format: colors|type|angle (no stops if evenly distributed)
    expect(encodeGradient(gradient)).toBe("667eea-764ba2|linear|135");
  });

  it("encodes a 3-color gradient with even distribution", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff6b6b", position: 0 },
        { color: "fec89a", position: 50 },
        { color: "fff3b0", position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe("ff6b6b-fec89a-fff3b0|linear|90");
  });

  it("encodes a gradient with custom stop positions", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 30 }, // Non-default position
        { color: "ffffff", position: 100 },
      ],
    };
    // Should include stops since not evenly distributed
    expect(encodeGradient(gradient)).toBe(
      "667eea-764ba2-ffffff|linear|135|0-30-100",
    );
  });

  it("encodes a radial gradient", () => {
    const gradient: GradientDefinition = {
      type: "radial",
      angle: 0,
      stops: [
        { color: "3b82f6", position: 0 },
        { color: "1d4ed8", position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe("3b82f6-1d4ed8|radial|0");
  });

  it("encodes a conic gradient", () => {
    const gradient: GradientDefinition = {
      type: "conic",
      angle: 45,
      stops: [
        { color: "ec4899", position: 0 },
        { color: "8b5cf6", position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe("ec4899-8b5cf6|conic|45");
  });

  it("normalizes colors to lowercase", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "AABBCC", position: 0 },
        { color: "DDEEFF", position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe("aabbcc-ddeeff|linear|135");
  });
});

describe("decodeGradient (internal storage format)", () => {
  it("decodes a simple 2-color linear gradient", () => {
    const result = decodeGradient("667eea-764ba2|linear|135");
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("decodes a 3-color gradient with even distribution", () => {
    const result = decodeGradient("ff6b6b-fec89a-fff3b0|linear|90");
    expect(result).toEqual({
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff6b6b", position: 0 },
        { color: "fec89a", position: 50 },
        { color: "fff3b0", position: 100 },
      ],
    });
  });

  it("decodes a gradient with custom stop positions", () => {
    const result = decodeGradient("667eea-764ba2-ffffff|linear|135|0-30-100");
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 30 },
        { color: "ffffff", position: 100 },
      ],
    });
  });

  it("decodes a radial gradient", () => {
    const result = decodeGradient("3b82f6-1d4ed8|radial|0");
    expect(result).toEqual({
      type: "radial",
      angle: 0,
      stops: [
        { color: "3b82f6", position: 0 },
        { color: "1d4ed8", position: 100 },
      ],
    });
  });

  it("returns null for invalid type", () => {
    expect(decodeGradient("667eea-764ba2|invalid|135")).toBe(null);
  });

  it("returns null for invalid angle", () => {
    expect(decodeGradient("667eea-764ba2|linear|400")).toBe(null);
    expect(decodeGradient("667eea-764ba2|linear|abc")).toBe(null);
  });

  it("returns null for invalid color", () => {
    expect(decodeGradient("gggggg-764ba2|linear|135")).toBe(null);
  });

  it("returns null for fewer than 2 colors", () => {
    expect(decodeGradient("667eea|linear|135")).toBe(null);
  });

  it("returns null for empty string", () => {
    expect(decodeGradient("")).toBe(null);
  });

  it("returns null for null/undefined", () => {
    expect(decodeGradient(null as any)).toBe(null);
    expect(decodeGradient(undefined as any)).toBe(null);
  });

  it("normalizes colors to lowercase", () => {
    const result = decodeGradient("AABBCC-DDEEFF|linear|135");
    expect(result?.stops[0]?.color).toBe("aabbcc");
    expect(result?.stops[1]?.color).toBe("ddeeff");
  });
});

describe("Legacy format backwards compatibility", () => {
  it("decodes legacy format: type,angle,color1:stop1,color2:stop2", () => {
    const result = decodeGradient("linear,135,667eea:0,764ba2:100");
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("decodes legacy format with 3 colors", () => {
    const result = decodeGradient("linear,90,ff6b6b:0,fec89a:50,fff3b0:100");
    expect(result).toEqual({
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff6b6b", position: 0 },
        { color: "fec89a", position: 50 },
        { color: "fff3b0", position: 100 },
      ],
    });
  });

  it("decodes legacy radial gradient", () => {
    const result = decodeGradient("radial,0,3b82f6:0,1d4ed8:100");
    expect(result).toEqual({
      type: "radial",
      angle: 0,
      stops: [
        { color: "3b82f6", position: 0 },
        { color: "1d4ed8", position: 100 },
      ],
    });
  });
});

describe("encodeGradientToParams (URL format)", () => {
  it("encodes minimal params for linear gradient with defaults", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    const params = encodeGradientToParams(gradient);
    // Only g should be present (type=linear and angle=135 are defaults)
    expect(params).toEqual({ g: "667eea-764ba2" });
  });

  it("includes type for non-linear gradients", () => {
    const gradient: GradientDefinition = {
      type: "radial",
      angle: 0, // Default for radial
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    const params = encodeGradientToParams(gradient);
    expect(params).toEqual({ g: "667eea-764ba2", type: "radial" });
  });

  it("includes angle when non-default", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 90, // Not default 135
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    const params = encodeGradientToParams(gradient);
    expect(params).toEqual({ g: "667eea-764ba2", angle: "90" });
  });

  it("includes stops when not evenly distributed", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 30 },
        { color: "ffffff", position: 100 },
      ],
    };
    const params = encodeGradientToParams(gradient);
    expect(params).toEqual({ g: "667eea-764ba2-ffffff", stops: "0-30-100" });
  });

  it("encodes conic gradient with custom angle", () => {
    const gradient: GradientDefinition = {
      type: "conic",
      angle: 45, // Not default 0
      stops: [
        { color: "ec4899", position: 0 },
        { color: "8b5cf6", position: 100 },
      ],
    };
    const params = encodeGradientToParams(gradient);
    expect(params).toEqual({ g: "ec4899-8b5cf6", type: "conic", angle: "45" });
  });
});

describe("decodeGradientFromParams (URL format)", () => {
  it("decodes minimal params", () => {
    const params = new URLSearchParams("g=667eea-764ba2");
    const result = decodeGradientFromParams(params);
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("decodes with explicit type", () => {
    const params = new URLSearchParams("g=667eea-764ba2&type=radial");
    const result = decodeGradientFromParams(params);
    expect(result).toEqual({
      type: "radial",
      angle: 0, // Default for radial
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("decodes with explicit angle", () => {
    const params = new URLSearchParams("g=667eea-764ba2&angle=90");
    const result = decodeGradientFromParams(params);
    expect(result).toEqual({
      type: "linear",
      angle: 90,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("decodes with custom stops", () => {
    const params = new URLSearchParams("g=667eea-764ba2-ffffff&stops=0-30-100");
    const result = decodeGradientFromParams(params);
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 30 },
        { color: "ffffff", position: 100 },
      ],
    });
  });

  it("decodes 5-color rainbow gradient", () => {
    const params = new URLSearchParams("g=fde047-22c55e-22d3ee-d946ef-ef4444");
    const result = decodeGradientFromParams(params);
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "fde047", position: 0 },
        { color: "22c55e", position: 25 },
        { color: "22d3ee", position: 50 },
        { color: "d946ef", position: 75 },
        { color: "ef4444", position: 100 },
      ],
    });
  });

  it("decodes legacy format from URL", () => {
    // Legacy format in g param: type,angle,color:stop,color:stop
    const params = new URLSearchParams("g=linear,135,667eea:0,764ba2:100");
    const result = decodeGradientFromParams(params);
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("returns null when g param is missing", () => {
    const params = new URLSearchParams("type=radial&angle=90");
    const result = decodeGradientFromParams(params);
    expect(result).toBe(null);
  });

  it("returns null for invalid colors", () => {
    const params = new URLSearchParams("g=gggggg-764ba2");
    const result = decodeGradientFromParams(params);
    expect(result).toBe(null);
  });
});

describe("encodeGradient + decodeGradient roundtrip", () => {
  it("roundtrips a linear gradient", () => {
    const original: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    const encoded = encodeGradient(original);
    const decoded = decodeGradient(encoded);
    expect(decoded).toEqual(original);
  });

  it("roundtrips a complex gradient with custom stops", () => {
    const original: GradientDefinition = {
      type: "conic",
      angle: 270,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 33 },
        { color: "0000ff", position: 66 },
        { color: "ff0000", position: 100 },
      ],
    };
    const encoded = encodeGradient(original);
    const decoded = decodeGradient(encoded);
    expect(decoded).toEqual(original);
  });

  it("roundtrips a radial gradient", () => {
    const original: GradientDefinition = {
      type: "radial",
      angle: 0,
      stops: [
        { color: "3b82f6", position: 0 },
        { color: "1d4ed8", position: 100 },
      ],
    };
    const encoded = encodeGradient(original);
    const decoded = decodeGradient(encoded);
    expect(decoded).toEqual(original);
  });
});

describe("URL params roundtrip", () => {
  it("roundtrips minimal linear gradient through URL params", () => {
    const original: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    const params = encodeGradientToParams(original);
    const urlParams = new URLSearchParams(params);
    const decoded = decodeGradientFromParams(urlParams);
    expect(decoded).toEqual(original);
  });

  it("roundtrips radial gradient through URL params", () => {
    const original: GradientDefinition = {
      type: "radial",
      angle: 0,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 100 },
      ],
    };
    const params = encodeGradientToParams(original);
    const urlParams = new URLSearchParams(params);
    const decoded = decodeGradientFromParams(urlParams);
    expect(decoded).toEqual(original);
  });

  it("roundtrips gradient with custom stops through URL params", () => {
    const original: GradientDefinition = {
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 25 },
        { color: "0000ff", position: 100 },
      ],
    };
    const params = encodeGradientToParams(original);
    const urlParams = new URLSearchParams(params);
    const decoded = decodeGradientFromParams(urlParams);
    expect(decoded).toEqual(original);
  });
});

describe("gradientToCSS", () => {
  it("generates linear gradient CSS", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    );
  });

  it("generates radial gradient CSS", () => {
    const gradient: GradientDefinition = {
      type: "radial",
      angle: 0,
      stops: [
        { color: "3b82f6", position: 0 },
        { color: "1d4ed8", position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      "radial-gradient(circle, #3B82F6 0%, #1D4ED8 100%)",
    );
  });

  it("generates conic gradient CSS", () => {
    const gradient: GradientDefinition = {
      type: "conic",
      angle: 45,
      stops: [
        { color: "ec4899", position: 0 },
        { color: "8b5cf6", position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      "conic-gradient(from 45deg, #EC4899 0%, #8B5CF6 100%)",
    );
  });

  it("handles multi-stop gradients", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 50 },
        { color: "0000ff", position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      "linear-gradient(90deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)",
    );
  });
});

describe("parseGradientCSS", () => {
  it("parses linear gradient CSS", () => {
    const css = "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)";
    const result = parseGradientCSS(css);
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("parses radial gradient CSS", () => {
    const css = "radial-gradient(circle, #3B82F6 0%, #1D4ED8 100%)";
    const result = parseGradientCSS(css);
    expect(result).toEqual({
      type: "radial",
      angle: 0, // Default angle for radial
      stops: [
        { color: "3b82f6", position: 0 },
        { color: "1d4ed8", position: 100 },
      ],
    });
  });

  it("parses multi-stop gradient", () => {
    const css = "linear-gradient(90deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)";
    const result = parseGradientCSS(css);
    expect(result).toEqual({
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 50 },
        { color: "0000ff", position: 100 },
      ],
    });
  });

  it("returns null for invalid CSS", () => {
    expect(parseGradientCSS("")).toBe(null);
    expect(parseGradientCSS("not-a-gradient")).toBe(null);
    expect(parseGradientCSS(null as any)).toBe(null);
  });
});

describe("createGradient", () => {
  it("creates a gradient from hex colors", () => {
    const result = createGradient(["#667eea", "#764ba2"]);
    expect(result).toEqual({
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    });
  });

  it("creates a gradient with custom type and angle", () => {
    const result = createGradient(["#ff0000", "#00ff00"], "radial", 0);
    expect(result).toEqual({
      type: "radial",
      angle: 0,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 100 },
      ],
    });
  });

  it("distributes positions evenly for 3 colors", () => {
    const result = createGradient(["#ff0000", "#00ff00", "#0000ff"]);
    expect(result.stops).toEqual([
      { color: "ff0000", position: 0 },
      { color: "00ff00", position: 50 },
      { color: "0000ff", position: 100 },
    ]);
  });

  it("distributes positions evenly for 4 colors", () => {
    const result = createGradient(["#ff0000", "#ff7700", "#00ff00", "#0000ff"]);
    expect(result.stops).toEqual([
      { color: "ff0000", position: 0 },
      { color: "ff7700", position: 33 },
      { color: "00ff00", position: 67 },
      { color: "0000ff", position: 100 },
    ]);
  });

  it("throws error for fewer than 2 colors", () => {
    expect(() => createGradient(["#ff0000"])).toThrow(
      "At least 2 colors are required",
    );
  });
});

describe("getGradientColors", () => {
  it("extracts colors from a gradient definition", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };
    expect(getGradientColors(gradient)).toEqual(["#667EEA", "#764BA2"]);
  });

  it("extracts all colors from multi-stop gradient", () => {
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 90,
      stops: [
        { color: "ff0000", position: 0 },
        { color: "00ff00", position: 50 },
        { color: "0000ff", position: 100 },
      ],
    };
    expect(getGradientColors(gradient)).toEqual([
      "#FF0000",
      "#00FF00",
      "#0000FF",
    ]);
  });
});

describe("URL param integration scenarios", () => {
  it("scenario: user shares a custom gradient via URL", () => {
    // User creates a gradient
    const customGradient = createGradient(
      ["#667eea", "#764ba2"],
      "linear",
      135,
    );

    // Encode for URL params
    const urlParams = encodeGradientToParams(customGradient);
    expect(urlParams).toEqual({ g: "667eea-764ba2" }); // Only colors, defaults omitted

    // Also encode for internal storage
    const internalEncoded = encodeGradient(customGradient);
    expect(internalEncoded).toBe("667eea-764ba2|linear|135");

    // Simulate: another user opens the URL
    const params = new URLSearchParams(urlParams);
    const decoded = decodeGradientFromParams(params);
    expect(decoded).toEqual(customGradient);

    // Generate CSS for display
    const css = gradientToCSS(decoded!);
    expect(css).toBe("linear-gradient(135deg, #667EEA 0%, #764BA2 100%)");
  });

  it("scenario: user modifies angle and shares", () => {
    // Start with a gradient
    const gradient: GradientDefinition = {
      type: "linear",
      angle: 135,
      stops: [
        { color: "667eea", position: 0 },
        { color: "764ba2", position: 100 },
      ],
    };

    // User changes angle to 45
    const modified = { ...gradient, angle: 45 };

    // Encode for URL
    const urlParams = encodeGradientToParams(modified);
    expect(urlParams).toEqual({ g: "667eea-764ba2", angle: "45" });

    // Decode and verify
    const decoded = decodeGradientFromParams(new URLSearchParams(urlParams));
    expect(decoded?.angle).toBe(45);
  });

  it("scenario: user changes gradient type from linear to radial", () => {
    // Start with linear
    const linear = decodeGradient("667eea-764ba2|linear|135");

    // Change to radial
    const radial: GradientDefinition = { ...linear!, type: "radial", angle: 0 };

    // Encode new URL
    const urlParams = encodeGradientToParams(radial);
    expect(urlParams).toEqual({ g: "667eea-764ba2", type: "radial" });

    // Verify CSS output
    const css = gradientToCSS(radial);
    expect(css).toBe("radial-gradient(circle, #667EEA 0%, #764BA2 100%)");
  });

  it("scenario: preset gradient gets encoded to URL", () => {
    // Simulate a preset with CSS string
    const presetCSS = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

    // Parse the preset CSS to get definition
    const definition = parseGradientCSS(presetCSS);
    expect(definition).not.toBe(null);

    // Encode to URL params (clean format)
    const urlParams = encodeGradientToParams(definition!);
    expect(urlParams).toEqual({ g: "667eea-764ba2" });

    // Encode to internal storage
    const internal = encodeGradient(definition!);
    expect(internal).toBe("667eea-764ba2|linear|135");

    // This URL can now be shared
    const decoded = decodeGradientFromParams(new URLSearchParams(urlParams));
    expect(decoded).toEqual(definition);
  });

  it("scenario: complex 5-color gradient URL", () => {
    // User creates a rainbow gradient
    const rainbow: GradientDefinition = {
      type: "linear",
      angle: 90,
      stops: [
        { color: "fde047", position: 0 },
        { color: "22c55e", position: 25 },
        { color: "22d3ee", position: 50 },
        { color: "d946ef", position: 75 },
        { color: "ef4444", position: 100 },
      ],
    };

    // URL should be clean and readable
    const urlParams = encodeGradientToParams(rainbow);
    expect(urlParams).toEqual({
      g: "fde047-22c55e-22d3ee-d946ef-ef4444",
      angle: "90",
    });

    // Resulting URL: ?g=fde047-22c55e-22d3ee-d946ef-ef4444&angle=90
    // Much cleaner than: ?g=linear,90,fde047:0,22c55e:25,22d3ee:50,d946ef:75,ef4444:100
  });
});
