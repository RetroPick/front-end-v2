
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { projectId, networks, wagmiAdapter } from '../config'
import { WagmiProvider } from 'wagmi'

// Setup queryClient
const queryClient = new QueryClient()

// Create general metadata
const metadata = {
    name: 'RetroPick',
    description: 'Decentralized Prediction Market',
    url: 'https://retropick.app', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

export function Web3ModalProvider({ children, cookies }: { children: ReactNode; cookies?: string }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as any} reconnectOnMount={true}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
