import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/Icon";

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
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />

            <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl relative z-10">
                <CardHeader className="text-center space-y-1">
                    <div className="mx-auto size-12 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <Icon name="query_stats" className="text-white text-2xl" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Google Login */}
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
                    </form>

                    <Separator className="my-4 bg-border/50" />

                    {/* Wallet Connection */}
                    <div className="space-y-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5">
                                    <Icon name="wallet" className="mr-2 text-lg" />
                                    Connect Wallet
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
                                            className="w-full justify-start h-14 text-base"
                                        >
                                            <span className="bg-primary/10 p-2 rounded-full mr-4">
                                                <Icon name="wallet" className="text-primary" />
                                            </span>
                                            {connector.name}
                                        </Button>
                                    ))}
                                </div>
                                {error && (
                                    <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded">{error.message}</p>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                    <div>
                        Don't have an account? <span className="text-primary hover:underline cursor-pointer">Sign up</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
