import React from 'react';
import { Github, Twitter, Disc, Instagram, Youtube, Linkedin } from 'lucide-react';
import Logo from './Logo';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: -100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-4 md:mx-10 mb-6 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-12 md:py-16 overflow-hidden shadow-2xl shadow-blue-900/20"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Newsletter Section */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Get exclusive updates, sent to <span className="text-blue-300">your inbox.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="name@email.com"
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all backdrop-blur-sm"
            />
            <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left: Links */}
          <div className="flex flex-col gap-4 text-sm text-blue-100/80">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Legal Notice/Imprint</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">MiCA Whitepaper</a>
          </div>

          {/* Right: Socials & Info */}
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/90">Follow Us</span>
              <div className="flex gap-4">
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><Disc className="w-5 h-5" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              </div>
            </div>

            <p className="text-xs text-blue-200/60 text-right max-w-md leading-relaxed">
              Residents of restricted jurisdictions are not eligible for certain functionalities of the game. <a href="#" className="underline hover:text-white">See full terms</a>
            </p>

            <div className="flex flex-col md:items-end gap-1 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Logo className="w-10 h-10" />
                <span className="font-display font-bold text-2xl text-white tracking-tight">RetroPick</span>
              </div>
              <p className="text-xs text-blue-200/50">Created by RetroPick</p>
            </div>
          </div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;