import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  getLuminance,
  getContrastRatio,
  meetsWCAG,
  getBestTextColor,
  getGradientAverageColor,
  formatContrastRatio,
  getContrastInfoForBackground,
} from './contrast';

describe('hexToRgb', () => {
  it('converts 6-digit hex with # prefix', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('converts 6-digit hex without # prefix', () => {
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('667eea')).toEqual({ r: 102, g: 126, b: 234 });
  });

  it('handles uppercase hex', () => {
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('AABBCC')).toEqual({ r: 170, g: 187, b: 204 });
  });

  it('returns null for invalid hex', () => {
    expect(hexToRgb('')).toBe(null);
    expect(hexToRgb('#fff')).toBe(null); // 3-digit hex not supported
    expect(hexToRgb('gggggg')).toBe(null); // invalid chars
    expect(hexToRgb('#12345')).toBe(null); // 5 digits
  });
});

describe('getLuminance', () => {
  it('returns 0 for black', () => {
    expect(getLuminance(0, 0, 0)).toBe(0);
  });

  it('returns 1 for white', () => {
    expect(getLuminance(255, 255, 255)).toBe(1);
  });

  it('returns expected values for primary colors', () => {
    // Red has lower luminance than green due to human perception
    const redLum = getLuminance(255, 0, 0);
    const greenLum = getLuminance(0, 255, 0);
    const blueLum = getLuminance(0, 0, 255);

    expect(redLum).toBeCloseTo(0.2126, 3);
    expect(greenLum).toBeCloseTo(0.7152, 3);
    expect(blueLum).toBeCloseTo(0.0722, 3);
  });

  it('returns value between 0 and 1', () => {
    const lum = getLuminance(128, 128, 128);
    expect(lum).toBeGreaterThan(0);
    expect(lum).toBeLessThan(1);
  });
});

