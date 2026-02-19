import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import ClaimSeedModal from "@/components/ClaimSeedModal";
import ClaimSuccessModal from "@/components/ClaimSuccessModal";

// Mock Data for Vault Items
const PROPOSED_MARKETS = [
    {
        id: "D-8291",
        question: "Will SpaceX Starship successfully reach orbit before April 2025?",
        category: "Space",
        icon: "rocket_launch",
        type: "Binary",
        settlement: "USDC",
        minSeed: "$5,000",
        resolution: "Apr 1, 2025",
        confidence: "HIGH",
        bgImage: "https://images.unsplash.com/photo-1541185933-710f50b908eb?q=80&w=3131&auto=format&fit=crop", // Space-like image
        isHot: false
    },
    {
        id: "D-8342",
        question: "GPT-5 release date announced by OpenAI in Q4 2024?",
        category: "AI & Tech",
        icon: "psychology",
        type: "Binary",
        settlement: "ETH",
        minSeed: "2.5 ETH",
        resolution: "Jan 1, 2025",
        confidence: "MEDIUM",
        bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop", // AI/Tech image
        isHot: true
    },
    {
        id: "D-8519",
        question: "Dune: Part Two worldwide box office > $1 Billion?",
        category: "Entertainment",
        icon: "movie",
        type: "Binary",
        settlement: "USDC",
        minSeed: "$1,000",
        resolution: "Jun 30, 2024",
        confidence: "HIGH",
        bgImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop", // Cinema image
        isHot: false
    }
];

const CLAIMED_MARKETS = [
    {
        id: "D-7710",
        question: "Lakers to win NBA Finals 2025?",
        category: "Sports",
        icon: "sports_basketball",
        type: "Binary",
        settlement: "USDC",
        seed: "$10,000",
        claimedBy: "0x4a...9f2",
        status: "Pending Approval",
        bgImage: "https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=2690&auto=format&fit=crop" // Basketball image
    }
];

const PUBLISHED_MARKETS = [
    {
        id: "D-7221",
        question: "Bitcoin to break $100k barrier in 2024?",
        category: "Crypto",
        icon: "currency_bitcoin",
        status: "Trading Live",
        volume: "$1.2M",
        progress: 75,
        bgImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2669&auto=format&fit=crop" // Crypto image
    }
];

