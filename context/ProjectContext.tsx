import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { supabase } from '../supabaseClient';

interface ProjectContextType {
    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'timestamp'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const DEMO_PROJECTS: Project[] = [
        {
            id: '1',
            title: 'NEURAL_NET_VIZ',
            category: 'AI',
            status: 'LIVE',
            description: 'Real-time visualization of neural network activation patterns using WebGL & Three.js.',
            techStack: ['React', 'Three.js', 'TensorFlow.js', 'WebGL'],
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80',
            timestamp: new Date().toISOString()
        },
        {
            id: '2',
            title: 'CYBER_COMMERCE',
            category: 'WEB',
            status: 'LIVE',
            description: 'High-performance headless e-commerce platform built for extreme loads and conversion.',
            techStack: ['Next.js', 'Shopify', 'Tailwind', 'Redis'],
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
            timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: '3',
            title: 'VECTOR_FIELD_09',
            category: '3D_ART',
            status: 'DRAFT',
            description: 'Experimental generative art piece exploring vector fields and particle systems.',
            techStack: ['Processing', 'P5.js', 'GLSL'],
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
            timestamp: new Date(Date.now() - 172800000).toISOString()
        },
        {
            id: '4',
            title: 'FRAGMENT_ENGINE',
            category: 'SYSTEM',
            status: 'OFFLINE',
            description: 'Custom game engine architecture for handling massive entity counts in browser.',
            techStack: ['Rust', 'WASM', 'WebGPU'],
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
            timestamp: new Date(Date.now() - 259200000).toISOString()
        }
    ];

    const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
    const [loading, setLoading] = useState(true);
    const warnedSupabaseNull = useRef(false);

    const fetchProjects = async () => {
        if (!supabase) {
            if (!warnedSupabaseNull.current) {
                console.warn('Supabase client is not initialized. Using demo data.');
                warnedSupabaseNull.current = true;
            }
            // Ensure we have demo data if Supabase is missing
            setProjects(DEMO_PROJECTS);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('timestamp', { ascending: false });

            if (error) {
                console.error('Error fetching projects:', error);
                // Fallback to demo data on error
                setProjects(DEMO_PROJECTS);
            } else if (data && data.length > 0) {
                const mappedProjects: Project[] = data.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    status: p.status,
                    description: p.description,
                    techStack: p.tech_stack || [],
                    imageUrl: p.image_url || '',
                    timestamp: p.timestamp
                }));
                setProjects(mappedProjects);
            } else {
                // If fetches succeed but empty, implies empty DB. 
                // We can show empty list OR demo data. 
                // Let's show empty list if DB is connected but empty, 
                // BUT since user just connected, it might be confusing.
                // let's stick to empty list if DB is connected + empty, 
                // so they know their data is live.
                setProjects([]);
            }
        } catch (err) {
            console.error('Unexpected error fetching projects:', err);
            setProjects(DEMO_PROJECTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();

        if (!supabase) return;

        const subscription = supabase
            .channel('public:projects')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
                fetchProjects();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const addProject = async (project: Omit<Project, 'id' | 'timestamp'>) => {
        if (!supabase) {
            console.error('Supabase not initialized');
            return;
        }
        const dbProject = {
            title: project.title,
            category: project.category,
            status: project.status,
            description: project.description,
            tech_stack: project.techStack,
            image_url: project.imageUrl
        };

        const { data, error } = await supabase
            .from('projects')
            .insert([dbProject])
            .select();

        if (error) {
            console.error('Error adding project:', error);
        } else if (data) {
            const newProject: Project = {
                id: data[0].id,
                title: data[0].title,
                category: data[0].category,
                status: data[0].status,
                description: data[0].description,
                techStack: data[0].tech_stack || [],
                imageUrl: data[0].image_url || '',
                timestamp: data[0].timestamp
            };
            setProjects(prev => [newProject, ...prev]);
        }
    };

    const updateProject = async (id: string, updated: Partial<Project>) => {
        if (!supabase) return;

        const dbUpdate: any = { ...updated };
        if (updated.techStack) {
            dbUpdate.tech_stack = updated.techStack;
            delete dbUpdate.techStack;
        }
        if (updated.imageUrl) {
            dbUpdate.image_url = updated.imageUrl;
            delete dbUpdate.imageUrl;
        }

        const { error } = await supabase
            .from('projects')
            .update(dbUpdate)
            .eq('id', id);

        if (error) {
            console.error('Error updating project:', error);
        } else {
            setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
        }
    };

    const deleteProject = async (id: string) => {
        if (!supabase) return;
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting project:', error);
        } else {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const getProject = (id: string) => projects.find(p => p.id === id);

    return (
        <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
};
