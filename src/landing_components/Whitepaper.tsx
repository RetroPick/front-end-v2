import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, Database, Cpu, Layers, ShieldCheck, Zap, Globe, Download } from 'lucide-react';

const Whitepaper: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foundations' | 'risk' | 'settlement' | 'market-comparison'>('foundations');

  return (
    <div className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden" id="whitepaper">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-display font-bold leading-tight text-slate-900 mb-4"
          >
            ShadowPool <span className="text-gradient">Architecture</span>
          </motion.h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            The technical foundation of RetroPick: An on-chain prediction market system powered by Chainlink CRE and Autonomous AI Agents.
          </p>

          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <motion.a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-2xl shadow-blue-600/50 hover:bg-blue-500 transition-all border border-blue-400/20"
            >
              <FileText className="w-5 h-5" />
              <span className="tracking-wide">READ WHITEPAPER</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-3">
            {[
              { id: 'foundations', label: 'LS-LMSR Foundations', icon: <Database className="w-4 h-4" /> },
              { id: 'risk', label: 'Risk & Liquidity', icon: <ShieldCheck className="w-4 h-4" /> },
              { id: 'settlement', label: 'Verifiable Settlement', icon: <Cpu className="w-4 h-4" /> },
              { id: 'market-comparison', label: 'Market Comparison', icon: <Layers className="w-4 h-4" /> },
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all border ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border-blue-500 scale-105'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="relative">
              {/* Decorative gradients behind content */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 blur-xl rounded-[2rem] -z-10"></div>

              <AnimatePresence mode="wait">
                {activeTab === 'foundations' && (
                  <motion.div
                    key="foundations"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-xl space-y-6"
                  >
                    <h3 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">LS-LMSR Foundations</h3>
                    <div className="prose prose-slate max-w-none text-slate-600">
                      <p>
                        RetroPick implements a <strong>Logarithmic Scoring Rule Market Maker (LS-LMSR)</strong> design.
                        This mechanism provides continuous liquidity for prediction markets, maintaining a set of outcome prices that always sum to 1 (representing a valid probability distribution).
                      </p>
                      <p>
                        The core advantage of LS-LMSR is that it bounds the worst-case loss for the market maker while ensuring trades can always occur, even in thin markets.
                        Unlike traditional order books where liquidity can dry up, the LS-LMSR algorithmically determines the cost of shares based on the current market state.
                      </p>
                      <div className="my-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Cost Function Core</h4>
                        <div className="font-mono text-lg text-white">
                          p_i = exp(q_i / b) / Σ exp(q_j / b)
                        </div>
                        <p className="text-slate-400 text-sm mt-2">
                          Where <code>b</code> modulates liquidity depth versus price sensitivity.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'risk' && (
                  <motion.div
                    key="risk"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-xl space-y-6"
                  >
                    <h3 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Risk Calibration & Liquidity</h3>
                    <div className="prose prose-slate max-w-none text-slate-600">
                      <p>
                        A critical aspect of the LS-LMSR design is managing the market maker's inventory risk.
                        The parameter <code>b</code> (liquidity) is calibrated based on a worst-case loss budget <code>L</code>.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                          <h4 className="font-bold text-orange-900 mb-2">Liquidity Formula</h4>
                          <div className="font-mono text-orange-800 text-lg">b = L / log(n)</div>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                          <h4 className="font-bold text-indigo-900 mb-2">Impact</h4>
                          <p className="text-sm text-indigo-800">Larger <code>b</code> = Deeper Order Book = Higher Cost to Move Price.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settlement' && (
                  <motion.div
                    key="settlement"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-xl space-y-6"
                  >
                    <h3 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Verifiable Settlement</h3>
                    <div className="space-y-6">
                      <p className="text-slate-600 text-lg">
                        Markets resolve via <strong>Verde's Refereed Delegation</strong>, ensuring mathematical truth rather than human opinion.
                      </p>
                      <ArchitectureDiagram />
                      <div className="grid grid-cols-3 gap-4 text-center mt-6">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-2xl font-bold text-blue-600 mb-1">1. Run</div>
                          <div className="text-xs text-slate-500 uppercase font-bold">Computation</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-2xl font-bold text-blue-600 mb-1">2. Verify</div>
                          <div className="text-xs text-slate-500 uppercase font-bold">Merkle Proofs</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-2xl font-bold text-blue-600 mb-1">3. Settle</div>
                          <div className="text-xs text-slate-500 uppercase font-bold">On-Chain</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'market-comparison' && (
                  <motion.div
                    key="market-comparison"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-xl space-y-6"
                  >
                    <h3 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Market Evolution</h3>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <h4 className="font-bold text-slate-500 mb-4 text-lg">Legacy: Order Books</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                          <li className="flex items-center gap-2">❌ Liquidity fragments</li>
                          <li className="flex items-center gap-2">❌ High spread in thin markets</li>
                          <li className="flex items-center gap-2">❌ Requires active MMs</li>
                        </ul>
                      </div>
                      <div className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg transform scale-105">
                        <h4 className="font-bold text-blue-700 mb-4 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5 fill-blue-500" />
                          RetroPick: LS-LMSR
                        </h4>
                        <ul className="space-y-3 text-sm text-blue-800">
                          <li className="flex items-center gap-2">✅ Continuous Liquidity (Always Trade)</li>
                          <li className="flex items-center gap-2">✅ Bounded Inventory Risk</li>
                          <li className="flex items-center gap-2">✅ Instant Price Discovery</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArchitectureDiagram = () => {
  return (
    <div className="w-full bg-slate-900 rounded-2xl p-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      {/* Animated Particles via CSS Grid/Flex is harder, keeping SVG for precise paths */}
      <svg viewBox="0 0 400 120" className="w-full h-auto drop-shadow-2xl relative z-10">
        <defs>
          <marker id="arrowhead-glow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Paths */}
        <path d="M60 60 L 140 60" stroke="url(#line-gradient)" strokeWidth="2" markerEnd="url(#arrowhead-glow)" />
        <path d="M220 60 L 300 60" stroke="url(#line-gradient)" strokeWidth="2" markerEnd="url(#arrowhead-glow)" />

        {/* Nodes with pulsing effect */}
        <g transform="translate(10, 40)">
          <rect width="50" height="40" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="25" y="25" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">AI</text>
          <animate attributeName="stroke" values="#475569;#3b82f6;#475569" dur="3s" repeatCount="indefinite" />
        </g>

        <g transform="translate(140, 30)">
          <rect width="80" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
          <text x="40" y="35" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Oracle</text>
          <circle cx="70" cy="15" r="4" fill="#ef4444">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>

        <g transform="translate(300, 30)">
          <rect width="90" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="45" y="35" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Settlement</text>
        </g>

        {/* Moving Data Packets */}
        <circle r="4" fill="#fff" filter="drop-shadow(0 0 4px #3b82f6)">
          <animateMotion repeatCount="indefinite" dur="2s" path="M60 60 L 140 60" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
        </circle>

        <circle r="4" fill="#fff" filter="drop-shadow(0 0 4px #10b981)">
          <animateMotion repeatCount="indefinite" dur="2s" begin="1s" path="M220 60 L 300 60" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
        </circle>
      </svg>
    </div>
  )
}

export default Whitepaper;