const Vault = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"Proposed" | "Claimed" | "Published">("Proposed");
    const [selectedMarket, setSelectedMarket] = useState<any>(null);
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleClaimClick = (e: React.MouseEvent, market: any) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedMarket(market);
        setIsClaimModalOpen(true);
    };

    const handleClaimSuccess = () => {
        setIsClaimModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleGoToStatus = () => {
        setIsSuccessModalOpen(false);
        // Navigate to a status page or switch tab to Claimed
        setActiveTab("Claimed");
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans text-slate-900 dark:text-gray-100 transition-colors duration-300">
            <Header />

            {/* Dynamic Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 100, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Draft Board</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl mb-8 font-light">
                        Review, claim, and seed AI-proposed prediction markets before they go live.
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-1">
                        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab("Proposed")}
                                className={cn(
                                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all",
                                    activeTab === "Proposed"
                                        ? "border-blue-500 text-blue-600 dark:text-white"
                                        : "border-transparent text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 hover:border-slate-300 dark:hover:border-gray-700"
                                )}
                            >
                                <Icon name="smart_toy" className={cn("text-[20px]", activeTab === "Proposed" ? "text-blue-500" : "")} />
                                Proposed
                                <span className="ml-1 bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white font-bold py-0.5 px-2 rounded-full text-xs">
                                    {PROPOSED_MARKETS.length}
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveTab("Claimed")}
                                className={cn(
                                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all",
                                    activeTab === "Claimed"
                                        ? "border-blue-500 text-blue-600 dark:text-white"
                                        : "border-transparent text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 hover:border-slate-300 dark:hover:border-gray-700"
                                )}
                            >
                                <Icon name="lock_clock" className="text-[20px]" /> Claimed
                                <span className="ml-1 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-400 font-bold py-0.5 px-2 rounded-full text-xs">
                                    {CLAIMED_MARKETS.length}
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveTab("Published")}
                                className={cn(
                                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all",
                                    activeTab === "Published"
                                        ? "border-blue-500 text-blue-600 dark:text-white"
                                        : "border-transparent text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 hover:border-slate-300 dark:hover:border-gray-700"
                                )}
                            >
                                <Icon name="public" className="text-[20px]" /> Published
                                <span className="ml-1 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-400 font-bold py-0.5 px-2 rounded-full text-xs">
                                    {PUBLISHED_MARKETS.length}
                                </span>
                            </button>
                        </nav>

                        <button className="hidden md:flex items-center text-sm text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
                            <Icon name="download" className="text-[18px]" /> Export Data
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-grow md:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="search" className="text-slate-400 dark:text-gray-600" />
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-xl text-sm placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 transition-colors text-slate-900 dark:text-white shadow-sm"
                            placeholder="Search draft question or ID..."
                            type="text"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 items-center flex-grow">
                        {["Market Type", "Asset", "Resolve Time"].map((filter) => (
                            <div key={filter} className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm">
                                    <Icon name={filter === "Market Type" ? "category" : filter === "Asset" ? "attach_money" : "event"} className="text-[18px] text-slate-400 dark:text-gray-500" />
                                    {filter}
                                    <Icon name="expand_more" className="text-[18px] text-slate-400 dark:text-gray-500" />
                                </button>
                            </div>
                        ))}

                        <div className="ml-auto hidden xl:block text-xs font-mono text-slate-400 dark:text-gray-600">
                            {/* // SHOWING {PROPOSED_MARKETS.length} PROPOSED DRAFTS */}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {activeTab === "Proposed" && PROPOSED_MARKETS.map((market) => (
                            <Link to={`/app/vault/${market.id}`} key={market.id} className="contents">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-0 hover:border-blue-400/40 transition-all duration-300 group flex flex-col h-full relative overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none cursor-pointer"
                                >
                                    <div className="absolute inset-0 z-0 h-48">
                                        <img alt={market.category} className="w-full h-full object-cover opacity-90 dark:opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-105" src={market.bgImage} />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:via-black/40 dark:to-slate-950/95" />
                                    </div>

                                    <div className="relative z-10 p-6 flex flex-col h-full mt-20">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 backdrop-blur-sm shadow-sm">
                                                Proposed
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 bg-white/80 dark:bg-black/50 px-2 py-1 rounded border border-slate-200 dark:border-white/5 shadow-sm">#{market.id}</span>
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                                <Icon name={market.icon} className="text-[14px]" /> {market.category}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm line-clamp-3">
                                                {market.question}
                                            </h3>

                                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-2 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Type</span>
                                                    <span className="font-medium text-slate-700 dark:text-gray-200">{market.type}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Settlement</span>
                                                    <span className="font-medium text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                                                        {/* Placeholder for Token Icon */}
                                                        <div className="size-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                                                        {market.settlement}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Min Seed</span>
                                                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-base">{market.minSeed}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Resolution</span>
                                                    <span className="font-medium text-slate-700 dark:text-gray-200">{market.resolution}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                            <div className="text-[10px] font-medium text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-black/40 px-2 py-1 rounded">
                                                CONFIDENCE: <span className={cn("font-bold ml-1", market.confidence === "HIGH" ? "text-green-500 dark:text-green-400" : "text-yellow-500")}>{market.confidence}</span>
                                            </div>
                                            <button
                                                onClick={(e) => handleClaimClick(e, market)}
                                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-sm font-bold py-2 px-5 rounded-lg shadow-lg shadow-blue-500/30 dark:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 transform active:scale-95"
                                            >
                                                Claim & Seed <Icon name="arrow_forward" className="text-[16px] font-bold" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}

                        {activeTab === "Claimed" && CLAIMED_MARKETS.map((market) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={market.id}
                                className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-0 hover:border-purple-400/40 transition-all duration-300 group flex flex-col h-full relative overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none"
                            >
                                <div className="absolute inset-0 z-0 h-48">
                                    <img alt={market.category} className="w-full h-full object-cover opacity-90 dark:opacity-40 grayscale transition-all duration-500" src={market.bgImage} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:via-black/40 dark:to-slate-950/95" />
                                </div>

                                <div className="relative z-10 p-6 flex flex-col h-full mt-20">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 backdrop-blur-sm shadow-sm">
                                            Claimed
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 bg-white/80 dark:bg-black/50 px-2 py-1 rounded border border-slate-200 dark:border-white/5 shadow-sm">#{market.id}</span>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">
                                            <Icon name={market.icon} className="text-[14px]" /> {market.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-gray-300 leading-snug mb-6">
                                            {market.question}
                                        </h3>

                                        <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-2 text-sm opacity-80">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Type</span>
                                                <span className="font-medium text-slate-700 dark:text-gray-300">{market.type}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Settlement</span>
                                                <span className="font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">{market.settlement}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Seed</span>
                                                <span className="font-mono font-medium text-slate-600 dark:text-gray-400">{market.seed}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-1">Claimed By</span>
                                                <span className="font-mono text-xs text-purple-600 dark:text-purple-400 truncate w-24">{market.claimedBy}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                        <div className="text-[10px] font-medium text-slate-500 dark:text-gray-500 flex items-center gap-1 bg-slate-100 dark:bg-black/40 px-2 py-1 rounded">
                                            <Icon name="schedule" className="text-[12px]" /> {market.status}
                                        </div>
                                        <button className="bg-transparent border border-slate-300 dark:border-gray-600 hover:border-slate-400 dark:hover:border-gray-400 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-gray-300 text-sm font-medium py-2 px-5 rounded-lg transition-colors">
                                            View Status
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {activeTab === "Published" && PUBLISHED_MARKETS.map((market) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={market.id}
                                className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-0 hover:border-green-400/40 transition-all duration-300 group flex flex-col h-full relative overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none"
                            >
                                <div className="absolute inset-0 z-0 h-48">
                                    <img alt={market.category} className="w-full h-full object-cover opacity-90 dark:opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-105" src={market.bgImage} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:via-black/40 dark:to-slate-950/95" />
                                </div>

                                <div className="relative z-10 p-6 flex flex-col h-full mt-20">
                                    <div className="absolute top-0 right-0 p-3 mt-20">
                                        <Icon name="check_circle" className="text-green-500 drop-shadow-md text-2xl" />
                                    </div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20 backdrop-blur-sm shadow-sm">
                                            Published
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 bg-white/80 dark:bg-black/50 px-2 py-1 rounded border border-slate-200 dark:border-white/5 mr-6">#{market.id}</span>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">
                                            <Icon name={market.icon} className="text-[14px]" /> {market.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-6 drop-shadow-sm">
                                            {market.question}
                                        </h3>

                                        <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-1.5 mt-4 mb-2">
                                            <div className="bg-green-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: `${market.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 dark:text-gray-400 mb-4">
                                            <span className="text-green-600 dark:text-green-400">{market.status}</span>
                                            <span>Vol: {market.volume}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                        <div className="text-[10px] font-medium text-slate-500 dark:text-gray-400">
                                            MARKET #402
                                        </div>
                                        <button className="bg-transparent border border-fuchsia-400 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/10 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] text-sm font-bold py-2 px-5 rounded-lg transition-all">
                                            Open Market
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Mock */}
                <div className="mt-12 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-8">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-gray-400">
                                Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">3</span> of <span className="font-bold text-slate-900 dark:text-white">12</span> results
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                <a className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-white/10 hover:bg-slate-50 dark:hover:bg-white/5 focus:z-20 focus:outline-offset-0" href="#">
                                    <span className="sr-only">Previous</span>
                                    <Icon name="chevron_left" className="text-sm" />
                                </a>
                                <a aria-current="page" className="relative z-10 inline-flex items-center bg-blue-50 dark:bg-blue-500/20 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/30 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="#">1</a>
                                <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-white/10 hover:bg-slate-50 dark:hover:bg-white/5 focus:z-20 focus:outline-offset-0" href="#">2</a>
                                <a className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-white/10 hover:bg-slate-50 dark:hover:bg-white/5 focus:z-20 focus:outline-offset-0" href="#">
                                    <span className="sr-only">Next</span>
                                    <Icon name="chevron_right" className="text-sm" />
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />

            {/* Claim Modals */}
            <AnimatePresence>
                {isClaimModalOpen && (
                    <ClaimSeedModal
                        isOpen={isClaimModalOpen}
                        onClose={() => setIsClaimModalOpen(false)}
                        onSuccess={handleClaimSuccess}
                    />
                )}
                {isSuccessModalOpen && (
                    <ClaimSuccessModal
                        isOpen={isSuccessModalOpen}
                        onClose={() => setIsSuccessModalOpen(false)}
                        onGoToStatus={handleGoToStatus}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Vault;
