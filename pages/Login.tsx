import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, Terminal, Activity, Eye, EyeOff } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { supabase } from '../supabaseClient';

export const Login: React.FC = () => {
    const [id, setId] = useState('');
    const [key, setKey] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        if (!supabase) {
            console.error('Supabase client not initialized');
            setError(true);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: id,
                password: key,
            });

            if (error) throw error;

            if (data.session) {
                localStorage.setItem('sys_access', 'true');
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError(true);
            setKey('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">

            {/* Container */}
            <Reveal width="100%" className="max-w-md relative z-10 group">
                {/* Animated Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-transparent opacity-20 group-hover:opacity-50 blur transition-opacity duration-500" />

                <div className="bg-surface border border-muted p-8 shadow-2xl relative overflow-hidden">
                    {/* Scanline decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_10px_#00FFFF]"></div>

                    <div className="flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex flex-col gap-2 border-b border-muted pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-primary">
                                    <Shield className="w-6 h-6" />
                                    <span className="font-mono text-xs tracking-widest">[ SECURE_GATEWAY_V.2.0 ]</span>
                                </div>
                                <Activity className="w-4 h-4 text-muted animate-pulse" />
                            </div>
                            <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tight">
                                SYSTEM_ACCESS
                            </h1>
                            <p className="text-xs font-mono text-gray-500">
                                AUTHORIZED PERSONNEL ONLY. ALL ATTEMPTS ARE LOGGED.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2 relative group/input">
                                <label className="font-mono text-xs text-primary uppercase tracking-widest flex justify-between">
                                    <span>OPERATOR_ID</span>
                                    <span className="text-muted group-focus-within/input:text-primary transition-colors">::</span>
                                </label>
                                <div className="relative">
                                    <Terminal className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within/input:text-primary transition-colors" />
                                    <input
                                        className="w-full bg-transparent border-b border-muted text-lg text-white font-mono py-2 pl-8 focus:border-primary focus:outline-none placeholder-muted/30 transition-colors uppercase"
                                        placeholder="ENTER_ID"
                                        type="text"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 relative group/input">
                                <label className="font-mono text-xs text-primary uppercase tracking-widest flex justify-between">
                                    <span>ACCESS_KEY</span>
                                    <span className="text-muted group-focus-within/input:text-primary transition-colors">::</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within/input:text-primary transition-colors" />
                                    <input
                                        className="w-full bg-transparent border-b border-muted text-lg text-white font-mono py-2 pl-8 pr-8 focus:border-primary focus:outline-none placeholder-muted/30 transition-colors"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-accent/10 border border-accent p-3 flex items-center gap-3 animate-glitch">
                                    <AlertTriangle className="w-5 h-5 text-accent" />
                                    <span className="text-xs font-mono text-accent font-bold uppercase">
                                        ERROR: INVALID_CREDENTIALS
                                    </span>
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-primary text-black font-bold font-display uppercase text-lg py-4 tracking-wider transition-all duration-75 shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${loading ? 'animate-pulse' : ''}`}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                            VERIFYING...
                                        </>
                                    ) : (
                                        <>
                                            [ AUTHENTICATE ]
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Footer Status */}
                        <div className="border-t border-muted pt-4 mt-2 flex justify-between items-center text-[10px] font-mono text-muted uppercase">
                            <span>ENCRYPTION: AES-256</span>
                            <span className="flex items-center gap-2">
                                SERVER_STATUS
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Background Glitch Text */}
                <div className="absolute -top-20 -left-20 font-display font-bold text-[10rem] text-white opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
                    NO_SIGNAL
                </div>
            </Reveal>
        </div>
    );
};