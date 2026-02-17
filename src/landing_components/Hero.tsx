import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';

// Import ModelViewer directly to prevent context loss
import ModelViewer from './ModelViewer'; // Re-enabled for 3D model
import ErrorBoundary from '@/components/ErrorBoundary';

const Hero: React.FC = () => {
  const [resetKey, setResetKey] = React.useState(0);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background - Plain White with Top Circular Blue Gradient */}
      {/* Background - Plain White with Top Circular Blue Gradient */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.5),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_60%_40%_at_50%_-20%,rgba(6,182,212,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">


          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-display font-bold leading-tight text-slate-900"
          >
            Predict the Future with <span className="text-gradient animate-text-shimmer">AI Precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            The world's first prediction market powered by Chainlink CRE and Autonomous AI Agents. Don't just bet—invest in high-fidelity probability data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5">
              Start Trading <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-lg font-medium transition-all border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md">
              View Markets
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-500"
          >
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /> <span className="text-xs font-mono">AUDITED BY CERTIK</span></div>
            <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500" /> <span className="text-xs font-mono">$42M TVL</span></div>
          </motion.div>
        </div>

        {/* Right Content: 3D Model */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="hidden lg:flex justify-center items-center h-[600px] w-full relative"
        >
          <div className="relative w-full h-full">
            <ErrorBoundary key={resetKey} fallback={
              <div className="relative w-full h-full max-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
                  alt="AI Prediction Market"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                />

                {/* Retry Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setResetKey(prev => prev + 1)}
                    className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4 text-blue-600" />
                    Retry Loading 3D Model
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/50 shadow-lg group-hover:opacity-0 transition-opacity">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Live Market Data</div>
                      <div className="text-xs text-slate-500">Real-time probability updates via Chainlink</div>
                    </div>
                  </div>
                </div>
              </div>
            }>
              <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center text-slate-400">Loading 3D Model...</div>}>
                <ModelViewer />
              </React.Suspense>
            </ErrorBoundary>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-400 to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>
    </div>
  );
};

export default Hero;