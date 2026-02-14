import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis } from 'recharts';
import { Eye, Clock, Cpu, Shield, Globe, Terminal as TerminalIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { Reveal } from '../components/Reveal';

const StatCard: React.FC<{
    label: string;
    value: string | number;
    sub: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    color?: string;
    children?: React.ReactNode;
}> = ({ label, value, sub, icon, color = "#00FFFF", children }) => (
    <div className="bg-surface border border-muted p-5 flex flex-col justify-between h-40 group hover:border-primary transition-colors duration-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            {icon}
        </div>
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-muted pb-2 mb-2 w-max">
            {label}
        </span>
        <div className="flex items-end justify-between">
            <span className="text-4xl font-display font-bold text-white tracking-tight">{value}</span>
            <div className="h-10 w-24">
                {children}
            </div>
        </div>
        <span className={`text-xs font-mono mt-2 ${color === '#FF003C' ? 'text-accent' : 'text-primary'}`}>
            {sub}
        </span>
    </div>
);

export const Dashboard: React.FC = () => {
    const { projects } = useProjectContext();
    const { stats: analyticsStats } = useAnalytics();

    const projectStats = useMemo(() => {
        const total = projects.length;
        const live = projects.filter(p => p.category === 'LIVE').length;
        const categories = new Set(projects.map(p => p.category)).size;

        return {
            total,
            live,
            categories,
            offline: total - live
        };
    }, [projects]);

    // Format top pages for chart
    const topPagesData = analyticsStats.topPages.length > 0
        ? analyticsStats.topPages
        : [{ name: 'NO_DATA', value: 0 }];

    return (
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto flex flex-col gap-8">

            {/* Header */}
            <Reveal direction="down">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-muted pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary text-xs font-mono mb-1">
                            <Globe className="w-3 h-3" />
                            <span>CONNECTED :: SECURE_CHANNEL_01</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter uppercase">
                            COMMAND_CENTER<span className="text-primary animate-blink">_</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end text-xs font-mono text-gray-400">
                            <span>SERVER_TIME: {new Date().toLocaleTimeString('en-US', { hour12: false })} UTC</span>
                            <span>LOC: 34.0522° N, 118.2437° W</span>
                        </div>
                    </div>
                </header>
            </Reveal>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Reveal delay={0.1} width="100%">
                    <StatCard label="Total_Impressions" value={analyticsStats.totalViews} sub="LIVE_TRAFFIC" icon={<Eye className="text-primary" />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={topPagesData.length > 3 ? topPagesData : [{ name: '-', value: 10 }, { name: '-', value: 20 }, { name: '-', value: 15 }]}>
                                <Area type="monotone" dataKey="value" stroke="#00FFFF" fill="none" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </StatCard>
                </Reveal>

                <Reveal delay={0.2} width="100%">
                    <StatCard label="Unique_Visitors" value={analyticsStats.uniqueVisitors} sub="SESSION_TRACKING" icon={<Globe className="text-primary" />}>
                        <div className="flex items-end h-full w-full gap-1">
                            <div className="w-full bg-primary/20 h-2/3 relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 w-full bg-primary animate-pulse" style={{ height: '40%' }}></div>
                            </div>
                        </div>
                    </StatCard>
                </Reveal>

                <Reveal delay={0.3} width="100%">
                    <StatCard label="Active_Projects" value={projectStats.live} sub={`TOTAL_DB: ${projectStats.total}`} icon={<TerminalIcon className="text-primary" />} color="#FF003C">
                        <div className="flex gap-1 h-full items-end">
                            {[40, 60, 30, 80, 50].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-2 bg-primary/80"></div>
                            ))}
                        </div>
                    </StatCard>
                </Reveal>

                <Reveal delay={0.4} width="100%">
                    <StatCard label="Security_Status" value="SECURE" sub="FIREWALL_ACTIVE" icon={<Shield className="text-primary" />}>
                        <Shield className="w-full h-full text-primary/20" />
                    </StatCard>
                </Reveal>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

                {/* Left Col: Projects Table */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Reveal delay={0.5} width="100%">
                        <div className="border border-muted bg-surface flex flex-col">
                            <div className="bg-white text-black p-3 flex justify-between items-center border-b border-muted">
                                <h3 className="font-display font-bold uppercase tracking-tight flex items-center gap-2">
                                    <TerminalIcon className="w-4 h-4" />
                                    RECENT_INJECTIONS
                                </h3>
                                <div className="flex gap-2">
                                    <Link to="/editor" className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs font-mono border border-black hover:bg-primary hover:text-black hover:border-primary transition-colors">
                                        <Plus className="w-3 h-3" />
                                        [ NEW_PROJECT ]
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse font-mono text-sm">
                                    <thead>
                                        <tr className="border-b border-muted text-xs uppercase text-gray-500">
                                            <th className="p-4 font-normal border-r border-muted w-16">ID</th>
                                            <th className="p-4 font-normal border-r border-muted">PROJECT_ENTITY</th>
                                            <th className="p-4 font-normal border-r border-muted w-32">CATEGORY</th>
                                            <th className="p-4 font-normal text-right w-32">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        {projects.slice(0, 5).map((row) => (
                                            <tr key={row.id} className="border-b border-muted hover:bg-white/5 transition-colors group">
                                                <td className="p-4 border-r border-muted text-gray-500">{row.clientId || '---'}</td>
                                                <td className="p-4 border-r border-muted font-bold text-white group-hover:text-primary transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-4 h-4 bg-muted border border-gray-600"></div>
                                                        {row.title}
                                                    </div>
                                                </td>
                                                <td className="p-4 border-r border-muted text-xs">{row.category}</td>
                                                <td className="p-4 text-right">
                                                    <Link to={`/editor/${row.id}`} className="text-xs underline hover:text-primary hover:no-underline mr-2">EDIT</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Reveal>

                    {/* Visual Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-muted bg-surface p-4 flex flex-col gap-2 h-64">
                            <h4 className="font-bold text-xs text-gray-400 uppercase mb-2">TRAFFIC_BY_ROUTE</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topPagesData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="value" barSize={20}>
                                        {topPagesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#00FFFF' : '#444444'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="border border-muted bg-surface p-4 flex flex-col gap-2 h-64 justify-between">
                            <h4 className="font-bold text-xs text-gray-400 uppercase mb-2">DATABASE_INTEGRITY</h4>
                            <div className="space-y-4">
                                {[
                                    { label: 'PRIMARY_NODE', status: 'OK', color: 'bg-primary' },
                                    { label: 'BACKUP_NODE', status: 'SYNCING...', color: 'bg-primary animate-pulse' },
                                    { label: 'CACHE_LAYER', status: 'IDLE', color: 'bg-gray-600' }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs font-mono">
                                            <span>{item.label}</span>
                                            <span className={item.color.includes('primary') ? 'text-primary' : 'text-gray-500'}>{item.status}</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1">
                                            <div className={`h-full ${item.color}`} style={{ width: i === 1 ? '75%' : i === 2 ? '15%' : '100%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Map & Log */}
                <div className="flex flex-col gap-6">
                    {/* Map Widget Placeholder */}
                    <div className="border border-muted bg-surface flex flex-col h-[300px]">
                        <div className="bg-white text-black p-2 px-3 border-b border-muted flex justify-between items-center">
                            <h3 className="font-display font-bold uppercase tracking-tight text-sm">TRAFFIC_SOURCE</h3>
                            <Globe className="w-4 h-4" />
                        </div>
                        <div className="flex-1 relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#13ecec 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="relative w-48 h-48 rounded-full border border-dashed border-[#333] flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className="absolute w-[110%] h-[1px] bg-primary/20 rotate-45"></div>
                                <div className="absolute w-[110%] h-[1px] bg-primary/20 -rotate-45"></div>
                                <div className="w-32 h-32 rounded-full border border-primary/30"></div>
                            </div>
                            {/* Fake pings */}
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary animate-ping"></div>
                            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary animate-ping delay-75"></div>

                            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-primary bg-black/50 px-1 border border-primary/20">
                                ACT_USERS: {analyticsStats.uniqueVisitors}
                            </div>
                        </div>
                    </div>

                    {/* Terminal Log */}
                    <div className="border border-muted bg-black flex flex-col flex-1 min-h-[300px]">
                        <div className="bg-surface text-gray-400 p-2 px-3 border-b border-muted flex justify-between items-center">
                            <h3 className="font-mono font-bold uppercase tracking-tight text-xs flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                SYSTEM_KERNEL_LOGS
                            </h3>
                            <span className="text-[10px]">[ AUTO_SCROLL: ON ]</span>
                        </div>
                        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto text-gray-400 space-y-2 relative h-64">
                            {analyticsStats.recentLogs.length === 0 ? (
                                <p className="animate-pulse text-primary mt-2">&gt;_ AWAITING_INPUT...</p>
                            ) : (
                                analyticsStats.recentLogs.map((log) => (
                                    <p key={log.id}>
                                        <span className="text-gray-600">[{new Date(log.created_at).toLocaleTimeString()}]</span>
                                        {' '}ACCESS request to: <span className="text-primary">{log.page_path}</span>
                                    </p>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};