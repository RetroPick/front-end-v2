import React from 'react';
import { motion } from 'framer-motion';

interface ThemeWrapperProps {
    category: string;
    children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ category, children }) => {
    // Determine Theme Classes
    let bgClass = "bg-[#111116]"; // Default dark
    let accentClass = "";
    let effects = null;

    switch (category.toLowerCase()) {
        case 'sports':
            bgClass = "bg-[#0a0a0c] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-purple-900/10 to-[#0a0a0c]";
            accentClass = "border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]";
            effects = (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent shadow-[0_0_10px_#22c55e]" />
                    <div className="absolute top-[20%] w-full h-[1px] bg-green-500/10" />
                    <div className="absolute top-[40%] w-full h-[1px] bg-green-500/10" />
                </div>
            );
            break;
        case 'politics':
            bgClass = "bg-slate-900 bg-[url('/textures/marble.png')] bg-blend-overlay";
            accentClass = "border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
            effects = (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-600 rounded-full blur-[100px]" />
                </div>
            );
            break;
        case 'space':
            bgClass = "bg-black";
            accentClass = "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)]";
            effects = (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-[10%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
                    <div className="absolute top-40 right-[20%] w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_5px_blue] animate-pulse delay-75" />
                    <div className="absolute bottom-40 left-[30%] w-1 h-1 bg-pink-300 rounded-full shadow-[0_0_5px_pink] animate-pulse delay-150" />
                    <div className="absolute top-1/2 right-[10%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white] animate-ping" />
                </div>
            );
            break;
        case 'crypto':
        case 'macro':
            bgClass = "bg-[#051005] font-mono";
            accentClass = "border-green-400/40 shadow-[0_0_10px_rgba(74,222,128,0.2)]";
            effects = (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
                    <div className="w-full h-full bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />
                </div>
            );
            break;
        case 'ai':
            bgClass = "bg-[#0f0c1b]";
            accentClass = "border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]";
            effects = (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <motion.div
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent bg-[size:100px_100px]"
                    />
                </div>
            );
            break;
        default:
            bgClass = "bg-[#111116]";
            break;
    }

    return (
        <div className={`min-h-screen relative w-full overflow-hidden transition-colors duration-500 ${bgClass} ${category === 'crypto' || category === 'macro' ? 'font-mono' : 'font-sans'}`}>
            {effects}
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default ThemeWrapper;
