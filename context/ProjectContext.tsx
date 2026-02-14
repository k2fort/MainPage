import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { supabase } from '../supabaseClient';

interface ProjectContextType {
    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'timestamp' | 'order'>) => Promise<void>;
    updateProject: (id: string, project: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    getProject: (id: string) => Project | undefined;
    moveProject: (id: string, direction: 'up' | 'down') => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Removed redundant initialization logic as supabase is imported
    // const [supabase, setSupabase] = useState<any>(null); was shadowing import
    // useEffect for initialization removed

    const DEMO_PROJECTS: Project[] = [
        {
            id: '1',
            title: 'NEURAL_NET_VIZ',
            category: 'LIVE',
            description: 'Real-time visualization of neural network activation patterns using WebGL & Three.js.',
            techStack: ['React', 'Three.js', 'TensorFlow.js', 'WebGL'],
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80',
            timestamp: new Date().toISOString(),
            order: 0
        },
        {
            id: '2',
            title: 'CYBER_COMMERCE',
            category: 'LIVE',
            description: 'High-performance headless e-commerce platform built for extreme loads and conversion.',
            techStack: ['Next.js', 'Shopify', 'Tailwind', 'Redis'],
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            order: 1
        },
        {
            id: '3',
            title: 'VECTOR_FIELD_09',
            category: 'TEMPLATE',
            description: 'Experimental generative art piece exploring vector fields and particle systems.',
            techStack: ['Processing', 'P5.js', 'GLSL'],
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            order: 2
        },
        {
            id: '4',
            title: 'FRAGMENT_ENGINE',
            category: 'TEMPLATE',
            description: 'Custom game engine architecture for handling massive entity counts in browser.',
            techStack: ['Rust', 'WASM', 'WebGPU'],
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            order: 3
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
            // Sort demo data by order
            const sortedDemo = [...DEMO_PROJECTS].sort((a, b) => (a.order || 0) - (b.order || 0));
            setProjects(sortedDemo);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('order', { ascending: true }) // Primary sort
                .order('timestamp', { ascending: false }); // Secondary sort

            if (error) {
                console.error('Error fetching projects:', error);
                // Fallback to demo data on error
                setProjects(DEMO_PROJECTS);
            } else if (data && data.length > 0) {
                const mappedProjects: Project[] = data.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    category: p.category, // Assuming DB category text matches 'LIVE' | 'TEMPLATE' or we might need migration
                    description: p.description,
                    techStack: p.tech_stack || [],
                    imageUrl: p.image_url || '',
                    clientId: p.client_id || 'AUTO_GEN',
                    role: p.role || 'DEV',
                    timestamp: p.timestamp,
                    order: p.order ?? 0
                }));
                setProjects(mappedProjects);
            } else {
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
    }, [supabase]); // Added supabase to dependency array

    const addProject = async (project: Omit<Project, 'id' | 'timestamp' | 'order'>) => {
        // Calculate new order (max + 1)
        const maxOrder = projects.length > 0
            ? Math.max(...projects.map(p => p.order || 0))
            : -1;
        const newOrder = maxOrder + 1;

        if (!supabase) {
            console.error('Supabase not initialized');
            // Local fallback for demo
            const newProject: Project = {
                id: Math.random().toString(36).substr(2, 9),
                title: project.title,
                category: project.category,
                description: project.description,
                techStack: project.techStack,
                imageUrl: project.imageUrl,
                clientId: project.clientId || 'AUTO_GEN',
                role: project.role || 'DEV',
                timestamp: new Date().toISOString(),
                order: newOrder
            };
            setProjects(prev => [...prev, newProject].sort((a, b) => (a.order || 0) - (b.order || 0)));
            return;
        }

        const dbProject = {
            title: project.title,
            category: project.category,
            description: project.description,
            tech_stack: project.techStack,
            image_url: project.imageUrl,
            client_id: project.clientId || 'AUTO_GEN',
            role: project.role || 'DEV',
            order: newOrder
        };

        const { data, error } = await supabase
            .from('projects')
            .insert([dbProject])
            .select();

        if (error) {
            console.error('Error adding project:', error);
            throw new Error(error.message);
        } else if (data) {
            const newProject: Project = {
                id: data[0].id,
                title: data[0].title,
                category: data[0].category,
                description: data[0].description,
                techStack: data[0].tech_stack || [],
                imageUrl: data[0].image_url || '',
                timestamp: data[0].timestamp,
                order: data[0].order
            };
            setProjects(prev => [...prev, newProject].sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
    };

    const updateProject = async (id: string, updated: Partial<Project>) => {
        if (!supabase) {
            // Local fallback
            setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
            return;
        }

        // Map camelCase to snake_case for DB
        const dbUpdate: any = {};
        if (updated.title !== undefined) dbUpdate.title = updated.title;
        if (updated.category !== undefined) dbUpdate.category = updated.category;
        if (updated.description !== undefined) dbUpdate.description = updated.description;
        if (updated.techStack !== undefined) dbUpdate.tech_stack = updated.techStack;
        if (updated.imageUrl !== undefined) dbUpdate.image_url = updated.imageUrl;
        if (updated.clientId !== undefined) dbUpdate.client_id = updated.clientId;
        if (updated.role !== undefined) dbUpdate.role = updated.role;
        if (updated.order !== undefined) dbUpdate.order = updated.order;

        const { error } = await supabase
            .from('projects')
            .update(dbUpdate)
            .eq('id', id);

        if (error) {
            console.error('Error updating project:', error);
            throw new Error(error.message);
        } else {
            setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
        }
    };

    const deleteProject = async (id: string) => {
        if (!supabase) {
            setProjects(prev => prev.filter(p => p.id !== id));
            return;
        }
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting project:', error);
            throw new Error(error.message);
        } else {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const getProject = (id: string) => projects.find(p => p.id === id);

    const moveProject = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = projects.findIndex(p => p.id === id);
        if (currentIndex === -1) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        // Bounds check
        if (targetIndex < 0 || targetIndex >= projects.length) return;

        const currentProject = projects[currentIndex];
        const targetProject = projects[targetIndex];

        // Swap orders
        const newCurrentOrder = targetProject.order ?? 0;
        const newTargetOrder = currentProject.order ?? 0;

        // Optimistic UI update
        const updatedProjects = [...projects];
        updatedProjects[currentIndex] = { ...currentProject, order: newCurrentOrder };
        updatedProjects[targetIndex] = { ...targetProject, order: newTargetOrder };

        // Resort to reflect change immediately
        updatedProjects.sort((a, b) => (a.order || 0) - (b.order || 0));
        setProjects(updatedProjects);

        if (supabase) {
            // Update DB
            const { error: error1 } = await supabase.from('projects').update({ order: newCurrentOrder }).eq('id', currentProject.id);
            const { error: error2 } = await supabase.from('projects').update({ order: newTargetOrder }).eq('id', targetProject.id);

            if (error1 || error2) {
                console.error('Error moving project:', error1 || error2);
                // Re-fetch to revert optimistic update if DB fails
                fetchProjects();
            }
        }
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            addProject,
            updateProject,
            deleteProject,
            getProject,
            moveProject
        }}>
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
