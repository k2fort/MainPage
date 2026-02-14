import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    img: string;
    delay?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, desc, tags, img }) => (
    <div className="group brutal-card bg-surface border border-muted p-0 transition-all duration-75 ease-out cursor-pointer flex flex-col hover:border-primary hover:shadow-hard hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden border-b border-muted">
            <img
                src={img}
                alt={title}
                className="w-full h-full object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-[10px] text-primary border border-primary/30 font-mono">
                {id}
            </div>
        </div>
        <div className="p-6 flex flex-col gap-4 flex-grow">
            <div className="flex justify-between items-start">
                <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-primary uppercase">{title}</h3>
                <ArrowUpRight className="text-gray-600 group-hover:text-primary transition-colors w-6 h-6" />
            </div>
            <p className="text-gray-400 text-sm font-mono leading-relaxed line-clamp-2">
                {desc}
            </p>
            <div className="mt-auto pt-4 border-t border-muted flex flex-wrap gap-2 text-[10px] text-primary uppercase font-mono">
                {tags.map(tag => (
                    <span key={tag} className="bg-primary/10 px-2 py-1">{tag}</span>
                ))}
            </div>
        </div>
    </div>
);
