import React from 'react';
import { Terminal, Send, Activity, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1 gap-12">

                {/* Header */}
                <div className="flex flex-wrap justify-between gap-6 items-end border-l-4 border-primary pl-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-5xl md:text-7xl font-bold leading-[0.9] tracking-[-0.05em] uppercase font-display">
                    // Initiate_<br />Handshake
                        </h1>
                        <p className="text-primary font-mono text-sm md:text-base tracking-widest mt-2">
                            &gt; OPENING_SECURE_CHANNEL... [LISTENING]
                        </p>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-1 font-mono text-xs text-muted">
                        <div className="flex items-center gap-2">
                            <span>NET_STATUS:</span>
                            <span className="text-primary">CONNECTED</span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        </div>
                        <div>PACKET_LOSS: 0.00%</div>
                        <div>UPTIME: 412h 32m</div>
                    </div>
                </div>

                {/* Content Split */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    {/* Form */}
                    <div className="flex-1 w-full relative group">
                        {/* Decoration */}
                        <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-muted"></div>
                        <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-muted"></div>

                        <form className="flex flex-col gap-10 p-2">
                            <div className="flex flex-col gap-2 relative group/input">
                                <label className="font-mono text-xs text-primary uppercase tracking-widest flex justify-between">
                                    <span>01_SENDER_IDENTITY</span>
                                    <span className="opacity-0 group-focus-within/input:opacity-100 transition-opacity">[REQUIRED]</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-transparent border-b border-muted text-xl md:text-2xl text-white font-mono py-4 px-0 focus:border-primary focus:outline-none placeholder-[#333] transition-colors duration-0"
                                        placeholder="unknown_user"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 relative">
                                <label className="font-mono text-xs text-primary uppercase tracking-widest">02_RETURN_ADDRESS</label>
                                <input
                                    className="w-full bg-transparent border-b border-muted text-xl md:text-2xl text-white font-mono py-4 px-0 focus:border-primary focus:outline-none placeholder-[#333] transition-colors duration-0"
                                    placeholder="user@domain.loc"
                                    type="email"
                                />
                            </div>

                            <div className="flex flex-col gap-2 relative">
                                <label className="font-mono text-xs text-primary uppercase tracking-widest">03_DATA_PACKET</label>
                                <textarea
                                    className="w-full bg-transparent border-b border-muted text-xl md:text-2xl text-white font-mono py-4 px-0 focus:border-primary focus:outline-none placeholder-[#333] resize-none transition-colors duration-0"
                                    placeholder="Insert message stream..."
                                    rows={4}
                                ></textarea>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-center pt-6">
                                <button
                                    type="button"
                                    className="group relative w-full md:w-auto bg-primary hover:bg-white text-black font-bold font-display uppercase text-lg px-8 py-4 tracking-wider transition-all duration-75 shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                                >
                                    <span className="flex items-center gap-3">
                                        <Terminal className="w-6 h-6" />
                                        [ EXECUTE_TRANSMISSION ]
                                    </span>
                                </button>
                                <div className="font-mono text-xs text-muted flex gap-4">
                                    <span>ENCRYPTION: <span className="text-accent">NONE</span></span>
                                    <span>// PORT: 443</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Terminal Info Column */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 p-4 border border-muted bg-surface/50">
                                <Activity className="text-primary mb-2 w-5 h-5" />
                                <span className="text-xs font-mono text-muted">LATENCY</span>
                                <span className="text-2xl font-bold text-white">12ms</span>
                            </div>
                            <div className="flex flex-col gap-1 p-4 border border-muted bg-surface/50">
                                <MapPin className="text-primary mb-2 w-5 h-5" />
                                <span className="text-xs font-mono text-muted">ORIGIN</span>
                                <span className="text-2xl font-bold text-white">EARTH</span>
                            </div>
                        </div>

                        <div className="bg-surface border border-muted p-4 font-mono text-xs md:text-sm h-64 overflow-y-auto relative">
                            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                            <div className="flex flex-col gap-1 text-[#888]">
                                <p>&gt; SYSTEM_READY</p>
                                <p>&gt; MOUNTING_DRIVE... [OK]</p>
                                <p>&gt; SCANNING_PORTS... [OK]</p>
                                <p className="text-primary">&gt; WAITING_FOR_INPUT<span className="animate-blink">_</span></p>
                                <div className="opacity-50 mt-4 flex flex-col gap-1">
                                    <p>&gt; previous_session_id: x89_aa2</p>
                                    <p>&gt; clearing_cache... done.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};