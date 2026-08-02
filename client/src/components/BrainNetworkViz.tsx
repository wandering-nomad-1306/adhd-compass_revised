import { motion } from 'framer-motion';
import { useState } from 'react';

interface BrainRegion {
  id: string;
  name: string;
  label: string;
  x: number;
  y: number;
  color: string;
  description: string;
  role: string;
}

const brainRegions: BrainRegion[] = [
  {
    id: 'pfc',
    name: 'Prefrontal Cortex',
    label: 'PFC',
    x: 50,
    y: 20,
    color: 'sage-green',
    description: 'The CEO of your brain. Handles planning, decision-making, impulse control, and working memory.',
    role: 'Executive Function',
  },
  {
    id: 'amygdala',
    name: 'Amygdala',
    label: 'Amygdala',
    x: 30,
    y: 50,
    color: 'muted-teal',
    description: 'Your threat detector and emotion center. In ADHD, it\'s more reactive and harder to calm.',
    role: 'Emotion & Threat Detection',
  },
  {
    id: 'striatum',
    name: 'Striatum (Basal Ganglia)',
    label: 'Striatum',
    x: 70,
    y: 50,
    color: 'subtle-blue',
    description: 'Handles motivation, reward processing, and habit formation. Dopamine-rich area.',
    role: 'Motivation & Reward',
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    label: 'Hippocampus',
    x: 40,
    y: 70,
    color: 'sage-green',
    description: 'Memory formation and consolidation. Helps transfer information to long-term storage.',
    role: 'Memory Formation',
  },
  {
    id: 'anterior-cingulate',
    name: 'Anterior Cingulate Cortex',
    label: 'ACC',
    x: 55,
    y: 35,
    color: 'muted-teal',
    description: 'Helps switch between tasks and monitor for conflicts. Less efficient in ADHD.',
    role: 'Task Switching',
  },
];

export default function BrainNetworkViz() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>('pfc');

  const selected = brainRegions.find((r) => r.id === selectedRegion);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* SVG Brain Diagram */}
        <motion.div
          className="relative aspect-square bg-gradient-to-br from-warm-cream to-warm-gray/30 rounded-lg p-6 border border-sage-green/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
          >
            {/* Brain outline */}
            <path
              d="M 50 10 Q 70 15 75 35 Q 80 50 75 65 Q 70 80 50 85 Q 30 80 25 65 Q 20 50 25 35 Q 30 15 50 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-sage-green/20"
            />

            {/* Brain regions as interactive circles */}
            {brainRegions.map((region) => {
              const isSelected = selectedRegion === region.id;
              const colorMap: Record<string, string> = {
                'sage-green': '#7a9f7d',
                'muted-teal': '#6b9ba8',
                'subtle-blue': '#8b9dc3',
              };

              return (
                <motion.g
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  style={{ cursor: 'pointer' }}
                  animate={{
                    scale: isSelected ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.circle
                    cx={region.x}
                    cy={region.y}
                    r={isSelected ? 6 : 4}
                    fill={colorMap[region.color]}
                    opacity={isSelected ? 1 : 0.6}
                    animate={{
                      r: isSelected ? 6 : 4,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {isSelected && (
                    <motion.circle
                      cx={region.x}
                      cy={region.y}
                      r={8}
                      fill="none"
                      stroke={colorMap[region.color]}
                      strokeWidth="0.5"
                      opacity="0.3"
                      animate={{ r: [8, 12] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* Information Panel */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: {
                        'sage-green': '#7a9f7d',
                        'muted-teal': '#6b9ba8',
                        'subtle-blue': '#8b9dc3',
                      }[selected.color],
                    }}
                  />
                  <span className="text-sm font-semibold text-sage-green">{selected.role}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground">{selected.name}</h3>
              </div>

              <p className="text-muted-foreground leading-relaxed">{selected.description}</p>

              <div className="pt-4 border-t border-sage-green/10">
                <p className="text-sm text-muted-foreground italic">
                  Click other regions to explore their roles in ADHD.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Region buttons */}
      <motion.div
        className="mt-8 flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {brainRegions.map((region) => (
          <button
            key={region.id}
            onClick={() => setSelectedRegion(region.id)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              selectedRegion === region.id
                ? 'bg-sage-green text-white shadow-lg'
                : 'bg-white border border-sage-green/20 text-foreground hover:border-sage-green/40'
            }`}
          >
            {region.label}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
