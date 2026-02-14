import React, { useState } from 'react';
import { Search, Power, PlusCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';

export const Projects: React.FC = () => {
    const { projects, deleteProject } = useProjectContext();
    const [showNukeModal, setShowNukeModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const handleDelete = () => {
        if (selectedProjectId) {
            deleteProject(selectedProjectId);
            setShowNukeModal(false);
            setSelectedProjectId(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
            {/* Top Bar */}
            <header className="flex h-16 w-full items-center justify-between border-b border-muted bg-background-dark/95 px-6 backdrop-blur z-10">
                <div className="flex items-center gap-2">
                    <span className="text-primary font-mono text-sm">// DATABASE_ACCESS:</span>
                    <span className="font-bold text-lg tracking-wider text-white">PROJECT_LIST</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                        <span>UPTIME:</span>
                        <span className="text-white">14:02:44:99</span>
                    </div>
                    <button className="flex items-center justify-center size-8 border border-muted hover:bg-accent hover:text-white hover:border-accent transition-colors">
                        <Power className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 relative z-10">
                <div className="mx-auto max-w-6xl flex flex-col gap-8">

                    {/* Header Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-2 border-primary pl-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-bold uppercase tracking-tighter text-white">Project Registry</h2>
                            <p className="font-mono text-xs text-muted">MANAGE_PORTFOLIO_ITEMS [RWX]</p>
                        </div>
                        <Link to="/editor">
                            <button className="group relative px-6 py-3 bg-primary text-black font-bold font-mono text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2">
                                <PlusCircle className="w-5 h-5" />
                                Inject_New_Data
                                {/* Box shadow trick for Brutalism */}
                                <span className="absolute inset-0 translate-x-1 translate-y-1 bg-white opacity-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-100 -z-10 border border-muted"></span>
                            </button>
                        </Link>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-4 bg-surface p-4 border border-muted">
                        <span className="font-mono text-sm text-primary uppercase">FILTER_BY:</span>
                        <div className="flex flex-wrap gap-2">
                            <button className="bg-primary text-black px-3 py-1 font-mono text-xs font-bold border border-primary hover:opacity-80">[x] ALL</button>
                            {['WEB', 'AI', '3D_ART', 'SYSTEM'].map(f => (
                                <button key={f} className="bg-transparent text-muted px-3 py-1 font-mono text-xs font-bold border border-muted hover:border-white hover:text-white transition-colors">[ ] {f}</button>
                            ))}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Search className="text-muted w-4 h-4" />
                            <input className="bg-transparent border-b border-muted text-white font-mono text-xs w-48 focus:border-primary focus:ring-0 placeholder-muted/50 p-1 outline-none" placeholder="SEARCH_QUERY..." type="text" />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-muted bg-surface overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white text-black font-mono text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 border-b border-muted w-20">ID</th>
                                    <th className="p-4 border-b border-muted w-24">PREVIEW</th>
                                    <th className="p-4 border-b border-muted">DESIGNATION</th>
                                    <th className="p-4 border-b border-muted w-32">CATEGORY</th>
                                    <th className="p-4 border-b border-muted w-32">STATUS</th>
                                    <th className="p-4 border-b border-muted text-right w-48">OPERATIONS</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono text-sm text-text-main divide-y divide-muted">
                                {projects.map(p => (
                                    <tr key={p.id} className="group hover:bg-[#1a1a1a] transition-colors hover:text-white">
                                        <td className="p-4 text-muted group-hover:text-primary">{p.id}</td>
                                        <td className="p-4">
                                            <div className="size-10 bg-muted overflow-hidden border border-muted group-hover:border-primary">
                                                <img className="h-full w-full object-cover opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" src={p.imageUrl} alt="" />
                                            </div>
                                        </td>
                                        <td className="p-4 font-display font-bold text-base tracking-tight">{p.title}</td>
                                        <td className="p-4 text-xs text-muted group-hover:text-white">[{p.category}]</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${p.status === 'LIVE' ? 'text-primary animate-pulse' : p.status === 'OFFLINE' ? 'text-muted' : 'text-accent'}`}>
                                                <span className={`size-1.5 rounded-full ${p.status === 'LIVE' ? 'bg-primary' : p.status === 'OFFLINE' ? 'bg-muted' : 'bg-accent'}`}></span>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link to={`/editor/${p.id}`}>
                                                    <button className="text-primary hover:bg-primary hover:text-black px-2 py-1 text-xs border border-primary transition-colors uppercase">[EDIT]</button>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setSelectedProjectId(p.id);
                                                        setShowNukeModal(true);
                                                    }}
                                                    className="text-accent hover:bg-accent hover:text-white px-2 py-1 text-xs border border-accent transition-colors uppercase"
                                                >
                                                    [NUKE]
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between font-mono text-xs border-t border-muted pt-4 text-muted">
                        <div className="flex items-center gap-4">
                            <span>PAGE: 1/1</span>
                            <span className="h-3 w-px bg-muted"></span>
                            <span>RECORDS: {projects.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-2 py-1 border border-muted hover:border-primary hover:text-primary disabled:opacity-50" disabled>&lt; PREV</button>
                            <button className="px-2 py-1 border border-muted hover:border-primary hover:text-primary" disabled>NEXT &gt;</button>
                        </div>
                    </div>

                </div>
            </main>

            {/* Nuke Modal */}
            {showNukeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-sm border-2 border-accent bg-background-dark p-0 shadow-hard-red animate-glitch">
                        <div className="bg-accent px-4 py-2 flex justify-between items-center">
                            <span className="text-white font-mono font-bold text-sm tracking-widest">WARNING: DESTRUCTIVE ACTION</span>
                            <button onClick={() => setShowNukeModal(false)} className="text-white hover:text-black">✕</button>
                        </div>
                        <div className="p-8 flex flex-col gap-6 text-center">
                            <div className="text-accent flex justify-center">
                                <AlertTriangle className="w-16 h-16 animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white font-display uppercase">Execute Deletion?</h3>
                                <p className="font-mono text-xs text-muted">THIS ACTION CANNOT BE UNDONE. <br /> DATA WILL BE PERMANENTLY ERASED FROM THE SERVER.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <button onClick={() => setShowNukeModal(false)} className="border border-muted text-muted py-3 hover:bg-white hover:text-black font-mono font-bold uppercase transition-colors">[ABORT]</button>
                                <button onClick={handleDelete} className="bg-accent text-white py-3 border border-accent hover:bg-red-700 font-mono font-bold uppercase transition-colors">[CONFIRM]</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};