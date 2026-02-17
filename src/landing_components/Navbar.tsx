import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl h-14 flex md:grid md:grid-cols-3 items-center justify-between md:justify-items-center px-5 md:px-6 rounded-2xl border border-slate-200/60 shadow-sm shadow-slate-900/5 backdrop-blur-xl bg-white/80"
    >
      <div className="flex items-center gap-2 cursor-pointer md:justify-self-start" onClick={() => scrollToSection('home')}>
        <Logo className="w-10 h-10 shadow-md shadow-blue-500/20" />

        <span className="font-display font-bold text-lg tracking-tight text-slate-900 hidden sm:block">RetroPick</span>
      </div>

      <div className="hidden md:flex items-center justify-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
        {['Home', 'About', 'Whitepaper'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="relative px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span className="relative z-10">{item}</span>
            <span className="absolute inset-0 bg-white rounded-full shadow-sm opacity-0 transition-opacity duration-300 hover:opacity-100 -z-0 border border-slate-200/50"></span>
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Check if we are already in the app, or need to navigate
          window.location.href = '/app';
        }}
        className="group relative px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white overflow-hidden transition-colors duration-200 md:justify-self-end"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="relative flex items-center gap-2 font-display font-medium text-sm">
          <span>Launch App</span>
          <Rocket className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
        </div>
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;