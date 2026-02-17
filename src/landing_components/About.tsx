import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Zap, Globe, Cpu, ArrowUpRight } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan: string;
}

const features: Feature[] = [
  {
    title: "AI Market Supply",
    description: "Chainlink CRE workflows continuously generate MarketDrafts with question, outcomes, resolvability playbook, and trust score. Markets become live only when claimed and funded by a creator.",
    icon: <BrainCircuit className="w-8 h-8 text-blue-400" />,
    colSpan: "lg:col-span-1",
  },
  {
    title: "LS-LMSR Pricing",
    description: "Liquidity-Sensitive LMSR provides always-available liquidity and bounded worst-case loss. Liquidity depth adapts to participation, deepening popular markets while enabling long-tail markets.",
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Yellow State Sessions",
    description: "Gasless trading in Nitrolite Yellow sessions. Signed state updates enforce max-cost/min-share constraints; on-chain contracts provide custody, dispute exits, and final settlement without re-pricing.",
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    colSpan: "lg:col-span-1",
  },
];

const FeatureCard: React.FC<{
  feature: Feature;
  index: number;
  style?: any;
}> = ({ feature, index, style }) => {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      // Trigger when 20% of the element is visible
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // Z-index adjustment: Center card (index 1) gets highest, others lower
      className={`bg-white border border-slate-200/80 rounded-2xl p-8 hover:border-slate-300 hover:shadow-[0_8px_30px_-8px_rgba(15,23,42,0.12)] transition-all duration-300 group ${feature.colSpan} h-full relative z-${index === 1 ? '20' : '10'}`}
    >
      <div className="mb-6 inline-block p-3 rounded-lg bg-blue-50 border border-blue-100 group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-colors">
        {feature.icon}
      </div>
      <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
        {feature.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Animation Config
  const startScroll = 0;
  const endScroll = 0.6;

  // Left Card (Index 0) - Event-Driven
  // Moves from Right (110%) to Original (0%)
  const xLeft = useTransform(scrollYProgress, [startScroll, endScroll], ["110%", "0%"]);
  const rotateLeft = useTransform(scrollYProgress, [startScroll, endScroll], [10, 0]);
  const scaleLeft = useTransform(scrollYProgress, [startScroll, endScroll], [0.8, 1]);

  // Center Card (Index 1) - AI Settlement
  // Stays mostly static, slight scale up
  const scaleCenter = useTransform(scrollYProgress, [startScroll, endScroll], [0.9, 1]);

  // Right Card (Index 2) - Cross-Chain
  // Moves from Left (-110%) to Original (0%)
  const xRight = useTransform(scrollYProgress, [startScroll, endScroll], ["-110%", "0%"]);
  const rotateRight = useTransform(scrollYProgress, [startScroll, endScroll], [-10, 0]);
  const scaleRight = useTransform(scrollYProgress, [startScroll, endScroll], [0.8, 1]);

  return (
    <div className="py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">Scalable, MEV-Resistant, <span className="text-slate-400">Institution-Ready.</span></h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div ref={containerRef} className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {features.map((feature, idx) => {
          let style = {};
          if (idx === 0) { // Left: Event-Driven
            style = { x: xLeft, rotateZ: rotateLeft, scale: scaleLeft };
          } else if (idx === 1) { // Center: AI Settlement
            style = { scale: scaleCenter, zIndex: 20 };
          } else if (idx === 2) { // Right: Cross-Chain
            style = { x: xRight, rotateZ: rotateRight, scale: scaleRight };
          }

          return (
            <div key={idx} className={`${feature.colSpan} perspective-1000`}>
              <FeatureCard feature={feature} index={idx} style={style} />
            </div>
          )
        })}
      </div>

      <div className="container mx-auto px-6">
        {/* Large Feature Card spanning full width or 2 cols for visual interest */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="w-full bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_40px_-8px_rgba(15,23,42,0.12)] hover:border-slate-300 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="text-slate-400" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                <Cpu className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">Unified Vault & CCIP</h3>
              <p className="text-slate-600 leading-relaxed max-w-2xl">
                Creator UnifiedVaults (ERC-4626) pool collateral across markets, allocate risk budgets, and accept LP deposits. Chainlink CCIP enables cross-chain deposits—users deposit from any supported chain with collateral normalized and credited to the vault's execution chain.
              </p>
            </div>

            {/* Visual decoration for the large card */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="grid grid-cols-4 gap-2 opacity-100">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`w-12 h-12 rounded bg-white border border-slate-200 animate-pulse shadow-sm`} style={{ animationDelay: `${i * 100}ms` }}></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;