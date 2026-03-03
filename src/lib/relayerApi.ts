// src/lib/relayerApi.ts

const RELAYER_BASE_URL = 'http://localhost:8790';

export interface BuySharesParams {
    sessionId: string;
    outcomeIndex: number;
    delta: number;
    maxCost?: number;
    userAddress: string;
}

export interface SwapSharesParams {
    sessionId: string;
    fromOutcome: number;
    toOutcome: number;
    delta: number;
    maxCost?: number;
    userAddress: string;
}

export interface SessionConfig {
    sessionId: string;
    marketId: string;
    vaultId: string;
    numOutcomes: number;
    b: number;
}

export const relayerApi = {
    /**
     * Create a new trading session. Usually done once per market by the backend/creator.
     */
    async createSession(config: SessionConfig) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/session/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    /**
     * Get session data including current probabilities (p) and shares (q).
     */
    async getSession(sessionId: string) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/session/${sessionId}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    /**
     * Get user balance and positions in a specific session
     */
    async getAccount(sessionId: string, address: string) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/session/${sessionId}/account/${address}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    /**
     * Execute a buy trade in the Yellow Session
     */
    async buyShares(params: BuySharesParams) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/trade/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    /**
     * Execute a swap trade in the Yellow Session (e.g., selling YES for NO)
     */
    async swapShares(params: SwapSharesParams) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/trade/swap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    /**
     * Get prices (probabilities) for an active session
     */
    async getPrices(sessionId: string) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/session/${sessionId}/prices`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    /**
     * Admin/Test route: Credit a user with mock USD balance in the session
     */
    async creditUser(sessionId: string, userAddress: string, amount: number) {
        const res = await fetch(`${RELAYER_BASE_URL}/api/session/credit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, userAddress, amount })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};
