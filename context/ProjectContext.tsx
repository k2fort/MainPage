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
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const warnedSupabaseNull = useRef(false);

    const fetchProjects = async () => {
        if (!supabase) {
            if (!warnedSupabaseNull.current) {
                console.warn('Supabase client is not initialized. Check your environment variables.');
                warnedSupabaseNull.current = true;
            }
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
                // Fallback to empty or maybe show a notification
            } else {
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
            }
        } catch (err) {
            console.error('Unexpected error fetching projects:', err);
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
