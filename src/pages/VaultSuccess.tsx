import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";

const VaultSuccess = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-gray-100 flex items-center justify-center relative overflow-hidden font-sans p-4 transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 dark:opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 100, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            {/* Light Mode Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(255,255,255,0)_70%)] dark:hidden pointer-events-none" />
            {/* Dark Mode Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,rgba(0,0,0,0)_70%)] hidden dark:block pointer-events-none" />

            <main className="relative z-10 w-full max-w-2xl">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/5 dark:shadow-cyan-500/10 border border-slate-200 dark:border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 dark:via-cyan-500/80 to-transparent opacity-50" />

                    <div className="flex flex-col items-center text-center mb-10">
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-100 dark:border-cyan-500/30 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 dark:shadow-cyan-500/20"
                        >
                            <Icon name="check" className="text-5xl text-blue-600 dark:text-cyan-400 font-bold" />
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Draft Claimed Successfully</h1>
                        <p className="text-slate-500 dark:text-gray-400 text-base max-w-md mx-auto">Your draft has been seeded and is now live on the prediction market.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden mb-10">
                        <div className="bg-white dark:bg-black/40 p-6 flex flex-col items-start justify-center group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2">Draft ID</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-900 dark:text-white">#D-8291</span>
                                <button className="text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"><Icon name="content_copy" className="text-sm" /></button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-black/40 p-6 flex flex-col items-start justify-center group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2">Seed Amount</span>
                            <span className="text-xl font-bold text-blue-600 dark:text-cyan-400">500.00 USDC</span>
                        </div>
                        <div className="bg-white dark:bg-black/40 p-6 flex flex-col items-start justify-center group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2">Locked Shares</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">50,000 <span className="text-xs font-normal text-slate-500 dark:text-gray-500">SHARES</span></span>
                        </div>
                        <div className="bg-white dark:bg-black/40 p-6 flex flex-col items-start justify-center group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2">Unlock Date</span>
                            <div className="flex items-center gap-2">
                                <Icon name="lock" className="text-slate-400 dark:text-gray-500" />
                                <span className="text-xl font-bold text-slate-900 dark:text-white">May 02, 2025</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                                    <Icon name="account_balance" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider">Liquidity Vault</span>
                                    <span className="text-sm font-mono text-slate-700 dark:text-gray-300">0x71C...92F1</span>
                                </div>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <Icon name="content_copy" className="text-base" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/app/vault" className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-black font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 hover:shadow-blue-500/40 dark:hover:shadow-cyan-500/40 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-center">
                            <span>Go to Claim Status</span>
                            <Icon name="arrow_forward" className="text-lg" />
                        </Link>
                        <Link to="/app/vault" className="flex-1 bg-transparent border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 text-slate-700 dark:text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center">
                            Back to Draft Board
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-slate-400 dark:text-white/20 font-mono tracking-widest uppercase">Transaction Confirmed • Block 19283745</p>
                    </div>

                </motion.div>
            </main>
        </div>
    );
};

export default VaultSuccess;
