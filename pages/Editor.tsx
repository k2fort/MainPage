import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Save, Upload, Terminal } from 'lucide-react';
import { useProjectContext } from '../context/ProjectContext';
import { Project } from '../types';
import { supabase } from '../supabaseClient';

export const Editor: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addProject, updateProject, getProject } = useProjectContext();

    const [techStack, setTechStack] = useState<string[]>(['REACT', 'THREE.JS']);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: 'NEW_PROJECT',
        category: 'WEB',
        status: 'DRAFT',
        description: '',
        imageUrl: '',
        clientId: 'AUTO_GEN_ID',
        role: 'DEV'
    });

    useEffect(() => {
        if (id) {
            const existing = getProject(id);
            if (existing) {
                setFormData({
                    title: existing.title || '',
                    category: existing.category || 'WEB',
                    status: existing.status || 'DRAFT',
                    description: existing.description || '',
                    imageUrl: existing.imageUrl || '',
                    clientId: existing.clientId || '',
                    role: existing.role || ''
                });
                setTechStack(existing.techStack || []);
            }
        }
    }, [id, getProject]);

    const handleSave = () => {
        let finalImage = formData.imageUrl;

        // Auto-generation safeguard:
        // If image is missing in form, try to preserve stored image (if editing)
        if (!finalImage || finalImage.trim() === '') {
            if (id) {
                const existing = getProject(id);
                if (existing?.imageUrl) {
                    finalImage = existing.imageUrl;
                }
            }
            // Only generate random if we truly have no image (New Project)
            if (!finalImage) {
                finalImage = `https://picsum.photos/800/600?random=${Math.random()}`;
            }
        }

        const projectData = {
            ...formData,
            techStack,
            imageUrl: finalImage
        } as Project;

        if (id) {
            updateProject(id, projectData);
        } else {
            addProject(projectData);
        }
        navigate('/projects');
    };

    return (
        <div className="bg-background-dark text-text-main font-mono overflow-hidden h-full w-full relative selection:bg-primary selection:text-black">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/60"></div>

            {/* Main Panel */}
            <div className="relative z-20 flex h-full w-full justify-end">
                <div className="w-full md:w-3/4 lg:w-1/2 h-full bg-surface border-l border-muted flex flex-col shadow-2xl relative">
                    {/* Header */}
                    <header className="flex items-center justify-between px-8 py-6 border-b border-muted bg-surface z-10">
                        <div className="flex items-center gap-3">
                            <Terminal className="text-primary w-6 h-6 animate-pulse" />
                            <h2 className="font-display font-bold text-2xl tracking-tight uppercase text-primary">
                            // EDIT_MODE: {id || 'NEW_PROJECT'}
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate('/projects')}
                            className="group flex items-center justify-center size-10 border border-muted hover:bg-accent hover:border-accent hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
                        </button>
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-10 relative z-10">
                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">SYSTEM_ID</label>
                                <div className="font-mono text-text-main border-b border-muted py-2 bg-transparent opacity-50 cursor-not-allowed">
                                    #{id || 'AUTO_GEN'}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">TIMESTAMP</label>
                                <div className="font-mono text-text-main border-b border-muted py-2 bg-transparent opacity-50">
                                    {new Date().toISOString()}
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-3 group">
                            <label className="font-display text-base font-bold text-primary uppercase tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary inline-block"></span>
                                PROJECT_TITLE
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full bg-[#0A0A0A] border border-muted text-lg p-4 text-white focus:border-primary focus:outline-none placeholder-muted/50 font-mono transition-colors"
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-6 bg-primary animate-blink pointer-events-none"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">CATEGORY</label>
                                <select
                                    className="w-full bg-[#0A0A0A] border border-muted text-base p-3 text-text-main focus:border-primary focus:outline-none placeholder-muted/50 font-mono transition-colors"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                >
                                    <option value="WEB">WEB_DEV</option>
                                    <option value="AI">AI_MODEL</option>
                                    <option value="3D_ART">3D_ART</option>
                                    <option value="SYSTEM">SYSTEM</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">STATUS</label>
                                <select
                                    className="w-full bg-[#0A0A0A] border border-muted text-base p-3 text-text-main focus:border-primary focus:outline-none placeholder-muted/50 font-mono transition-colors"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                >
                                    <option value="LIVE">LIVE</option>
                                    <option value="OFFLINE">OFFLINE</option>
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="ARCHIVED">ARCHIVED</option>
                                </select>
                            </div>
                        </div>

                        {/* Client Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">CLIENT_ID</label>
                                <input
                                    className="w-full bg-transparent border-b border-muted text-base py-3 px-0 text-text-main focus:border-primary focus:outline-none placeholder-muted/50 font-mono transition-colors focus:bg-[#0A0A0A] focus:px-4"
                                    type="text"
                                    value={formData.clientId}
                                    onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">ROLE_KEY</label>
                                <input
                                    className="w-full bg-transparent border-b border-muted text-base py-3 px-0 text-text-main focus:border-primary focus:outline-none placeholder-muted/50 font-mono transition-colors focus:bg-[#0A0A0A] focus:px-4"
                                    type="text"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-3">
                            <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">DATA_LOG_DESCRIPTION</label>
                            <textarea
                                className="w-full bg-[#0A0A0A] border border-muted text-base p-4 text-text-main focus:border-primary focus:outline-none placeholder-muted/50 font-mono resize-none leading-relaxed"
                                rows={4}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-col gap-4">
                            <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">TECH_STACK_INJECTION</label>
                            <div className="flex flex-wrap gap-3">
                                {['REACT', 'THREE.JS', 'WEBGL', 'PYTHON', 'DOCKER'].map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => setTechStack(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech])}
                                        className={`flex items-center gap-2 border px-4 py-2 transition-all group ${techStack.includes(tech) ? 'border-primary bg-primary/10 hover:bg-primary hover:text-black' : 'border-muted bg-transparent opacity-60 hover:opacity-100 hover:border-text-main'}`}
                                    >
                                        <span className={`font-bold ${techStack.includes(tech) ? 'text-primary group-hover:text-black' : 'text-muted group-hover:text-text-main'}`}>
                                            {techStack.includes(tech) ? '[x]' : '[ ]'}
                                        </span>
                                        <span className={`font-mono text-sm ${techStack.includes(tech) ? 'text-primary group-hover:text-black' : 'text-muted group-hover:text-text-main'}`}>
                                            {tech}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-3 pb-8">
                            <label className="font-display text-sm font-bold text-muted uppercase tracking-wider">VISUAL_ASSETS</label>
                            <div
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="relative w-full border-2 border-dashed border-muted hover:border-primary hover:bg-primary/5 transition-all h-64 flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
                            >
                                <input
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            // Demo Mode Check
                                            if (!supabase) {
                                                alert('DEMO_MODE: Cannot upload images without Supabase connection. Please configure environment variables.');
                                                return;
                                            }

                                            try {
                                                const fileExt = file.name.split('.').pop();
                                                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                                                const filePath = `${fileName}`;

                                                const { error: uploadError } = await supabase.storage
                                                    .from('project-images')
                                                    .upload(filePath, file);

                                                if (uploadError) {
                                                    throw uploadError;
                                                }

                                                const { data: { publicUrl } } = supabase.storage
                                                    .from('project-images')
                                                    .getPublicUrl(filePath);

                                                setFormData(prev => ({ ...prev, imageUrl: publicUrl }));

                                            } catch (error: any) {
                                                console.error('Upload error:', error);
                                                alert(`UPLOAD_FAILED: ${error.message || 'Unknown error'}`);
                                            }
                                        }
                                    }}
                                />

                                {formData.imageUrl ? (
                                    <div className="absolute inset-0 w-full h-full">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="font-mono text-white font-bold uppercase tracking-widest">[ REPLACE_ASSET ]</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="text-4xl text-muted group-hover:text-primary mb-2" />
                                        <p className="font-mono text-sm text-muted group-hover:text-primary uppercase tracking-widest">[!] DROP_ASSETS_HERE</p>
                                        <p className="font-mono text-xs text-muted mt-2 opacity-50">OR CLICK_TO_INJECT</p>
                                    </>
                                )}
                                {/* Decorative corners */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-muted group-hover:border-primary transition-colors"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-muted group-hover:border-primary transition-colors"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-muted group-hover:border-primary transition-colors"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-muted group-hover:border-primary transition-colors"></div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Controls */}
                    <footer className="sticky bottom-0 w-full bg-[#080808] border-t border-muted p-6 flex items-center justify-between z-20">
                        <button onClick={() => navigate('/projects')} className="h-12 px-6 border border-accent text-accent font-display font-bold text-sm tracking-wider hover:bg-accent hover:text-white hover:shadow-hard-red transition-all flex items-center gap-2">
                            <X className="w-5 h-5" />
                            [ABORT]
                        </button>
                        <button onClick={handleSave} className="h-12 px-8 bg-primary text-black font-display font-bold text-sm tracking-wider hover:shadow-hard transition-all flex items-center gap-3">
                            <Save className="w-5 h-5" />
                            [COMMIT_CHANGES]
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};