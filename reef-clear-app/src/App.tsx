import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import ModuleCard from './components/ModuleCard';
import ModuleDetail from './components/ModuleDetail';
import ImpactCounter from './components/ImpactCounter';
import IngredientWheel from './components/IngredientWheel';
import BottleComparison from './components/BottleComparison';
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
                <span className="text-gradient">Reef Clear</span>
              </h1>
              <p className="text-xl text-cyan-300">
                Learn about our plant-based, ocean-safe anti-fog drops and our mission to protect the seas
              </p>
            </div>

            {/* Introduction Section */}
            <IntroSection />

            {/* Learning Modules */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-white">
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

            {/* Interactive Demos Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-white">
                Interactive Demonstrations
              </h2>
              <div className="space-y-8">
                <ImpactCounter />
                <IngredientWheel />
                <BottleComparison />
              </div>
            </div>

            {/* Call to Action */}
            <div className="mb-16">
              <div className="card-gradient border border-cyan-700/50 rounded-3xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  Join the Movement
                </h2>
                <p className="text-xl text-cyan-100 max-w-2xl mx-auto mb-8">
                  Every bottle of Reef Clear is a vote for cleaner oceans. Made by divers,
                  powered by plants, protecting our reefs one drop at a time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://reefclear.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-reef-teal to-reef-cyan text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-reef-teal/50 transition-all duration-300 inline-block"
                  >
                    Get Reef Clear
                  </a>
                  <a
                    href="https://alohareefgear.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-reef-teal text-reef-aqua px-8 py-4 rounded-full text-lg font-semibold hover:bg-reef-teal/10 transition-all duration-300 inline-block"
                  >
                    Explore Aloha Reef
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-8 border-t border-cyan-800/50">
              <div className="flex justify-center gap-4 mb-4 text-4xl">
                <span>🌊</span>
                <span>🌿</span>
                <span>🐠</span>
                <span>💧</span>
              </div>
              <p className="text-cyan-400">
                By Aloha Reef Gear - Made in USA
              </p>
              <p className="text-cyan-600 text-sm mt-2">
                Learn - Explore - Protect Our Oceans
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
