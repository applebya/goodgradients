import { RotateCw, Circle, Layers } from 'lucide-react';
import { Label } from './ui/label';

export type GradientType = 'linear' | 'radial' | 'conic';

interface GradientControlsProps {
  angle: number;
  onAngleChange: (angle: number) => void;
  gradientType: GradientType;
  onGradientTypeChange: (type: GradientType) => void;
  isLocal?: boolean;
}

export function GradientControls({
  angle,
  onAngleChange,
  gradientType,
  onGradientTypeChange,
  isLocal = false,
}: GradientControlsProps) {
  return (
    <div className="space-y-4">
      {/* Gradient Type Selector */}
      <div>
        <Label className="text-sm text-neutral-400 mb-2 block">
          Gradient Type {isLocal && <span className="text-neutral-600">(Preview Only)</span>}
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onGradientTypeChange('linear')}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
              gradientType === 'linear'
                ? 'border-white bg-neutral-800 text-white'
                : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-xs">Linear</span>
          </button>
          
          <button
            onClick={() => onGradientTypeChange('radial')}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
              gradientType === 'radial'
                ? 'border-white bg-neutral-800 text-white'
                : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <Circle className="w-5 h-5" />
            <span className="text-xs">Radial</span>
          </button>
          
          <button
            onClick={() => onGradientTypeChange('conic')}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
              gradientType === 'conic'
                ? 'border-white bg-neutral-800 text-white'
                : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <RotateCw className="w-5 h-5" />
            <span className="text-xs">Conic</span>
          </button>
        </div>
      </div>
      
      {/* Angle Slider (only for linear and conic) */}
      {(gradientType === 'linear' || gradientType === 'conic') && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm text-neutral-400">
              Angle
            </Label>
            <span className="text-sm text-white">{angle}°</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={angle}
              onChange={(e) => onAngleChange(Number(e.target.value))}
              className="flex-1 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
            {/* Visual angle indicator */}
            <div className="relative w-10 h-10 rounded-full border-2 border-neutral-700 flex items-center justify-center">
              <div
                className="absolute w-0.5 h-4 bg-white origin-bottom"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center center',
                }}
              />
            </div>
          </div>
          
          {/* Quick angle presets */}
          <div className="flex gap-1 mt-2">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((preset) => (
              <button
                key={preset}
                onClick={() => onAngleChange(preset)}
                className={`flex-1 text-xs py-1 px-2 rounded border transition-all ${
                  angle === preset
                    ? 'border-white bg-neutral-800 text-white'
                    : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {preset}°
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
