import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { format, subDays } from "date-fns";

const VaultPerformanceChart = ({ timeRange }: { timeRange: "1W" | "1M" | "1Y" }) => {
    // Generate mock data based on timeRange
    const days = timeRange === "1W" ? 7 : timeRange === "1M" ? 30 : 365;
    const data = Array.from({ length: 30 }).map((_, i) => {
        const date = subDays(new Date(), 30 - i);
        return {
            date: date.toISOString(),
            apy: 10 + Math.random() * 5 + (i * 0.1), // Simulating upward trend
            price: 1.0 + (i * 0.002) + (Math.random() * 0.005)
        };
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/90 border border-slate-700/50 p-3 rounded-lg shadow-xl backdrop-blur-md">
                    <p className="text-slate-400 text-xs mb-1 font-mono">{format(new Date(label), "MMM dd, yyyy")}</p>
                    <div className="flex flex-col gap-1">
                        <p className="text-blue-400 font-bold text-sm flex items-center justify-between gap-4">
                            <span>APY:</span>
                            <span className="font-mono">{payload[0].value.toFixed(2)}%</span>
                        </p>
                        <p className="text-purple-400 font-bold text-sm flex items-center justify-between gap-4">
                            <span>Price:</span>
                            <span className="font-mono">${payload[0].payload.price.toFixed(4)}</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorApy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        {/* Glow Filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(str) => format(new Date(str), "d MMM")}
                        tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                        minTickGap={40}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}%`}
                        domain={['dataMin - 1', 'dataMax + 1']}
                        dx={-5}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.3 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="apy"
                        stroke="url(#strokeGradient)"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorApy)"
                        filter="url(#glow)"
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VaultPerformanceChart;
