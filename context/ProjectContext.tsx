import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectContextType {
    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'timestamp'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const SEED_DATA: Project[] = [
    {
        id: '042',
        title: 'NEURAL_NET_VIZ',
        category: 'AI',
        status: 'LIVE',
        description: 'Real-time data visualization dashboard for tracking ML model training. Utilizes WebGL for rendering large datasets.',
        techStack: ['D3.js', 'WebGL', 'React'],
        imageUrl: 'https://picsum.photos/800/450?grayscale',
        timestamp: new Date().toISOString()
    },
    {
        id: '041',
        title: 'CYBER_COMMERCE',
        category: 'WEB',
        status: 'OFFLINE',
        description: 'A stripped-back e-commerce experience for a luxury streetwear brand. Focus on typography and negative space.',
        techStack: ['Shopify', 'Liquid', 'GSAP'],
        imageUrl: 'https://picsum.photos/800/451?grayscale',
        timestamp: new Date().toISOString()
    },
    {
        id: '040',
        title: 'VECTOR_FIELD_09',
        category: '3D_ART',
        status: 'LIVE',
        description: 'Generative art piece exploring vector fields and flow algorithms.',
        techStack: ['Canvas API', 'TypeScript'],
        imageUrl: 'https://picsum.photos/800/452?grayscale',
        timestamp: new Date().toISOString()
    },
    {
        id: '039',
        title: 'FRAGMENT_ENGINE',
        category: 'SYSTEM',
        status: 'ARCHIVED',
        description: 'Custom game engine prototype built for performance testing.',
        techStack: ['C++', 'OpenGL', 'WASM'],
        imageUrl: 'https://picsum.photos/800/453?grayscale',
        timestamp: new Date().toISOString()
    }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('sys_projects');
        return saved ? JSON.parse(saved) : SEED_DATA;
    });


    // Sync state across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'sys_projects' && e.newValue) {
                setProjects(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('sys_projects', JSON.stringify(projects));
        } catch (e) {
            console.error("STORAGE_QUOTA_EXCEEDED", e);
            alert("SYSTEM_WARNING: STORAGE_CAPACITY_REACHED. ASSETS_MAY_NOT_PERSIST.");
        }
    }, [projects]);

    const addProject = (project: Omit<Project, 'id' | 'timestamp'>) => {
        const newProject: Project = {
            ...project,
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            timestamp: new Date().toISOString()
        };
        setProjects(prev => [newProject, ...prev]);
    };

    const updateProject = (id: string, updated: Partial<Project>) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    };

    const deleteProject = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id));
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
