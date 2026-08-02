import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface LayerProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface LayeredContentProps {
  layers: LayerProps[];
}

export default function LayeredContent({ layers }: LayeredContentProps) {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          className="border border-sage-green/20 rounded-lg overflow-hidden hover:border-sage-green/40 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={() => setExpandedLayer(expandedLayer === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-warm-gray/30 transition-colors duration-300"
          >
            <div className="text-left">
              <h3 className="text-lg font-serif font-bold text-foreground">{layer.title}</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedLayer === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-sage-green" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedLayer === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-sage-green/10 bg-warm-cream/50"
              >
                <div className="px-6 py-4">
                  {layer.description && (
                    <p className="text-muted-foreground mb-4 leading-relaxed">{layer.description}</p>
                  )}
                  <div className="prose prose-sm max-w-none">
                    {layer.content}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
