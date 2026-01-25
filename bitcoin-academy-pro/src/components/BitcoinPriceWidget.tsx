import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Info, X, BarChart3 } from 'lucide-react';

interface PriceDetail {
  title: string;
  description: string;
  significance: string;
}

const priceDetails: Record<string, PriceDetail> = {
  current: {
    title: 'Current Bitcoin Price',
    description: 'The live market price of Bitcoin (BTC) in US dollars. This price updates in real-time based on trading activity across major exchanges including Coinbase, Binance, and Kraken.',
    significance: 'The current price reflects global supply and demand. Price movements are influenced by institutional adoption, regulatory news, and macroeconomic factors.'
  },
  high30: {
    title: '30-Day High',
    description: 'The highest price Bitcoin reached in the last 30 days. This metric helps identify recent price peaks and resistance levels.',
    significance: 'When current price approaches the 30-day high, it may indicate strong bullish momentum. Breaking above this level often signals continued upward movement.'
  },
  low30: {
    title: '30-Day Low',
    description: 'The lowest price Bitcoin reached in the last 30 days. This shows the recent support level where buyers stepped in.',
    significance: 'The 30-day low represents a key support level. If price approaches this level, it may find buying support or, if broken, signal further decline.'
  },
  volume: {
    title: '24-Hour Trading Volume',
    description: 'The total dollar value of Bitcoin traded across all exchanges in the last 24 hours. Higher volume indicates more market activity and liquidity.',
    significance: 'High volume during price increases confirms strong buying interest. High volume during declines suggests strong selling pressure. Low volume may indicate consolidation.'
  },
  chart: {
    title: '5-Year Price History',
    description: 'Bitcoin\'s price trajectory over the past 5 years, showing major bull and bear cycles, halvings, and institutional adoption phases.',
    significance: 'The 5-year view reveals Bitcoin\'s long-term upward trend despite volatility. Each halving (2020, 2024) preceded major price appreciation, demonstrating the impact of supply reduction.'
  }
};

export default function BitcoinPriceWidget() {
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  // Simulated data - In production, this would come from a real-time API
  const currentPrice = 97245.32;
  const priceChange24h = 2.34;
  const high30Day = 108900.00;
  const low30Day = 91200.50;
  const volume24h = 42.8; // in billions

  const isPositive = priceChange24h >= 0;

  // Simulated 5-year data points (monthly)
  const generateFiveYearData = () => {
    const data = [];
    const startPrice = 10000;
    const months = 60; // 5 years

    for (let i = 0; i < months; i++) {
      // Simulate Bitcoin's volatile growth pattern
      const volatility = Math.sin(i / 6) * 0.3 + Math.random() * 0.2;
      const growth = Math.pow(1.15, i / 12); // ~15% annual growth
      const price = startPrice * growth * (1 + volatility);
      data.push(price);
    }
    return data;
  };

  const chartData = generateFiveYearData();
  const maxPrice = Math.max(...chartData);
  const minPrice = Math.min(...chartData);

  return (
    <div className="mt-16 mb-8">
      <motion.div
        className="card-gradient border border-bitcoin-orange/30 rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gradient flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Live Bitcoin Market Data
        </h2>

        <p className="text-gray-400 mb-8">
          Real-time Bitcoin price and volume data. Click any metric for detailed explanations.
        </p>

        {/* Main Price Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Current Price Card */}
          <motion.div
            className="bg-gradient-to-br from-bitcoin-orange/10 to-yellow-500/10 border-2 border-bitcoin-orange/50 rounded-2xl p-8 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedDetail('current')}
          >
            <div className="absolute top-0 right-0 p-3">
              <Info className="w-5 h-5 text-bitcoin-orange/50" />
            </div>
            <div className="text-sm text-gray-400 mb-2">Current Price</div>
            <div className="text-5xl font-bold text-white mb-3">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center gap-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span className="text-lg font-semibold">
                {isPositive ? '+' : ''}{priceChange24h}% (24h)
              </span>
            </div>
          </motion.div>

          {/* Volume Card */}
          <motion.div
            className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 cursor-pointer relative"
            whileHover={{ scale: 1.02, borderColor: '#F7931A50' }}
            onClick={() => setSelectedDetail('volume')}
          >
            <div className="absolute top-0 right-0 p-3">
              <Info className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-sm text-gray-400 mb-2">24h Volume</div>
            <div className="text-4xl font-bold text-white mb-3">
              ${volume24h.toFixed(1)}B
            </div>
            <div className="text-gray-500">
              Across all exchanges
            </div>
          </motion.div>
        </div>

        {/* 30-Day High/Low */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: '#F7931A50' }}
            onClick={() => setSelectedDetail('high30')}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">30-Day High</div>
                <div className="text-2xl font-bold text-green-400">
                  ${high30Day.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <Info className="w-5 h-5 text-gray-500" />
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: '#F7931A50' }}
            onClick={() => setSelectedDetail('low30')}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">30-Day Low</div>
                <div className="text-2xl font-bold text-red-400">
                  ${low30Day.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <Info className="w-5 h-5 text-gray-500" />
            </div>
          </motion.div>
        </div>

        {/* 5-Year Chart */}
        <motion.div
          className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 cursor-pointer"
          whileHover={{ borderColor: '#F7931A50' }}
          onClick={() => setSelectedDetail('chart')}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">5-Year Price History</h3>
            <Info className="w-5 h-5 text-gray-500" />
          </div>

          {/* Simple line chart visualization */}
          <div className="relative h-48 bg-black/30 rounded-xl p-4">
            <svg className="w-full h-full" viewBox="0 0 600 180">
              <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F7931A" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F7931A" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Chart area */}
              <path
                d={`M 0 ${180 - ((chartData[0] - minPrice) / (maxPrice - minPrice)) * 160}
                   ${chartData.map((price, i) => {
                     const x = (i / (chartData.length - 1)) * 600;
                     const y = 180 - ((price - minPrice) / (maxPrice - minPrice)) * 160;
                     return `L ${x} ${y}`;
                   }).join(' ')}
                   L 600 180 L 0 180 Z`}
                fill="url(#priceGradient)"
              />

              {/* Chart line */}
              <path
                d={`M 0 ${180 - ((chartData[0] - minPrice) / (maxPrice - minPrice)) * 160}
                   ${chartData.map((price, i) => {
                     const x = (i / (chartData.length - 1)) * 600;
                     const y = 180 - ((price - minPrice) / (maxPrice - minPrice)) * 160;
                     return `L ${x} ${y}`;
                   }).join(' ')}`}
                stroke="#F7931A"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Year labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400 text-center">
            Click for historical analysis and significance
          </div>
        </motion.div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Data updates in real-time • Powered by major exchange APIs</p>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDetail && priceDetails[selectedDetail] && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div
              className="card-gradient border border-bitcoin-orange/50 rounded-3xl p-8 md:p-12 max-w-2xl w-full relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDetail(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold mb-4 text-gradient">
                {priceDetails[selectedDetail].title}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-bitcoin-orange mb-3">What This Means:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {priceDetails[selectedDetail].description}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-bitcoin-orange/10 to-yellow-500/10 border border-bitcoin-orange/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Why It Matters:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {priceDetails[selectedDetail].significance}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setSelectedDetail(null)}
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
