import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import VaultInteractionPanel from "@/components/VaultInteractionPanel";
import VaultPerformanceChart from "@/components/VaultPerformanceChart";

const VaultDetail = () => {
    const { id } = useParams();
    const [timeRange, setTimeRange] = useState<"1W" | "1M" | "1Y">("1W");

    // Mock Data simulating an Active Vault
    const vaultData = {
        name: "USDC Market Liquidity Vault",
        type: "ERC-4626",
        asset: "USDC",
        contract: "0x8f3C...291a",
        tvl: 4820000,
        sharePrice: 1.0428,
        totalSupply: 4620000,
        utilization: 96,
        apy: 12.4,
        myBalance: 12500.00
    };

    const transactions = [
        { hash: "0x3a...91f2", type: "Deposit", amount: 50000.00, shares: 47932.12, time: "2m ago", color: "text-green-500" },
        { hash: "0x8b...22c1", type: "Fee Accrual", amount: 1240.55, shares: null, time: "15m ago", color: "text-blue-500" },
        { hash: "0x1c...55d9", type: "Withdraw", amount: 10000.00, shares: 9588.42, time: "1h ago", color: "text-purple-500" },
        { hash: "0x9f...11a2", type: "Paid to Ledger", amount: 5000.00, shares: null, time: "3h ago", color: "text-amber-500" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#060606] font-sans text-slate-900 dark:text-gray-100 transition-colors duration-300">
            <Header />

            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 100, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-8 border-b border-slate-200 dark:border-white/10 pb-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-500 mb-2">
                                <Link to="/app" className="hover:text-blue-500 transition-colors">Home</Link>
                                <Icon name="chevron_right" className="text-xs" />
                                <Link to="/app/liquidity" className="hover:text-blue-500 transition-colors">Liquidity</Link>
                                <Icon name="chevron_right" className="text-xs" />
                                <span className="text-slate-900 dark:text-white font-medium">Vault #{id}</span>
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{vaultData.name}</h1>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">{vaultData.type}</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-gray-400 font-mono">
                                <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">$</span>
                                    <span>Asset: <span className="text-slate-900 dark:text-white font-bold">{vaultData.asset}</span></span>
                                </div>
                                <span className="text-slate-300 dark:text-white/10">|</span>
                                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors group">
                                    <span>Contract: {vaultData.contract}</span>
                                    <Icon name="content_copy" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white dark:bg-[#15181D] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium flex items-center gap-2 transition-all shadow-sm">
                                <Icon name="description" className="text-base" /> Contract
                            </button>
                            <button className="px-4 py-2 bg-white dark:bg-[#15181D] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium flex items-center gap-2 transition-all shadow-sm">
                                <Icon name="analytics" className="text-base" /> Analytics
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Stats & Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Share Price */}
                            <div className="bg-white dark:bg-[#15181D] p-6 rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon name="trending_up" className="text-5xl text-blue-500" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">Share Price</p>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-mono font-medium text-slate-900 dark:text-white tracking-tighter">{vaultData.sharePrice}</span>
                                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500">USDC</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 w-fit px-1.5 py-0.5 rounded border border-green-200 dark:border-green-500/30">
                                    <Icon name="arrow_upward" className="text-[12px]" />
                                    <span>2.4% (30d)</span>
                                </div>
                            </div>

                            {/* TVL */}
                            <div className="bg-white dark:bg-[#15181D] p-6 rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon name="account_balance_wallet" className="text-5xl text-slate-900 dark:text-white" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">Total Assets (TVL)</p>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-mono font-medium text-slate-900 dark:text-white tracking-tighter">{(vaultData.tvl / 1000000).toFixed(2)}M</span>
                                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500">USDC</span>
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-gray-500 mt-1">
                                    Across <span className="text-slate-900 dark:text-white font-bold">14</span> Active Markets
                                </div>
                            </div>

                            {/* Utilization */}
                            <div className="bg-white dark:bg-[#15181D] p-6 rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon name="pie_chart" className="text-5xl text-purple-500" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">Total Supply</p>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-mono font-medium text-slate-900 dark:text-white tracking-tighter">{(vaultData.totalSupply / 1000000).toFixed(2)}M</span>
                                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500">LP-USDC</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: `${vaultData.utilization}%` }}></div>
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-gray-500 mt-1 text-right">{vaultData.utilization}% Utilized</div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-white dark:bg-[#15181D] rounded-2xl border border-slate-200 dark:border-white/5 p-6 min-h-[300px] flex flex-col shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6 z-10">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Performance (APY)</h3>
                                <div className="flex gap-2">
                                    {["1W", "1M", "1Y"].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range as any)}
                                            className={`text-[10px] px-3 py-1 rounded-lg transition-all ${timeRange === range
                                                ? "bg-slate-900 dark:bg-white text-white dark:text-black font-bold"
                                                : "text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-grow w-full relative h-[300px] mt-4">
                                <VaultPerformanceChart timeRange={timeRange} />
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-[#15181D] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                            <div className="px-6 py-5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Activity History</h3>
                                <div className="flex gap-4 text-[11px] font-medium text-slate-500 dark:text-gray-500">
                                    <button className="text-blue-600 dark:text-blue-400 border-b border-blue-500 pb-0.5">All</button>
                                    <button className="hover:text-slate-900 dark:hover:text-white transition-colors">Deposits</button>
                                    <button className="hover:text-slate-900 dark:hover:text-white transition-colors">Withdraws</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-500 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                                            <th className="px-6 py-3 font-semibold">Tx Hash</th>
                                            <th className="px-6 py-3 font-semibold">Type</th>
                                            <th className="px-6 py-3 font-semibold text-right">Amount (USDC)</th>
                                            <th className="px-6 py-3 font-semibold text-right">Shares</th>
                                            <th className="px-6 py-3 font-semibold text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {transactions.map((tx, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">{tx.hash}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wide ${tx.color}`}>{tx.type}</span>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs text-slate-900 dark:text-white text-right">{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-gray-400 text-right">{tx.shares ? tx.shares.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "-"}</td>
                                                <td className="px-6 py-4 text-right text-slate-400 dark:text-gray-500 text-[10px]">{tx.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interaction Panel */}
                    <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                        <VaultInteractionPanel />

                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-4 flex items-start gap-3">
                            <Icon name="info" className="text-blue-500 mt-0.5 text-lg" />
                            <div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Epoch Rebalance</h4>
                                <p className="text-[10px] text-slate-600 dark:text-blue-200/70 leading-relaxed">
                                    This vault rebalances every 24h. Deposits made now will be deployed in the next epoch (approx. 4h 12m).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VaultDetail;
