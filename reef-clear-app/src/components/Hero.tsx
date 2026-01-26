import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Leaf, Waves, Recycle, X } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onStart: () => void;
}

interface FeatureDetail {
  title: string;
  description: string;
  keyPoints: string[];
  question: string;
  answer: string;
}

const featureDetails: Record<string, FeatureDetail> = {
  plantBased: {
    title: 'Plant-Based Formula',
    description: 'Our anti-fog solution is made entirely from plant-derived ingredients including sugarcane, corn glucose, aloe vera, and natural oils.',
    keyPoints: [
      'Sugarcane and corn-derived sugars',
      'Natural oils and aloe vera',
      'Radish root ferment preservatives',
      'Food-grade minerals for effectiveness'
    ],
    question: 'Why plant-based ingredients?',
    answer: 'Plant-based ingredients biodegrade cleanly and quickly, leaving no harmful residue in the ocean. They\'re also gentler on your skin and eyes while still providing powerful anti-fog protection.'
  },
  reefSafe: {
    title: 'Reef Safe',
    description: 'Every ingredient in Reef Clear is carefully selected to ensure zero harm to coral reefs, fish, and marine ecosystems.',
    keyPoints: [
      'No chemicals toxic to coral',
      'Biodegrades harmlessly in water',
      'Safe for all marine life',
      'Goes beyond unregulated labels'
    ],
    question: 'What makes something truly reef-safe?',
    answer: 'True reef safety means every ingredient has been tested and proven not to harm coral or marine life. Many products claim to be reef-safe without verification. We test every component to ensure complete ocean safety.'
  },
  oceanCleanup: {
    title: 'Ocean Cleanup Impact',
    description: 'Every bottle of Reef Clear purchased funds the removal of 3 plastic bottles from the ocean through our partnerships with 4ocean and Plastic Bank.',
    keyPoints: [
      '1 purchase = 3 bottles removed',
      'Partner with 4ocean cleanup crews',
      'Plastic Bank prevents ocean pollution',
      'Creates jobs in coastal communities'
    ],
    question: 'How does the cleanup work?',
    answer: '4ocean employs cleanup crews who remove trash from oceans and coastlines daily. Plastic Bank works in coastal communities to collect plastic before it reaches the water, while providing income to local workers.'
  },
  bioplastic: {
    title: 'Bioplastic Packaging',
    description: 'Our bottles are made from wheat straw bioplastic, reducing petroleum plastic by 40% while turning agricultural waste into sustainable packaging.',
    keyPoints: [
      'Made from wheat straw waste',
      '40% less petroleum plastic',
      'Biodegradable kraft containers',
      'Plant-based labels, made in USA'
    ],
    question: 'What is wheat straw bioplastic?',
    answer: 'After wheat is harvested, the leftover stalks are typically burned. Instead, we transform them into durable bioplastic bottles. This reduces waste, cuts CO2 emissions, and decreases our reliance on fossil fuels.'
  }
};

export default function Hero({ onStart }: HeroProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    { id: 'plantBased', icon: Leaf, text: 'Plant-Based Formula' },
    { id: 'reefSafe', icon: Waves, text: 'Reef Safe' },
    { id: 'oceanCleanup', icon: Recycle, text: 'Ocean Cleanup' },
    { id: 'bioplastic', icon: Droplet, text: 'Bioplastic Bottle' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated ocean background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-reef-aqua/20"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '-20px',
            }}
            animate={{
              y: [0, -500],
              opacity: [0.6, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Ocean glow effects */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-reef-teal/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-reef-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-reef-ocean/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="text-center z-10 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated drop symbol */}
        <motion.div
          className="inline-block mb-8 relative"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="text-8xl md:text-9xl filter drop-shadow-2xl"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💧
            </motion.div>
            {/* Ripple effect */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-reef-aqua/30 rounded-full blur-sm"
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Reef Clear
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-cyan-100 mb-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Plant-Based Anti-Fog Drops for Snorkeling & Diving
        </motion.p>

        <motion.p
          className="text-lg text-cyan-300/80 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Made by divers. Powered by nature. Protecting our oceans, one drop at a time.
        </motion.p>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="card-gradient border border-cyan-700/50 rounded-xl p-6 hover:border-reef-teal/70 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <Icon className="w-8 h-8 text-reef-aqua mx-auto mb-3" />
                <p className="text-sm text-cyan-100">{feature.text}</p>
                <p className="text-xs text-reef-teal/70 mt-2">Click to learn more</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="bg-gradient-to-r from-reef-teal to-reef-cyan text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-reef-teal/50 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Explore Reef Clear
        </motion.button>

        <motion.p
          className="mt-6 text-cyan-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          By Aloha Reef Gear - Made in USA
        </motion.p>
      </motion.div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && featureDetails[selectedFeature] && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              className="card-gradient border border-reef-teal/50 rounded-3xl p-8 md:p-12 max-w-2xl w-full relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 p-2 hover:bg-cyan-700/50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold mb-4 text-gradient">
                {featureDetails[selectedFeature].title}
              </h2>

              <p className="text-cyan-100 text-lg mb-6 leading-relaxed">
                {featureDetails[selectedFeature].description}
              </p>

              <div className="bg-slate-900/50 rounded-2xl p-6 mb-6 border border-cyan-700/50">
                <h3 className="text-xl font-semibold mb-4 text-reef-aqua">Key Points:</h3>
                <ul className="space-y-3">
                  {featureDetails[selectedFeature].keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-cyan-100">
                      <span className="text-reef-teal mt-1">*</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-reef-teal/10 to-reef-cyan/10 border border-reef-teal/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  {featureDetails[selectedFeature].question}
                </h3>
                <p className="text-cyan-100 leading-relaxed">
                  {featureDetails[selectedFeature].answer}
                </p>
              </div>

              <motion.button
                onClick={() => setSelectedFeature(null)}
                className="w-full mt-6 bg-gradient-to-r from-reef-teal to-reef-cyan text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-reef-teal/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