describe('getContrastRatio', () => {
  it('returns 21:1 for black on white', () => {
    const ratio = getContrastRatio('#ffffff', '#000000');
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('returns 1:1 for same colors', () => {
    expect(getContrastRatio('#ffffff', '#ffffff')).toBe(1);
    expect(getContrastRatio('#000000', '#000000')).toBe(1);
    expect(getContrastRatio('#667eea', '#667eea')).toBe(1);
  });

  it('is commutative', () => {
    const ratio1 = getContrastRatio('#ff0000', '#ffffff');
    const ratio2 = getContrastRatio('#ffffff', '#ff0000');
    expect(ratio1).toBeCloseTo(ratio2, 5);
  });

  it('returns 1 for invalid colors', () => {
    expect(getContrastRatio('invalid', '#ffffff')).toBe(1);
    expect(getContrastRatio('#ffffff', 'invalid')).toBe(1);
  });

  it('calculates expected ratios for common combinations', () => {
    // Black on white should be max contrast
    expect(getContrastRatio('#000000', '#ffffff')).toBeGreaterThan(20);

    // Gray on white has lower contrast
    expect(getContrastRatio('#808080', '#ffffff')).toBeLessThan(5);
  });
});

describe('meetsWCAG', () => {
  describe('AA level - normal text', () => {
    it('passes with ratio >= 4.5', () => {
      expect(meetsWCAG(4.5, 'AA')).toBe(true);
      expect(meetsWCAG(5.0, 'AA')).toBe(true);
      expect(meetsWCAG(21, 'AA')).toBe(true);
    });

    it('fails with ratio < 4.5', () => {
      expect(meetsWCAG(4.49, 'AA')).toBe(false);
      expect(meetsWCAG(3.0, 'AA')).toBe(false);
      expect(meetsWCAG(1.0, 'AA')).toBe(false);
    });
  });

  describe('AA level - large text', () => {
    it('passes with ratio >= 3', () => {
      expect(meetsWCAG(3.0, 'AA', true)).toBe(true);
      expect(meetsWCAG(4.5, 'AA', true)).toBe(true);
    });

    it('fails with ratio < 3', () => {
      expect(meetsWCAG(2.9, 'AA', true)).toBe(false);
      expect(meetsWCAG(1.0, 'AA', true)).toBe(false);
    });
  });

  describe('AAA level - normal text', () => {
    it('passes with ratio >= 7', () => {
      expect(meetsWCAG(7.0, 'AAA')).toBe(true);
      expect(meetsWCAG(21, 'AAA')).toBe(true);
    });

    it('fails with ratio < 7', () => {
      expect(meetsWCAG(6.9, 'AAA')).toBe(false);
      expect(meetsWCAG(4.5, 'AAA')).toBe(false);
    });
  });

  describe('AAA level - large text', () => {
    it('passes with ratio >= 4.5', () => {
      expect(meetsWCAG(4.5, 'AAA', true)).toBe(true);
      expect(meetsWCAG(7.0, 'AAA', true)).toBe(true);
    });

    it('fails with ratio < 4.5', () => {
      expect(meetsWCAG(4.4, 'AAA', true)).toBe(false);
      expect(meetsWCAG(3.0, 'AAA', true)).toBe(false);
    });
  });
});

describe('getBestTextColor', () => {
  it('returns white for dark backgrounds', () => {
    expect(getBestTextColor('#000000')).toBe('#ffffff');
    expect(getBestTextColor('#333333')).toBe('#ffffff');
    expect(getBestTextColor('#1a1a1a')).toBe('#ffffff');
  });

  it('returns black for bright colored backgrounds', () => {
    // #667eea is a bright purple - black has better contrast
    expect(getBestTextColor('#667eea')).toBe('#000000');
  });

  it('returns black for light backgrounds', () => {
    expect(getBestTextColor('#ffffff')).toBe('#000000');
    expect(getBestTextColor('#f5f5f5')).toBe('#000000');
    expect(getBestTextColor('#ffff00')).toBe('#000000'); // Yellow
  });

  it('handles medium colors appropriately', () => {
    // For medium gray, either color could work - just verify it returns one
    const result = getBestTextColor('#808080');
    expect(['#ffffff', '#000000']).toContain(result);
  });
});

describe('getGradientAverageColor', () => {
  it('returns first color for single-color array', () => {
    expect(getGradientAverageColor(['#ff0000'])).toBe('#ff0000');
  });

  it('returns black for empty array', () => {
    expect(getGradientAverageColor([])).toBe('#000000');
  });

  it('averages two colors', () => {
    // Black and white average to gray
    const result = getGradientAverageColor(['#000000', '#ffffff']);
    expect(result).toBe('#808080');
  });

  it('averages RGB correctly', () => {
    // Red and blue average (127, 0, 127)
    const result = getGradientAverageColor(['#ff0000', '#0000ff']);
    expect(result).toBe('#800080'); // Purple-ish
  });

  it('averages three colors', () => {
    // Red, green, blue → each channel averages to ~85 (255/3)
    const result = getGradientAverageColor(['#ff0000', '#00ff00', '#0000ff']);
    expect(result).toBe('#555555');
  });

  it('handles invalid colors gracefully', () => {
    // Should filter out invalid colors
    const result = getGradientAverageColor(['invalid', 'notacolor']);
    expect(result).toBe('#000000');
  });

  it('handles mixed valid/invalid colors', () => {
    // Should use only valid colors
    const result = getGradientAverageColor(['#ff0000', 'invalid', '#0000ff']);
    expect(result).toBe('#800080');
  });
});

describe('formatContrastRatio', () => {
  it('formats ratio with 2 decimal places', () => {
    expect(formatContrastRatio(21)).toBe('21.00:1');
    expect(formatContrastRatio(4.5)).toBe('4.50:1');
    expect(formatContrastRatio(1.5)).toBe('1.50:1');
  });

  it('rounds appropriately', () => {
    // JavaScript toFixed uses banker's rounding
    expect(formatContrastRatio(4.556)).toBe('4.56:1');
    expect(formatContrastRatio(4.554)).toBe('4.55:1');
  });
});

describe('getContrastInfoForBackground', () => {
  it('returns info for 5 test colors', () => {
    const info = getContrastInfoForBackground('#667eea');
    expect(info).toHaveLength(5);
  });

  it('includes expected color names', () => {
    const info = getContrastInfoForBackground('#667eea');
    const names = info.map((i) => i.name);
    expect(names).toContain('White');
    expect(names).toContain('Black');
    expect(names).toContain('Off-White');
    expect(names).toContain('Near Black');
    expect(names).toContain('Gray');
  });

  it('returns correct structure for each color', () => {
    const info = getContrastInfoForBackground('#667eea');
    info.forEach((item) => {
      expect(item).toHaveProperty('color');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('ratio');
      expect(item).toHaveProperty('meetsAA');
      expect(item).toHaveProperty('meetsAAA');
      expect(item).toHaveProperty('meetsAALarge');
      expect(typeof item.ratio).toBe('number');
      expect(typeof item.meetsAA).toBe('boolean');
    });
  });

  it('white on dark background meets AA', () => {
    const info = getContrastInfoForBackground('#000000');
    const whiteInfo = info.find((i) => i.name === 'White');
    expect(whiteInfo?.meetsAA).toBe(true);
    expect(whiteInfo?.meetsAAA).toBe(true);
  });

  it('black on light background meets AA', () => {
    const info = getContrastInfoForBackground('#ffffff');
    const blackInfo = info.find((i) => i.name === 'Black');
    expect(blackInfo?.meetsAA).toBe(true);
    expect(blackInfo?.meetsAAA).toBe(true);
  });
});

describe('integration scenarios', () => {
  it('scenario: selecting text color for a gradient', () => {
    // Given a purple gradient
    const colors = ['#667eea', '#764ba2'];
    const avgColor = getGradientAverageColor(colors);

    // Get best text color
    const textColor = getBestTextColor(avgColor);

    // Verify it has good contrast
    const ratio = getContrastRatio(avgColor, textColor);
    expect(ratio).toBeGreaterThan(4.5); // Meets AA
  });

  it('scenario: checking accessibility of gradient for text', () => {
    const bgColor = '#1a1a1a'; // Dark background

    // Get all contrast info
    const info = getContrastInfoForBackground(bgColor);

    // Filter to only AA-passing colors
    const accessibleColors = info.filter((i) => i.meetsAA);
    expect(accessibleColors.length).toBeGreaterThan(0);

    // White should definitely be accessible on dark bg
    expect(accessibleColors.some((c) => c.name === 'White')).toBe(true);
  });

  it('scenario: gradient with poor contrast warning', () => {
    const bgColor = '#808080'; // Medium gray

    const info = getContrastInfoForBackground(bgColor);

    // Medium gray has poor contrast with most colors
    const aaColors = info.filter((i) => i.meetsAA);
    // At least black or white should work
    expect(aaColors.length).toBeGreaterThan(0);
  });
});
