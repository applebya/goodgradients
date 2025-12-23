import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Gradient {
  id: number;
  gradient: string;
  name: string;
  colors: string[];
  description: string;
}

const gradients: Gradient[] = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    name: 'Purple Dream',
    colors: ['#667eea', '#764ba2'],
    description: 'A smooth blend of vibrant purple hues creating a dreamy, mystical atmosphere.',
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    name: 'Sunset Bliss',
    colors: ['#f093fb', '#f5576c'],
    description: 'Warm pink to coral transition reminiscent of beautiful sunset skies.',
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    name: 'Ocean Breeze',
    colors: ['#4facfe', '#00f2fe'],
    description: 'Refreshing cyan tones evoking the calm and clarity of ocean waters.',
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    name: 'Mint Fresh',
    colors: ['#43e97b', '#38f9d7'],
    description: 'Energizing green to turquoise blend with a fresh, modern feel.',
  },
  {
    id: 5,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    name: 'Tropical Sunrise',
    colors: ['#fa709a', '#fee140'],
    description: 'Vibrant pink to yellow gradient capturing the energy of a tropical morning.',
  },
  {
    id: 6,
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    name: 'Deep Ocean',
    colors: ['#30cfd0', '#330867'],
    description: 'Dramatic transition from bright cyan to deep purple depths.',
  },
  {
    id: 7,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    name: 'Cotton Candy',
    colors: ['#a8edea', '#fed6e3'],
    description: 'Soft pastel blend of mint and pink creating a sweet, gentle ambiance.',
  },
  {
    id: 8,
    gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    name: 'Coral Reef',
    colors: ['#ff9a56', '#ff6a88'],
    description: 'Warm coral tones inspired by vibrant underwater ecosystems.',
  },
];

export function GradientGallery() {
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
        {gradients.map((gradient) => (
          <motion.div
            key={gradient.id}
            layoutId={`gradient-${gradient.id}`}
            onClick={() => setSelectedGradient(gradient)}
            className="aspect-square rounded-2xl cursor-pointer"
            style={{ background: gradient.gradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedGradient && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGradient(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-8 pointer-events-none">
              <motion.div
                layoutId={`gradient-${selectedGradient.id}`}
                className="w-full max-w-2xl pointer-events-auto relative"
              >
                <div
                  className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
                  style={{ background: selectedGradient.gradient }}
                >
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setSelectedGradient(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.15 }}
                    className="text-white"
                  >
                    <h2 className="text-white mb-4">{selectedGradient.name}</h2>
                    <p className="text-white/90 mb-8">
                      {selectedGradient.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-white/70 mb-2">Colors</p>
                        <div className="flex gap-3">
                          {selectedGradient.colors.map((color, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className="w-12 h-12 rounded-lg border-2 border-white/30"
                                style={{ background: color }}
                              />
                              <span className="text-white/90 font-mono">
                                {color}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-white/70 mb-2">CSS Gradient</p>
                        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
                          <code className="text-white/90 break-all">
                            {selectedGradient.gradient}
                          </code>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}