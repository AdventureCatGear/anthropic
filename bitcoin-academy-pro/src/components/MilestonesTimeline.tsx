import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, TrendingUp, Building2, Landmark, Scale, Globe, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { milestones, categories, getMilestonesByYear, getYearSummary } from '../data/milestones';

export default function MilestonesTimeline() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  const filteredMilestones = selectedCategory === 'all'
    ? milestones
    : milestones.filter(m => m.category === selectedCategory);

  const milestonesByYear = getMilestonesByYear();
  const years = Array.from(milestonesByYear.keys()).sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    const newExpandedYears = new Set(expandedYears);
    if (newExpandedYears.has(year)) {
      newExpandedYears.delete(year);
    } else {
      newExpandedYears.add(year);
    }
    setExpandedYears(newExpandedYears);
  };

  const categoryIcons: Record<string, any> = {
    political: Landmark,
    banking: Building2,
    investment: TrendingUp,
    adoption: Globe,
    technical: Zap,
    regulatory: Scale
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-bitcoin-orange bg-bitcoin-orange/10';
      case 'medium': return 'border-blue-500 bg-blue-500/10';
      case 'low': return 'border-gray-500 bg-gray-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'political': return 'text-purple-400 border-purple-500/30';
      case 'banking': return 'text-blue-400 border-blue-500/30';
      case 'investment': return 'text-green-400 border-green-500/30';
      case 'adoption': return 'text-cyan-400 border-cyan-500/30';
      case 'technical': return 'text-bitcoin-orange border-bitcoin-orange/30';
      case 'regulatory': return 'text-yellow-400 border-yellow-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="card-gradient border border-gray-700/50 rounded-3xl p-8 mb-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 text-gradient flex items-center gap-3">
          <Calendar className="w-10 h-10" />
          Bitcoin's Journey: Major Milestones (2021-Present)
        </h2>
        <p className="text-gray-400 text-lg">
          Explore the pivotal moments that transformed Bitcoin into a mainstream financial asset.
          These milestones show why Bitcoin is different from all other cryptocurrencies.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all border-2 ${
                selectedCategory === category.id
                  ? 'bg-bitcoin-orange text-black border-bitcoin-orange'
                  : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-bitcoin-orange/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          <div className="text-3xl font-bold text-bitcoin-orange">{filteredMilestones.length}</div>
          <div className="text-sm text-gray-400">Total Milestones</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          <div className="text-3xl font-bold text-bitcoin-orange">
            {filteredMilestones.filter(m => m.impact === 'high').length}
          </div>
          <div className="text-sm text-gray-400">Game Changers</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          <div className="text-3xl font-bold text-blue-400">
            {years.length}
          </div>
          <div className="text-sm text-gray-400">Years Covered</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          <div className="text-3xl font-bold text-purple-400">
            {new Set(filteredMilestones.map(m => m.category)).size}
          </div>
          <div className="text-sm text-gray-400">Categories</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-bitcoin-orange via-yellow-500 to-gray-700" />

        {years.map((year, yearIndex) => {
          const yearMilestones = milestonesByYear.get(year) || [];
          const visibleMilestones = yearMilestones.filter(m =>
            selectedCategory === 'all' || m.category === selectedCategory
          );

          if (visibleMilestones.length === 0) return null;

          const isYearExpanded = expandedYears.has(year);
          const yearSummary = getYearSummary(year);

          return (
            <motion.div
              key={year}
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: yearIndex * 0.1 }}
            >
              {/* Year header - clickable to expand/collapse */}
              <motion.div
                className="flex items-center mb-6 cursor-pointer group"
                onClick={() => toggleYear(year)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Year dot on timeline */}
                <div className="relative z-10 bg-bitcoin-orange text-black font-bold text-2xl px-6 py-2 rounded-full shadow-lg flex items-center gap-3">
                  {year}
                  {isYearExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-bitcoin-orange/50 to-transparent ml-4" />
              </motion.div>

              {/* Year summary - always visible */}
              <div className="ml-20 mb-4">
                <p className="text-gray-300 text-lg italic">
                  "{yearSummary}"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {visibleMilestones.length} milestone{visibleMilestones.length !== 1 ? 's' : ''} •
                  Click to {isYearExpanded ? 'collapse' : 'expand'}
                </p>
              </div>

              {/* Milestones for this year - collapsible */}
              <AnimatePresence>
                {isYearExpanded && (
                  <motion.div
                    className="space-y-4 ml-20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {visibleMilestones.map((milestone, index) => {
                      const Icon = categoryIcons[milestone.category];
                      const isExpanded = expandedMilestone === milestone.id;

                      return (
                        <motion.div
                          key={milestone.id}
                          className={`relative border-2 rounded-2xl overflow-hidden transition-all ${
                            getImpactColor(milestone.impact)
                          } ${isExpanded ? 'border-bitcoin-orange' : ''}`}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-[88px] top-6 w-4 h-4 bg-bitcoin-orange rounded-full border-4 border-gray-900" />

                          <div
                            className="p-6 cursor-pointer"
                            onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-4 flex-1">
                                <div className="text-4xl">{milestone.icon}</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="text-sm text-gray-500 font-mono">{milestone.date}</span>
                                    <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(milestone.category)}`}>
                                      {milestone.category.toUpperCase()}
                                    </span>
                                    {milestone.impact === 'high' && (
                                      <span className="text-xs px-3 py-1 rounded-full bg-bitcoin-orange/20 text-bitcoin-orange border border-bitcoin-orange/30 font-bold">
                                        GAME CHANGER
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="text-2xl font-bold text-white mb-2">
                                    {milestone.title}
                                  </h3>
                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.p
                                        className="text-gray-300 leading-relaxed"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                      >
                                        {milestone.description}
                                      </motion.p>
                                    )}
                                  </AnimatePresence>
                                  {!isExpanded && (
                                    <p className="text-gray-400 line-clamp-2">
                                      {milestone.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <button className="ml-4 p-2 hover:bg-gray-700/50 rounded-full transition-colors">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-bitcoin-orange" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                              </button>
                            </div>

                            {isExpanded && Icon && (
                              <motion.div
                                className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <Icon className="w-5 h-5 text-bitcoin-orange" />
                                <span className="text-sm text-gray-400">
                                  Category: <span className="text-white font-semibold capitalize">{milestone.category}</span>
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filteredMilestones.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400 text-lg">No milestones found for this category.</p>
        </motion.div>
      )}

      {/* Key Insights Box */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-bitcoin-orange/10 to-yellow-500/10 border border-bitcoin-orange/30 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gradient mb-4">
          Why Bitcoin is Different
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div className="flex gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <strong className="text-white">Institutional Backing:</strong> Major corporations and investment firms hold billions in Bitcoin, unlike other cryptocurrencies.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <strong className="text-white">Regulatory Clarity:</strong> Bitcoin has the most established legal framework with SEC-approved ETFs and clear regulations.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <strong className="text-white">Nation-State Adoption:</strong> Countries are adopting Bitcoin as legal tender and strategic reserves.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <strong className="text-white">Proven Track Record:</strong> 15+ years of uninterrupted operation with 99.98% uptime - the most battle-tested blockchain.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
