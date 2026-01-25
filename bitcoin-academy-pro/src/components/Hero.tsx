import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, TrendingUp, Shield, Zap, X } from 'lucide-react';
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
  decentralized: {
    title: 'Decentralized Currency',
    description: 'Bitcoin operates on a peer-to-peer network without any central authority. No single government, bank, or entity controls Bitcoin.',
    keyPoints: [
      'No central bank or government control',
      'Distributed across thousands of nodes worldwide',
      'Resistant to censorship and seizure',
      'Operates 24/7 without intermediaries'
    ],
    question: 'Why does decentralization matter?',
    answer: 'Decentralization means no single point of failure and no authority can freeze your funds, change the rules, or print more Bitcoin. Your money is truly yours.'
  },
  secure: {
    title: 'Secure & Transparent',
    description: 'Every Bitcoin transaction is recorded on a public blockchain, secured by cryptography and verified by thousands of computers.',
    keyPoints: [
      'Cryptographic security protects every transaction',
      'All transactions publicly verifiable on blockchain',
      'Nearly impossible to hack or double-spend',
      '99.98% uptime over 15+ years'
    ],
    question: 'How secure is Bitcoin really?',
    answer: 'Bitcoin has never been hacked. The network\'s security comes from massive computational power - attacking Bitcoin would require more computing power than the top 500 supercomputers combined.'
  },
  digitalGold: {
    title: 'Digital Gold',
    description: 'Like gold, Bitcoin has a fixed supply (21 million coins) making it scarce and valuable. It\'s often called "digital gold" for this reason.',
    keyPoints: [
      'Fixed supply of 21 million (no more can ever be created)',
      'Programmatically scarce unlike fiat currencies',
      'Protection against inflation',
      'Easily divisible and transportable unlike physical gold'
    ],
    question: 'Why is scarcity important?',
    answer: 'Scarcity creates value. Governments can print unlimited fiat currency, causing inflation. Bitcoin\'s fixed supply means it can\'t be devalued by printing more.'
  },
  instant: {
    title: 'Instant Transactions',
    description: 'Send Bitcoin anywhere in the world in minutes, not days. With Lightning Network, transactions are instant and nearly free.',
    keyPoints: [
      'Global transfers in 10-60 minutes',
      'Lightning Network enables instant payments',
      'No banks or intermediaries needed',
      'Available 24/7, including weekends and holidays'
    ],
    question: 'How fast are Bitcoin transactions?',
    answer: 'Standard Bitcoin transactions confirm in 10-60 minutes. Lightning Network transactions are instant (under 1 second) with fees under $0.01, making Bitcoin practical for everyday purchases.'
  }
};

export default function Hero({ onStart }: HeroProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    { id: 'decentralized', icon: Bitcoin, text: 'Decentralized Currency' },
    { id: 'secure', icon: Shield, text: 'Secure & Transparent' },
    { id: 'digitalGold', icon: TrendingUp, text: 'Digital Gold' },
    { id: 'instant', icon: Zap, text: 'Instant Transactions' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-bitcoin-orange/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
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
      </div>

      {/* Content */}
      <motion.div
        className="text-center z-10 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Bitcoin symbol animation */}
        <motion.div
          className="inline-block mb-8"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="text-8xl md:text-9xl text-bitcoin-orange drop-shadow-2xl">
            ₿
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Bitcoin Academy Pro
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Master the fundamentals of Bitcoin and blockchain technology through
          interactive lessons, stunning visualizations, and engaging content.
        </motion.p>

        {/* Features grid - NOW CLICKABLE */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="card-gradient border border-gray-700/50 rounded-xl p-6 hover:border-bitcoin-orange/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <Icon className="w-8 h-8 text-bitcoin-orange mx-auto mb-3" />
                <p className="text-sm text-gray-300">{feature.text}</p>
                <p className="text-xs text-bitcoin-orange/70 mt-2">Click to learn more</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-bitcoin-orange/50 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Start Learning
        </motion.button>

        <motion.p
          className="mt-6 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          No signup required • 100% free • Interactive learning
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
              className="card-gradient border border-bitcoin-orange/50 rounded-3xl p-8 md:p-12 max-w-2xl w-full relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold mb-4 text-gradient">
                {featureDetails[selectedFeature].title}
              </h2>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {featureDetails[selectedFeature].description}
              </p>

              <div className="bg-gray-900/50 rounded-2xl p-6 mb-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4 text-bitcoin-orange">Key Points:</h3>
                <ul className="space-y-3">
                  {featureDetails[selectedFeature].keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-bitcoin-orange mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-bitcoin-orange/10 to-yellow-500/10 border border-bitcoin-orange/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  ❓ {featureDetails[selectedFeature].question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {featureDetails[selectedFeature].answer}
                </p>
              </div>

              <motion.button
                onClick={() => setSelectedFeature(null)}
                className="w-full mt-6 bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-bitcoin-orange/50 transition-all duration-300"
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
