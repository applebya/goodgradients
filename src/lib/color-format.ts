import type { ColorFormat } from '@/types';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || !result[1] || !result[2] || !result[3]) return null;
  return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function convertColor(hex: string, format: ColorFormat): string {
  const normalizedHex = hex.startsWith('#') ? hex : '#' + hex;
  if (format === 'hex') return normalizedHex.toLowerCase();
  const rgb = hexToRgb(normalizedHex);
  if (!rgb) return normalizedHex;
  switch (format) {
    case 'rgb': return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'rgba': return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    case 'hsl': { const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b); return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`; }
    case 'hsla': { const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b); return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`; }
    default: return normalizedHex;
  }
}

export function convertGradientColors(gradientCss: string, format: ColorFormat): string {
  if (format === 'hex') return gradientCss;
  return gradientCss.replace(/#[a-fA-F0-9]{6}/g, (match) => convertColor(match, format));
}

export const COLOR_FORMAT_OPTIONS: { value: ColorFormat; label: string }[] = [
  { value: 'hex', label: 'HEX' },
  { value: 'rgb', label: 'RGB' },
  { value: 'rgba', label: 'RGBA' },
  { value: 'hsl', label: 'HSL' },
  { value: 'hsla', label: 'HSLA' },
];
