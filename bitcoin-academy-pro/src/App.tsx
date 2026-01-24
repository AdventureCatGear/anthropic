import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import ModuleCard from './components/ModuleCard';
import ModuleDetail from './components/ModuleDetail';
import BlockchainVisualization from './components/BlockchainVisualization';
import MiningDemo from './components/MiningDemo';
import TransactionDemo from './components/TransactionDemo';
import MilestonesTimeline from './components/MilestonesTimeline';
import { modules } from './data/modules';
import type { Module } from './data/modules';

function App() {
  const [showHero, setShowHero] = useState(true);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showHero ? (
          <Hero key="hero" onStart={() => setShowHero(false)} />
        ) : (
          <div key="content" className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-gradient">Bitcoin Academy Pro</span>
              </h1>
              <p className="text-xl text-gray-400">
                Your comprehensive journey to mastering Bitcoin - from fundamentals to real-world impact
              </p>
            </div>

            {/* NEW: Milestones Timeline Section - Featured First! */}
            <div className="mb-16">
              <MilestonesTimeline />
            </div>

            {/* Interactive Demos Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Interactive Demonstrations
              </h2>
              <div className="space-y-8">
                <BlockchainVisualization />
                <MiningDemo />
                <TransactionDemo />
              </div>
            </div>

            {/* Learning Modules */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Educational Modules
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    index={index}
                    onClick={() => setSelectedModule(module)}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-8 border-t border-gray-800">
              <p className="text-gray-500">
                Built with ❤️ for Bitcoin education
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Learn • Explore • Understand • Track Bitcoin's Global Impact
              </p>
            </footer>
          </div>
        )}
      </AnimatePresence>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <ModuleDetail
            key="detail"
            module={selectedModule}
            onClose={() => setSelectedModule(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
