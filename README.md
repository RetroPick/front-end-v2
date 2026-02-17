# RetroPick - AI Prediction Market

RetroPick is a next-generation decentralized prediction market powered by **Chainlink CRE**, **Autonomous AI Agents**, and a unique **ShadowPool (LS-LMSR)** architecture. It offers a seamless, high-fidelity trading experience with a futuristic UI, 3D interactive elements, and multi-vertical market coverage.

![RetroPick Landing](public/lovable-uploads/60292723-d6c2-4099-9230-058cb2909477.png)

## 🚀 Features

### Core Technology
*   **ShadowPool Architecture**: Implements Logarithmic Scoring Rule Market Maker (LS-LMSR) for continuous liquidity and bounded risk.
*   **AI Precision**: Autonomous agents analyze data to provide real-time probability adjustments.
*   **Verifiable Settlement**: Markets are settled via **Verde's Refereed Delegation**, ensuring mathematical truth on-chain.

### User Experience
*   ** immersive 3D Landing Page**: Interactive 3D model visualization with robust error handling (Fallback + Retry mechanism).
*   **Futuristic UI/UX**: Glassmorphism, neon glows, and dynamic animations using **Framer Motion**.
*   **Multi-Vertical Dashboards**: Dedicated themes and layouts for:
    *   ⚽ **Sports**: Cyberpunk stadium atmosphere.
    *   🗳️ **Politics**: Diplomatic slate aesthetic.
    *   🚀 **Space**: Deep cosmic theme.
    *   📈 **Macro & Crypto**: Financial terminal and modern trading interfaces.
    *   🤖 **AI**: Neural network visualizations.

### Web3 Integration
*   **Wallet Connect**: Integrated with **Reown AppKit** and **Wagmi** for seamless multi-wallet support.
*   **World ID**: Proof-of-Personhood verification integration.
*   **Onboarding Flow**: Guided experience for new users (Signature -> Username -> Deposit).

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
*   **Web3**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/) + [Reown AppKit](https://reown.com/)
*   **Charts**: [Recharts](https://recharts.org/)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/retropick-frontend.git
    cd retropick-frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components (Header, MarketCard, Charts)
├── landing_components/# Components specific to the Landing Page (Hero, 3D Model)
├── pages/             # Main route pages (Index, MarketDetail, Portfolio)
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configurations (Wagmi, Utils)
└── assets/            # Static assets
```

## 🛡️ Stability & Error Handling

*   **3D Model Protection**: The Landing Page features a custom `ErrorBoundary` to handle WebGL context losses. If the 3D model fails to load, a high-quality static image is displayed with a manual "Retry" option.
*   **Routing**: Robust routing structure separating the Marketing Site (`/`) from the App Dashboard (`/app`).

## 📄 Whitepaper

Read the full technical details in our [Whitepaper](/whitepaper.pdf).

---

Built with ❤️ by the RetroPick Team.
