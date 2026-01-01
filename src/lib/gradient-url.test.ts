import { describe, it, expect } from 'vitest';
import {
  encodeGradient,
  decodeGradient,
  gradientToCSS,
  parseGradientCSS,
  createGradient,
  getGradientColors,
  isValidHexColor,
  isValidGradientDefinition,
  type GradientDefinition,
} from './gradient-url';

describe('isValidHexColor', () => {
  it('accepts valid 6-digit hex colors', () => {
    expect(isValidHexColor('667eea')).toBe(true);
    expect(isValidHexColor('FFFFFF')).toBe(true);
    expect(isValidHexColor('000000')).toBe(true);
    expect(isValidHexColor('AbCdEf')).toBe(true);
  });

  it('rejects invalid hex colors', () => {
    expect(isValidHexColor('#667eea')).toBe(false); // Has #
    expect(isValidHexColor('fff')).toBe(false); // 3 digits
    expect(isValidHexColor('gggggg')).toBe(false); // Invalid chars
    expect(isValidHexColor('')).toBe(false);
    expect(isValidHexColor('667eea00')).toBe(false); // 8 digits
  });
});

describe('isValidGradientDefinition', () => {
  it('accepts valid gradient definitions', () => {
    const valid: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(isValidGradientDefinition(valid)).toBe(true);
  });

  it('rejects invalid gradient type', () => {
    const invalid = {
      type: 'invalid' as any,
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it('rejects invalid angle', () => {
    const invalid: GradientDefinition = {
      type: 'linear',
      angle: 400,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it('rejects fewer than 2 stops', () => {
    const invalid: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [{ color: '667eea', position: 0 }],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it('rejects invalid color in stops', () => {
    const invalid: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: 'invalid', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });

  it('rejects invalid position in stops', () => {
    const invalid: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: -10 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(isValidGradientDefinition(invalid)).toBe(false);
  });
});

describe('encodeGradient', () => {
  it('encodes a simple 2-color linear gradient', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe('linear,135,667eea:0,764ba2:100');
  });

  it('encodes a 3-color gradient', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 90,
      stops: [
        { color: 'ff6b6b', position: 0 },
        { color: 'fec89a', position: 50 },
        { color: 'fff3b0', position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe('linear,90,ff6b6b:0,fec89a:50,fff3b0:100');
  });

  it('encodes a radial gradient', () => {
    const gradient: GradientDefinition = {
      type: 'radial',
      angle: 0,
      stops: [
        { color: '3b82f6', position: 0 },
        { color: '1d4ed8', position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe('radial,0,3b82f6:0,1d4ed8:100');
  });

  it('encodes a conic gradient', () => {
    const gradient: GradientDefinition = {
      type: 'conic',
      angle: 45,
      stops: [
        { color: 'ec4899', position: 0 },
        { color: '8b5cf6', position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe('conic,45,ec4899:0,8b5cf6:100');
  });

  it('normalizes colors to lowercase', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: 'AABBCC', position: 0 },
        { color: 'DDEEFF', position: 100 },
      ],
    };
    expect(encodeGradient(gradient)).toBe('linear,135,aabbcc:0,ddeeff:100');
  });
});

describe('decodeGradient', () => {
  it('decodes a simple 2-color linear gradient', () => {
    const result = decodeGradient('linear,135,667eea:0,764ba2:100');
    expect(result).toEqual({
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    });
  });

  it('decodes a 3-color gradient', () => {
    const result = decodeGradient('linear,90,ff6b6b:0,fec89a:50,fff3b0:100');
    expect(result).toEqual({
      type: 'linear',
      angle: 90,
      stops: [
        { color: 'ff6b6b', position: 0 },
        { color: 'fec89a', position: 50 },
        { color: 'fff3b0', position: 100 },
      ],
    });
  });

  it('decodes a radial gradient', () => {
    const result = decodeGradient('radial,0,3b82f6:0,1d4ed8:100');
    expect(result).toEqual({
      type: 'radial',
      angle: 0,
      stops: [
        { color: '3b82f6', position: 0 },
        { color: '1d4ed8', position: 100 },
      ],
    });
  });

  it('returns null for invalid type', () => {
    expect(decodeGradient('invalid,135,667eea:0,764ba2:100')).toBe(null);
  });

  it('returns null for invalid angle', () => {
    expect(decodeGradient('linear,400,667eea:0,764ba2:100')).toBe(null);
    expect(decodeGradient('linear,abc,667eea:0,764ba2:100')).toBe(null);
  });

  it('returns null for invalid color', () => {
    expect(decodeGradient('linear,135,gggggg:0,764ba2:100')).toBe(null);
  });

  it('returns null for invalid position', () => {
    expect(decodeGradient('linear,135,667eea:abc,764ba2:100')).toBe(null);
    expect(decodeGradient('linear,135,667eea:-10,764ba2:100')).toBe(null);
  });

  it('returns null for fewer than 2 stops', () => {
    expect(decodeGradient('linear,135,667eea:0')).toBe(null);
  });

  it('returns null for empty string', () => {
    expect(decodeGradient('')).toBe(null);
  });

  it('returns null for null/undefined', () => {
    expect(decodeGradient(null as any)).toBe(null);
    expect(decodeGradient(undefined as any)).toBe(null);
  });

  it('normalizes colors to lowercase', () => {
    const result = decodeGradient('linear,135,AABBCC:0,DDEEFF:100');
    expect(result?.stops[0]?.color).toBe('aabbcc');
    expect(result?.stops[1]?.color).toBe('ddeeff');
  });
});

describe('encodeGradient + decodeGradient roundtrip', () => {
  it('roundtrips a linear gradient', () => {
    const original: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    const encoded = encodeGradient(original);
    const decoded = decodeGradient(encoded);
    expect(decoded).toEqual(original);
  });

  it('roundtrips a complex gradient', () => {
    const original: GradientDefinition = {
      type: 'conic',
      angle: 270,
      stops: [
        { color: 'ff0000', position: 0 },
        { color: '00ff00', position: 33 },
        { color: '0000ff', position: 66 },
        { color: 'ff0000', position: 100 },
      ],
    };
    const encoded = encodeGradient(original);
    const decoded = decodeGradient(encoded);
    expect(decoded).toEqual(original);
  });
});

describe('gradientToCSS', () => {
  it('generates linear gradient CSS', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
    );
  });

  it('generates radial gradient CSS', () => {
    const gradient: GradientDefinition = {
      type: 'radial',
      angle: 0,
      stops: [
        { color: '3b82f6', position: 0 },
        { color: '1d4ed8', position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      'radial-gradient(circle, #3B82F6 0%, #1D4ED8 100%)'
    );
  });

  it('generates conic gradient CSS', () => {
    const gradient: GradientDefinition = {
      type: 'conic',
      angle: 45,
      stops: [
        { color: 'ec4899', position: 0 },
        { color: '8b5cf6', position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      'conic-gradient(from 45deg, #EC4899 0%, #8B5CF6 100%)'
    );
  });

  it('handles multi-stop gradients', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 90,
      stops: [
        { color: 'ff0000', position: 0 },
        { color: '00ff00', position: 50 },
        { color: '0000ff', position: 100 },
      ],
    };
    expect(gradientToCSS(gradient)).toBe(
      'linear-gradient(90deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)'
    );
  });
});

describe('parseGradientCSS', () => {
  it('parses linear gradient CSS', () => {
    const css = 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)';
    const result = parseGradientCSS(css);
    expect(result).toEqual({
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    });
  });

  it('parses radial gradient CSS', () => {
    const css = 'radial-gradient(circle, #3B82F6 0%, #1D4ED8 100%)';
    const result = parseGradientCSS(css);
    expect(result).toEqual({
      type: 'radial',
      angle: 135, // Default angle for radial
      stops: [
        { color: '3b82f6', position: 0 },
        { color: '1d4ed8', position: 100 },
      ],
    });
  });

  it('parses multi-stop gradient', () => {
    const css = 'linear-gradient(90deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)';
    const result = parseGradientCSS(css);
    expect(result).toEqual({
      type: 'linear',
      angle: 90,
      stops: [
        { color: 'ff0000', position: 0 },
        { color: '00ff00', position: 50 },
        { color: '0000ff', position: 100 },
      ],
    });
  });

  it('returns null for invalid CSS', () => {
    expect(parseGradientCSS('')).toBe(null);
    expect(parseGradientCSS('not-a-gradient')).toBe(null);
    expect(parseGradientCSS(null as any)).toBe(null);
  });
});

describe('createGradient', () => {
  it('creates a gradient from hex colors', () => {
    const result = createGradient(['#667eea', '#764ba2']);
    expect(result).toEqual({
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    });
  });

  it('creates a gradient with custom type and angle', () => {
    const result = createGradient(['#ff0000', '#00ff00'], 'radial', 0);
    expect(result).toEqual({
      type: 'radial',
      angle: 0,
      stops: [
        { color: 'ff0000', position: 0 },
        { color: '00ff00', position: 100 },
      ],
    });
  });

  it('distributes positions evenly for 3 colors', () => {
    const result = createGradient(['#ff0000', '#00ff00', '#0000ff']);
    expect(result.stops).toEqual([
      { color: 'ff0000', position: 0 },
      { color: '00ff00', position: 50 },
      { color: '0000ff', position: 100 },
    ]);
  });

  it('distributes positions evenly for 4 colors', () => {
    const result = createGradient(['#ff0000', '#ff7700', '#00ff00', '#0000ff']);
    expect(result.stops).toEqual([
      { color: 'ff0000', position: 0 },
      { color: 'ff7700', position: 33 },
      { color: '00ff00', position: 67 },
      { color: '0000ff', position: 100 },
    ]);
  });

  it('throws error for fewer than 2 colors', () => {
    expect(() => createGradient(['#ff0000'])).toThrow('At least 2 colors are required');
  });
});

describe('getGradientColors', () => {
  it('extracts colors from a gradient definition', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };
    expect(getGradientColors(gradient)).toEqual(['#667EEA', '#764BA2']);
  });

  it('extracts all colors from multi-stop gradient', () => {
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 90,
      stops: [
        { color: 'ff0000', position: 0 },
        { color: '00ff00', position: 50 },
        { color: '0000ff', position: 100 },
      ],
    };
    expect(getGradientColors(gradient)).toEqual(['#FF0000', '#00FF00', '#0000FF']);
  });
});

describe('URL param integration scenarios', () => {
  it('scenario: user shares a custom gradient via URL', () => {
    // User creates a gradient
    const customGradient = createGradient(['#667eea', '#764ba2'], 'linear', 135);

    // Encode for URL
    const urlParam = encodeGradient(customGradient);
    expect(urlParam).toBe('linear,135,667eea:0,764ba2:100');

    // Simulate: another user opens the URL
    const decoded = decodeGradient(urlParam);
    expect(decoded).toEqual(customGradient);

    // Generate CSS for display
    const css = gradientToCSS(decoded!);
    expect(css).toBe('linear-gradient(135deg, #667EEA 0%, #764BA2 100%)');
  });

  it('scenario: user modifies angle and shares', () => {
    // Start with a gradient
    const gradient: GradientDefinition = {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '667eea', position: 0 },
        { color: '764ba2', position: 100 },
      ],
    };

    // User changes angle to 45
    const modified = { ...gradient, angle: 45 };

    // Encode for URL
    const urlParam = encodeGradient(modified);
    expect(urlParam).toBe('linear,45,667eea:0,764ba2:100');

    // Decode and verify
    const decoded = decodeGradient(urlParam);
    expect(decoded?.angle).toBe(45);
  });

  it('scenario: user changes gradient type from linear to radial', () => {
    // Start with linear
    const linear = decodeGradient('linear,135,667eea:0,764ba2:100');

    // Change to radial
    const radial: GradientDefinition = { ...linear!, type: 'radial' };

    // Encode new URL
    const urlParam = encodeGradient(radial);
    expect(urlParam).toBe('radial,135,667eea:0,764ba2:100');

    // Verify CSS output
    const css = gradientToCSS(radial);
    expect(css).toBe('radial-gradient(circle, #667EEA 0%, #764BA2 100%)');
  });

  it('scenario: preset gradient gets encoded to URL', () => {
    // Simulate a preset with CSS string
    const presetCSS = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    // Parse the preset CSS to get definition
    const definition = parseGradientCSS(presetCSS);
    expect(definition).not.toBe(null);

    // Encode to URL param
    const urlParam = encodeGradient(definition!);
    expect(urlParam).toBe('linear,135,667eea:0,764ba2:100');

    // This URL can now be shared
    expect(decodeGradient(urlParam)).toEqual(definition);
  });
});
