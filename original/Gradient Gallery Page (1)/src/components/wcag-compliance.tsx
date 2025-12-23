import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { getContrastInfoForBackground, formatContrastRatio, type ContrastInfo, getGradientMainColor } from '../lib/contrast-utils';
import type { Gradient } from './gradient-app';

interface WCAGComplianceProps {
  gradient: Gradient;
}

export function WCAGCompliance({ gradient }: WCAGComplianceProps) {
  // Get the main color from the gradient for contrast calculation
  const mainColor = getGradientMainColor(gradient.gradient);
  const contrastInfos = getContrastInfoForBackground(mainColor);
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm text-neutral-400">WCAG Contrast Compliance</h4>
        <p className="text-xs text-neutral-500 mb-2">
          Testing text colors against this gradient's average tone for accessibility
        </p>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700 mb-4">
          <div 
            className="w-12 h-12 rounded-lg border border-white/20"
            style={{ background: mainColor }}
          />
          <div>
            <p className="text-xs text-neutral-400">Average Color</p>
            <p className="text-sm text-white font-mono">{mainColor}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {contrastInfos.map((info) => (
          <div
            key={info.color}
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/30"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded border border-neutral-600 flex items-center justify-center text-base"
                style={{ 
                  backgroundColor: gradient.gradient,
                  color: info.color
                }}
              >
                Aa
              </div>
              <div>
                <p className="text-sm text-white">{info.name}</p>
                <p className="text-xs text-neutral-500">{info.color} · {formatContrastRatio(info.ratio)}</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap justify-end">
              <ComplianceBadge
                label="AA"
                meets={info.meetsAA}
              />
              <ComplianceBadge
                label="AA+"
                meets={info.meetsAALarge}
              />
              <ComplianceBadge
                label="AAA"
                meets={info.meetsAAA}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-neutral-400 space-y-1">
            <p><strong className="text-neutral-300">AA:</strong> Minimum for body text (4.5:1 ratio required)</p>
            <p><strong className="text-neutral-300">AA+:</strong> Large text 18pt+ or 14pt+ bold (3:1 ratio required)</p>
            <p><strong className="text-neutral-300">AAA:</strong> Enhanced contrast (7:1 for body, 4.5:1 for large)</p>
            <p className="mt-2 pt-2 border-t border-neutral-700 text-neutral-500">
              Note: Tests use the gradient's average color. Real contrast may vary across the gradient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ComplianceBadgeProps {
  label: string;
  meets: boolean;
}

function ComplianceBadge({ label, meets }: ComplianceBadgeProps) {
  return (
    <div className="flex items-center gap-1">
      {meets ? (
        <CheckCircle2 className="w-3 h-3 text-green-500" />
      ) : (
        <XCircle className="w-3 h-3 text-neutral-600" />
      )}
      <span className={`text-xs ${meets ? 'text-green-500' : 'text-neutral-600'}`}>
        {label}
      </span>
    </div>
  );
}