import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/Icon";
import Logo from "@/landing_components/Logo";

const Login = () => {
    const { isConnected } = useAccount();
    const { connect, connectors, error } = useConnect();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isConnected) {
            navigate("/app");
        }
    }, [isConnected, navigate]);

    const handleGoogleLogin = () => {
        console.log("Google Login clicked");
        // Implement Google Auth logic here
    };

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email Login:", email, password);
        // Implement Email Auth logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">
            {/* Animated Background Effects */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 blur-[100px] rounded-full mix-blend-multiply filter opacity-70 animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 blur-[100px] rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-400/20 blur-[100px] rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="bg-white/70 backdrop-blur-xl border-white/50 shadow-2xl shadow-blue-500/10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

                    <CardHeader className="text-center space-y-2 pb-6 pt-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mx-auto mb-2 relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white rounded-2xl p-1 shadow-xl">
                                <Logo className="w-16 h-16 rounded-xl" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <CardTitle className="text-2xl font-bold tracking-tight text-slate-800">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-slate-500">
                                Sign in to your Retropick account
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-4 px-8 pb-8">
                        {/* Google Login */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                variant="outline"
                                className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200 h-11 shadow-sm hover:shadow-md transition-all duration-300 group"
                                onClick={handleGoogleLogin}
                            >
                                <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Continue with Google
                            </Button>
                        </motion.div>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                                <span className="bg-white/50 backdrop-blur px-2 text-slate-400 font-semibold">
                                    Or with email
                                </span>
                            </div>
                        </div>

                        {/* Email/Password Form */}
                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-4"
                            >
                                <div className="space-y-1.5 text-left group">
                                    <Label htmlFor="email" className="text-slate-600 text-xs font-semibold ml-1 uppercase tracking-wide group-focus-within:text-blue-600 transition-colors">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 h-11"
                                    />
                                </div>
                                <div className="space-y-1.5 text-left group">
                                    <div className="flex items-center justify-between ml-1">
                                        <Label htmlFor="password" className="text-slate-600 text-xs font-semibold uppercase tracking-wide group-focus-within:text-blue-600 transition-colors">Password</Label>
                                        <span className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer font-medium transition-colors">Forgot?</span>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 h-11"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/25 h-11 font-semibold tracking-wide transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                                >
                                    Sign In
                                </Button>
                            </motion.div>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Separator className="my-6 bg-slate-100" />

                            {/* Wallet Connection */}
                            <div className="space-y-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full border-2 border-dashed border-blue-200 bg-blue-50/30 text-blue-600 hover:bg-blue-50/80 hover:border-blue-300 h-12 font-medium transition-all hover:scale-[1.01]">
                                            <Icon name="wallet" className="mr-2 text-lg" />
                                            Connect Web3 Wallet
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Connect Wallet</DialogTitle>
                                            <CardDescription>Choose a wallet to connect to Retropick</CardDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            {connectors.map((connector) => (
                                                <Button
                                                    key={connector.uid}
                                                    onClick={() => connect({ connector })}
                                                    variant="outline"
                                                    className="w-full justify-start h-14 text-base hover:bg-slate-50 transition-colors"
                                                >
                                                    <span className="bg-blue-100 p-2 rounded-full mr-4">
                                                        <Icon name="wallet" className="text-blue-600" />
                                                    </span>
                                                    {connector.name}
                                                </Button>
                                            ))}
                                        </div>
                                        {error && (
                                            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded animate-shake">{error.message}</p>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </motion.div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-500 pb-8 bg-slate-50/50 border-t border-slate-100 pt-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Don't have an account? <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-bold transition-colors">Create account</span>
                        </motion.div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
