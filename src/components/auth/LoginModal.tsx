
import { useState } from "react";
import { useAppKit } from '@reown/appkit/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/Icon";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { open } = useAppKit();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm bg-card/80 backdrop-blur-2xl border-primary/20 shadow-2xl shadow-primary/10 rounded-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300 gap-4">
                <CardHeader className="text-center space-y-1 p-0 pb-2 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12 w-24 h-24 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
                    <div className="mx-auto size-12 bg-gradient-to-br from-gray-900 to-black border border-primary/30 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/20 group animate-pulse-slow">
                        <Icon name="query_stats" className="text-primary text-xl group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Sign in to access your dashboard
                    </CardDescription>
                </CardHeader>

                <div className="space-y-4">
                    {/* Google Login */}
                    <Button
                        variant="outline"
                        className="w-full h-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                        onClick={handleGoogleLogin}
                    >
                        <div className="bg-white p-0.5 rounded-full mr-2 group-hover:scale-110 transition-transform">
                            <svg className="h-3 w-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="#000" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                        </div>
                        <span className="font-medium text-white/90 text-sm">Continue with Google</span>
                    </Button>

                    <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/40" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-background px-2 text-muted-foreground/80 font-medium tracking-wider">
                                Or with email
                            </span>
                        </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-3">
                        <div className="space-y-1">
                            <Label htmlFor="email" className="ml-1 text-xs">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-10 rounded-xl bg-black/20 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-300 px-3 text-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between ml-1 mr-1">
                                <Label htmlFor="password" className="text-xs">Password</Label>
                                <span className="text-[10px] text-primary hover:text-primary/80 cursor-pointer transition-colors">Forgot password?</span>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-10 rounded-xl bg-black/20 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-300 px-3 text-sm"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:scale-[1.02] transition-all duration-300 font-bold text-white tracking-wide text-sm"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-full border-2 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 text-emerald-500 transition-all duration-300 group"
                            onClick={() => open()}
                        >
                            <Icon name="wallet" className="mr-2 text-lg group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-semibold text-sm">Connect Web3 Wallet</span>
                        </Button>
                    </div>

                    <div className="text-center text-xs text-muted-foreground mt-2">
                        Don't have an account? <span className="text-primary hover:text-primary-foreground font-medium hover:underline cursor-pointer transition-colors">Create account</span>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
