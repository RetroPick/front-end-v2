import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { relayerApi } from '@/lib/relayerApi';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import Header from '@/components/Header';
import { useAccount, useReadContract, useReadContracts, useChainId, useConfig } from 'wagmi';
import { readContract, writeContract, waitForTransactionReceipt, signTypedData } from 'wagmi/actions';
import { CONTRACT_ADDRESSES, ABIS } from '@/contracts/config';
import { formatUnits } from 'viem';

const CreatorDashboard = () => {
    const [activeTab, setActiveTab] = useState<'drafts' | 'active'>('drafts');
    const [claimingId, setClaimingId] = useState<string | null>(null);

    const { address } = useAccount();
    const chainId = useChainId();
    const config = useConfig();
    const { toast } = useToast();
    const navigate = useNavigate();

    // 1. Fetch total drafts
    const { data: countData } = useReadContract({
        address: CONTRACT_ADDRESSES.MarketDraftBoard,
        abi: ABIS.MarketDraftBoard,
        functionName: 'draftCount',
    });
    const count = Number(countData || 0);

    // 2. Multicall to get all draft IDs
    const { data: draftIdsData } = useReadContracts({
        contracts: Array.from({ length: count }).map((_, i) => ({
            address: CONTRACT_ADDRESSES.MarketDraftBoard,
            abi: ABIS.MarketDraftBoard,
            functionName: 'getDraftIdAt',
            args: [i]
        }))
    });
    const validDraftIds = (draftIdsData?.map(d => d.result).filter(Boolean) as string[]) || [];

    // 3. Multicall to get draft data for each ID
    const { data: draftsDataRaw } = useReadContracts({
        contracts: validDraftIds.map(id => ({
            address: CONTRACT_ADDRESSES.MarketDraftBoard,
            abi: ABIS.MarketDraftBoard,
            functionName: 'getDraft',
            args: [id]
        }))
    });

    // 4. Map the response onto UI friendly objects
    const onChainDrafts = draftsDataRaw?.map((res, idx) => {
        if (!res.result) return null;
        const d: any = res.result;
        return {
            id: validDraftIds[idx],
            // As questionUri is hash onchain, fallback text for demo:
            question: `Market Draft #${validDraftIds[idx].substring(0, 6)}`,
            category: "General",
            trustScore: 0.90, // mock trust score
            playbook: "Resolves via Chainlink CRE Validator",
            suggestedLiquidity: Number(formatUnits(d.minSeed || 0n, 6)), // assume 6 decimals
            status: d.status,
            creator: d.creator,
            rawMinSeed: d.minSeed,
            rawAsset: d.settlementAsset
        };
    }).filter(Boolean) || [];


    const handleClaimAndSeed = async (draft: any) => {
        if (!address) {
            toast({ title: "Wallet Not Connected", description: "Connect wallet to claim market.", variant: "destructive" });
            return;
        }

        setClaimingId(draft.id);
        try {
            toast({ title: "Checking Allowance...", description: "Please wait." });

            // 1. Check Allowance
            const allowance = await readContract(config, {
                address: draft.rawAsset,
                abi: ABIS.ERC20,
                functionName: 'allowance',
                args: [address, CONTRACT_ADDRESSES.DraftClaimManager]
            });

            if ((allowance as bigint) < draft.rawMinSeed) {
                toast({ title: "Approval Required", description: "Please approve seed liquidity spend." });
                const approveTx = await writeContract(config, {
                    address: draft.rawAsset,
                    abi: ABIS.ERC20,
                    functionName: 'approve',
                    args: [CONTRACT_ADDRESSES.DraftClaimManager, draft.rawMinSeed]
                });
                await waitForTransactionReceipt(config, { hash: approveTx });
                toast({ title: "Approved!", description: "Liquidity spend approved. Now signing claim..." });
            }

            // 2. Fetch Nonce for EIP-712
            const nonce = await readContract(config, {
                address: CONTRACT_ADDRESSES.DraftClaimManager,
                abi: ABIS.DraftClaimManager,
                functionName: 'nonces',
                args: [address]
            });

            // 3. EIP-712 Sign
            const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour
            const signature = await signTypedData(config, {
                domain: {
                    name: 'DraftClaimManager',
                    version: '1',
                    chainId: chainId,
                    verifyingContract: CONTRACT_ADDRESSES.DraftClaimManager as `0x${string}`
                },
                types: {
                    ClaimAndSeed: [
                        { name: 'draftId', type: 'bytes32' },
                        { name: 'asset', type: 'address' },
                        { name: 'seedAmount', type: 'uint256' },
                        { name: 'deadline', type: 'uint256' },
                        { name: 'nonce', type: 'uint256' }
                    ]
                },
                primaryType: 'ClaimAndSeed',
                message: {
                    draftId: draft.id as `0x${string}`,
                    asset: draft.rawAsset as `0x${string}`,
                    seedAmount: draft.rawMinSeed,
                    deadline,
                    nonce: nonce as bigint
                }
            });

            // 4. Submit claimAndSeed
            toast({ title: "Deploying Market...", description: "Submitting DraftClaimManager transaction." });
            const claimTx = await writeContract(config, {
                address: CONTRACT_ADDRESSES.DraftClaimManager,
                abi: ABIS.DraftClaimManager,
                functionName: 'claimAndSeed',
                args: [draft.id, draft.rawAsset, draft.rawMinSeed, deadline, signature]
            });
            await waitForTransactionReceipt(config, { hash: claimTx });

            // 5. Whitepaper logic: activate market -> create session in relayer
            toast({ title: "Creating Relayer Session...", description: "Initializing off-chain market logic." });
            const sessionId = relayerApi.getMarketSessionId(draft.question);

            await relayerApi.createSession({
                sessionId,
                marketId: draft.id,
                vaultId: "0xCreatorVaultAddress", // Note: A real app might read the deployed vault address via logs
                numOutcomes: 2,
                b: draft.suggestedLiquidity, // Initial LMSR b-parameter equivalent to depth
            });

            toast({
                title: "Market Claimed & Seeded!",
                description: `Market "${draft.question}" is now live on the relayer.`,
            });
        } catch (err: any) {
            toast({
                title: "Failed to Claim",
                description: err.message || "Relayer refused or session already exists.",
                variant: "destructive"
            });
        } finally {
            setClaimingId(null);
        }
    };

    const draftsToShow = onChainDrafts.filter((d: any) => d.status === 0);
    const activeToShow = onChainDrafts.filter((d: any) => (d.status === 1 || d.status === 2) && d.creator.toLowerCase() === address?.toLowerCase());

    return (
        <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0a0a0a] text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
                            Creator Studio
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
                            Claim AI-generated Market Drafts, bind them to your Unified Vault, and earn LP fees instantly through Chainlink CRE orchestration.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#1a1b23] p-1 rounded-xl border border-slate-200 dark:border-white/10 flex items-center shrink-0">
                        <button
                            onClick={() => setActiveTab('drafts')}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                                activeTab === 'drafts' ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            Draft Board
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                                activeTab === 'active' ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            My Active Markets
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'drafts' ? (
                        <motion.div
                            key="drafts"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {draftsToShow.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-[#1a1b23] border border-slate-200 dark:border-white/10 rounded-2xl">
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="done_all" className="text-blue-500 text-3xl" />
                                    </div>
                                    <h3 className="text-lg font-bold">All Drafts Claimed!</h3>
                                    <p className="text-sm text-slate-500">The AI is cooking new market proposals. Check back later.</p>
                                </div>
                            ) : (
                                draftsToShow.map((draft, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={draft.id}
                                        className="bg-white dark:bg-[#1a1b23] border border-slate-200 dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10">
                                                        {draft.category}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                        <Icon name="verified" className="text-[14px]" />
                                                        Trust Score: {draft.trustScore * 100}%
                                                    </span>
                                                </div>
                                                <h3 className="text-lg md:text-xl font-bold leading-tight mb-2 pr-4 text-slate-900 dark:text-white">
                                                    {draft.question}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-1.5 bg-slate-50 dark:bg-black/20 p-2.5 rounded-lg border border-slate-100 dark:border-white/5">
                                                    <Icon name="gavel" className="text-[16px] shrink-0 mt-0.5 text-blue-500" />
                                                    <span className="leading-snug">{draft.playbook}</span>
                                                </p>
                                            </div>

                                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/10 pt-4 md:pt-0 md:pl-6">
                                                <div className="text-left md:text-right">
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Seed Liquidity</div>
                                                    <div className="text-xl font-black text-slate-900 dark:text-white">
                                                        ${draft.suggestedLiquidity} USDC
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleClaimAndSeed(draft)}
                                                    disabled={claimingId === draft.id}
                                                    className={cn(
                                                        "px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center min-w-[140px]",
                                                        claimingId === draft.id
                                                            ? "bg-blue-500/70 cursor-not-allowed"
                                                            : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-500/25"
                                                    )}
                                                >
                                                    {claimingId === draft.id ? (
                                                        <span className="flex items-center gap-2">
                                                            {/* Spinner */}
                                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Deploying...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5">
                                                            Claim & Seed
                                                            <Icon name="arrow_forward" className="text-[16px]" />
                                                        </span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {activeToShow.length === 0 ? (
                                <div className="col-span-full text-center py-20 bg-white dark:bg-[#1a1b23] border border-slate-200 dark:border-white/10 rounded-2xl">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="search" className="text-slate-400 text-3xl" />
                                    </div>
                                    <h3 className="text-lg font-bold">No Active Markets</h3>
                                    <p className="text-sm text-slate-500">You haven't claimed any drafts yet.</p>
                                </div>
                            ) : (
                                activeToShow.map((market, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={`active-${market.id}`}
                                        className="bg-white dark:bg-[#1a1b23] border border-green-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            Live
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 mb-2 truncate">Creator Vault Attached</div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 pr-16 leading-snug">
                                            {market.question}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <div className="bg-slate-50 dark:bg-black/20 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Volume</div>
                                                <div className="text-lg font-black text-slate-900 dark:text-white">$0.00</div>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-black/20 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fees Earned</div>
                                                <div className="text-lg font-black text-green-500">+$0.00</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default CreatorDashboard;
