import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VaultLiquidity = () => {
    const [filter, setFilter] = useState("all");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-gray-100 font-sans transition-colors duration-300 pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">

                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Liquidity Provider Dashboard</h1>
                            <p className="text-slate-500 dark:text-gray-400 max-w-2xl font-light">Manage your liquidity positions across ERC-4626 Vaults. Earn yield from trading fees.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 text-sm font-medium flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
                                <Icon name="history" className="text-lg" /> History
                            </button>
                            <Link to="/app/vault/1" className="px-6 py-2.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all duration-200 shadow-lg shadow-blue-500/10 dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] rounded-xl">
                                <Icon name="add" className="text-lg" /> New Position
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Total LP TVL */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className="absolute -right-4 -top-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon name="account_balance" className="text-[120px] text-slate-900 dark:text-white" />
                            </div>
                            <h3 className="text-xs font-medium text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Total LP TVL</h3>
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">$4,291,040.25</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-500/20">
                                    <Icon name="arrow_upward" className="text-[12px] mr-1" /> 2.4%
                                </span>
                                <span className="text-xs text-slate-500 dark:text-gray-500">Global liquidity</span>
                            </div>
                        </motion.div>

                        {/* Card 2: Fees Generated */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className="absolute -right-4 -top-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon name="payments" className="text-[120px] text-slate-900 dark:text-white" />
                            </div>
                            <h3 className="text-xs font-medium text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Fees Generated</h3>
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">$182,304.11</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 dark:text-gray-500">Distributed to LPs since inception</span>
                            </div>
                        </motion.div>

                        {/* Card 3: My LP Value */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-l-[3px] border-l-blue-500 dark:border-l-blue-500 backdrop-blur-sm shadow-sm dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className="absolute -right-4 -top-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon name="wallet" className="text-[120px] text-slate-900 dark:text-white" />
                            </div>
                            <h3 className="text-xs font-medium text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">My LP Value</h3>
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">$12,450.00</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-500/20">
                                    +$340.20 (24h)
                                </span>
                                <span className="text-xs text-slate-500 dark:text-gray-500">3 active positions</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* My LP Positions Table */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Icon name="pie_chart" className="text-blue-500 dark:text-blue-400" />
                            My LP Positions
                        </h2>
                    </div>
                    <div className="bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-transparent border-b border-slate-200 dark:border-white/10">
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-left">Market Name</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">Shares Owned</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">Underlying Value</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">Share Price</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">PnL</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {/* Position 1 */}
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-5 px-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-white/10 flex items-center justify-center rounded-lg group-hover:border-blue-500/30 dark:group-hover:border-blue-500/50 transition-colors">
                                                    <Icon name="rocket_launch" className="text-slate-400 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 text-base" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">SpaceX Starship Orbit 2025</div>
                                                    <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-0.5">Vault: 0x82...91</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-400">4,200.00 LP</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono font-bold text-slate-900 dark:text-white">$4,305.00</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-400">1.025 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-blue-600 dark:text-blue-400">+$105.00</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <Link to="/app/vault/1" className="inline-block text-xs px-4 py-2 font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all rounded-lg">Manage</Link>
                                        </td>
                                    </tr>
                                    {/* Position 2 */}
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-5 px-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-white/10 flex items-center justify-center rounded-lg group-hover:border-blue-500/30 dark:group-hover:border-blue-500/50 transition-colors">
                                                    <Icon name="psychology" className="text-slate-400 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 text-base" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">GPT-5 Release Q4 2024</div>
                                                    <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-0.5">Vault: 0x33...42</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-400">2,500.00 LP</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono font-bold text-slate-900 dark:text-white">$2,512.50</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-400">1.005 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-blue-600 dark:text-blue-400">+$12.50</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <button className="text-xs px-4 py-2 font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all rounded-lg">Manage</button>
                                        </td>
                                    </tr>
                                    {/* Position 3 */}
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-5 px-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-white/10 flex items-center justify-center rounded-lg group-hover:border-blue-500/30 dark:group-hover:border-blue-500/50 transition-colors">
                                                    <Icon name="currency_bitcoin" className="text-slate-400 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 text-base" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">Bitcoin &gt; $100k 2024</div>
                                                    <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-0.5">Vault: 0x72...21</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-400">5,500.00 LP</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono font-bold text-slate-900 dark:text-white">$5,632.50</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-400">1.024 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-blue-600 dark:text-blue-400">+$132.50</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <button className="text-xs px-4 py-2 font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all rounded-lg">Manage</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Table Footer */}
                        <div className="bg-slate-50 dark:bg-[#111111]/50 px-6 py-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-gray-500 flex justify-between items-center backdrop-blur-md">
                            <span>Total Invested Capital: <span className="font-mono font-bold text-slate-900 dark:text-gray-300">$12,200.00</span></span>
                            <span>Net APY: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">~8.2%</span></span>
                        </div>
                    </div>
                </div>

                {/* All LP Vaults Table */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 px-1">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Icon name="dataset" className="text-blue-500 dark:text-blue-400" />
                            All LP Vaults
                        </h2>
                        <div className="flex flex-wrap md:flex-nowrap gap-3">
                            <div className="flex border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#111111] rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setFilter("binary")}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white/50 dark:hover:bg-white/5 border-r border-slate-200 dark:border-white/10 transition-colors ${filter === "binary" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-500"}`}
                                >
                                    Binary
                                </button>
                                <button
                                    onClick={() => setFilter("categorical")}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white/50 dark:hover:bg-white/5 transition-colors ${filter === "categorical" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-500"}`}
                                >
                                    Categorical
                                </button>
                                <button
                                    onClick={() => setFilter("scalar")}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white/50 dark:hover:bg-white/5 border-l border-slate-200 dark:border-white/10 transition-colors ${filter === "scalar" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-500"}`}
                                >
                                    Scalar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-transparent border-b border-slate-200 dark:border-white/10">
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-left">Market / Vault</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">TVL</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">Share Price</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-right">24h Fees</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-center">Status</th>
                                        <th className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium py-4 px-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {/* Vault 1 */}
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                        <td className="py-5 px-6 align-middle">
                                            <div className="font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">US Presidential Election 2024</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-1">ID: 0x99...2a • Categorical (3)</div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-300">$1,205,000</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-500 dark:text-gray-500">1.082 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-blue-600 dark:text-blue-400 font-bold shadow-blue-500/5 dark:shadow-blue-500/5">$1,240.50</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 border border-blue-500/30 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-md">Active</span>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <Link to="/app/vault/1" className="inline-block opacity-0 group-hover:opacity-100 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all px-4 py-2 text-xs uppercase font-bold tracking-wider rounded-lg">Deposit</Link>
                                        </td>
                                    </tr>
                                    {/* Vault 2 */}
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                        <td className="py-5 px-6 align-middle">
                                            <div className="font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">Fed Interest Rate Decision Dec 2024</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-1">ID: 0x12...bb • Binary</div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-300">$850,000</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-500 dark:text-gray-500">1.045 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-blue-600 dark:text-blue-400 font-bold">$890.20</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 border border-blue-500/30 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-md">Active</span>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <button className="opacity-0 group-hover:opacity-100 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all px-4 py-2 text-xs uppercase font-bold tracking-wider rounded-lg">Deposit</button>
                                        </td>
                                    </tr>
                                    {/* Vault 3 (Empty) */}
                                    <tr className="bg-slate-50/50 dark:bg-[#1A1A1A]/30 hover:bg-slate-100/50 dark:hover:bg-[#1A1A1A]/50 transition-colors group">
                                        <td className="py-5 px-6 align-middle opacity-75">
                                            <div className="font-bold text-slate-700 dark:text-gray-400">Super Bowl LIX Halftime Show First Song</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-600 font-mono mt-1">ID: 0x55...cc • Categorical (10)</div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-500 dark:text-gray-600">$0.00</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-500 dark:text-gray-600">1.000 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-500 dark:text-gray-600">$0.00</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 border border-slate-300 dark:border-gray-700 bg-slate-200 dark:bg-gray-800 text-slate-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-md">Empty</span>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <Link to="/app/vault/1" className="inline-block bg-transparent text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-white/5 px-4 py-2 text-xs uppercase font-bold tracking-wider rounded-lg transition-all">Seed Liquidity</Link>
                                        </td>
                                    </tr>
                                    {/* Info Row */}
                                    <tr className="bg-amber-50 dark:bg-[rgba(255,165,0,0.05)] border-b-0 border-slate-200 dark:border-white/10">
                                        <td className="py-3 px-6 text-center border-b border-slate-200 dark:border-white/10" colSpan={6}>
                                            <div className="flex items-center justify-center gap-2 text-xs text-amber-600/80 dark:text-orange-400/80 italic">
                                                <Icon name="info" className="text-[16px] text-amber-500 dark:text-orange-400/60" />
                                                Vaults with no liquidity: No LPs - LP fees route to treasury until seeded.
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Vault 4 */}
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                        <td className="py-5 px-6 align-middle">
                                            <div className="font-bold text-slate-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">Euro 2024 Winner</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-1">ID: 0x78...ee • Categorical (5)</div>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-600 dark:text-gray-300">$420,500</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-slate-500 dark:text-gray-500">1.120 USDC</td>
                                        <td className="py-5 px-6 align-middle text-right font-mono text-blue-600 dark:text-blue-400 font-bold">$310.00</td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 border border-blue-500/30 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-md">Active</span>
                                        </td>
                                        <td className="py-5 px-6 align-middle text-center">
                                            <button className="opacity-0 group-hover:opacity-100 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all px-4 py-2 text-xs uppercase font-bold tracking-wider rounded-lg">Deposit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111111]/50 flex items-center justify-between backdrop-blur-md">
                            <div className="text-xs text-slate-500 dark:text-gray-500">
                                Showing <span className="font-bold text-slate-900 dark:text-white">1-5</span> of <span className="font-bold text-slate-900 dark:text-white">24</span> vaults
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 text-slate-400 dark:text-gray-400" disabled>
                                    <Icon name="chevron_left" className="text-[16px]" />
                                </button>
                                <button className="p-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    <Icon name="chevron_right" className="text-[16px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default VaultLiquidity;
