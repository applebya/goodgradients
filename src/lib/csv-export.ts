import type { GradientPreset } from "@/types";
import { parseGradientCSS } from "./gradient-url";

/**
 * Escapes a CSV field value according to RFC 4180
 * - Wraps in quotes if contains comma, quote, or newline
 * - Doubles any quotes within the value
 */
function escapeCSVField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Generates a CSV string from an array of gradient presets
 */
export function generateCSV(gradients: GradientPreset[]): string {
  const headers = [
    "name",
    "description",
    "category",
    "tags",
    "colors",
    "type",
    "angle",
    "css",
  ];

  const rows = gradients.map((gradient) => {
    // Parse the CSS gradient to extract type and angle
    const parsed = parseGradientCSS(gradient.gradient);
    const type = parsed?.type ?? "linear";
    const angle = parsed?.angle ?? 135;

    return [
      escapeCSVField(gradient.name),
      escapeCSVField(gradient.description),
      escapeCSVField(gradient.category),
      escapeCSVField(gradient.tags.join(", ")),
      escapeCSVField(gradient.colors.join(", ")),
      escapeCSVField(type),
      escapeCSVField(String(angle)),
      escapeCSVField(gradient.gradient),
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

/**
 * Triggers a browser download of the CSV file
 */
export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
