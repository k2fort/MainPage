import React, { useState } from 'react';
import { ArrowUpRight, Activity, Terminal, MapPin, Cpu, Layers, Box, Zap, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroParticles } from '../components/HeroParticles';
import { useProjectContext } from '../context/ProjectContext';
import { Reveal } from '../components/Reveal';
import { TextReveal } from '../components/TextReveal';
import { TypewriterText } from '../components/TypewriterText';
import { ProjectCard } from '../components/ProjectCard';
import { useInquiryContext } from '../context/InquiryContext';
import { SecureInput } from '../components/SecureInput';

const BACKGROUNDS = [
    '/img/logo01.webp',
    '/img/logo02.webp',
    '/img/logo03.webp'
];

const ServiceCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    desc: string;
    features: string[];
}> = ({ icon, title, desc, features }) => (
    <div className="bg-surface border border-muted p-6 md:p-8 flex flex-col gap-6 group hover:border-primary transition-colors relative overflow-hidden">
        {/* Background Glitch Effect on Hover */}
        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-start">
            <div className="p-3 bg-background-dark border border-muted text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                {icon}
            </div>
            <span className="font-mono text-xs text-muted group-hover:text-primary transition-colors">SYS_MOD</span>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight group-hover:translate-x-1 transition-transform">{title}</h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed border-l-2 border-muted pl-4 group-hover:border-primary transition-colors">
                {desc}
            </p>
        </div>

        <div className="relative z-10 mt-auto pt-6 border-t border-muted">
            <div className="grid grid-cols-2 gap-2">
                {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                        <span className="w-1 h-1 bg-primary"></span>
                        {feat}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Landing: React.FC = () => {
    const { projects } = useProjectContext();
    const { addInquiry } = useInquiryContext();
    const [terminalLines, setTerminalLines] = useState([
        "> SYSTEM_READY",
        "> MOUNTING_DRIVE... [OK]",
        "> SCANNING_PORTS... [OK]",
        "> WAITING_FOR_INPUT_",
        "> previous_session_id: x89_aa2",
        "> clearing_cache... done."
    ]);
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
    return (
        <>
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative z-10 min-h-[85vh] flex flex-col justify-center overflow-hidden">

                {/* Particle System Layer - Full Width */}
                <HeroParticles />

                {/* Constrained Content Container */}
                <div className="w-full max-w-[1400px] mx-auto px-6 border-l border-r border-muted/30 flex-grow flex flex-col justify-center relative z-10">

                    <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-muted/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none opacity-50 flex items-center justify-center z-0">
                        <div className="w-[70%] h-[70%] border border-muted/20 rotate-45"></div>
                    </div>

                    <div className="relative max-w-5xl z-10">
                        <Reveal>
                            <p className="text-primary text-sm md:text-base mb-2 font-mono tracking-widest pl-1">
                    // IDENTITY_RECONSTRUCTION_COMPLETE
                            </p>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-[-0.05em] leading-[0.9] text-white uppercase mix-blend-exclusion">
                                <TextReveal delay={0.1}>TONY_</TextReveal><br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                                    <TextReveal delay={0.2}>SMOSH</TextReveal>
                                </span>
                            </h1>
                        </Reveal>

                        <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                            <Reveal delay={0.8} direction="right">
                                <div className="flex items-center gap-3 bg-surface border border-muted px-4 py-2">
                                    <span className="w-2 h-2 bg-primary animate-blink"></span>
                                    <span className="text-sm text-gray-400 font-mono">STATUS: <span className="text-white">OPERATIONAL</span></span>
                                </div>
                            </Reveal>
                            <Reveal delay={0.9} direction="left">
                                <p className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed font-mono">
                                    Helping founders launch faster, convert better, and automate smarter through premium web design and custom AI workflows.
                                </p>
                            </Reveal>
                        </div>

                        <div className="mt-12 group">
                            <Reveal delay={1.0} direction="up">
                                <button
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="relative bg-transparent border border-primary text-primary hover:bg-primary hover:text-black px-8 py-4 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-75 shadow-[4px_4px_0px_0px_#444] hover:shadow-hard"
                                >
                                    [ Execute_Scroll_Down ]
                                </button>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="w-full bg-black border-y border-muted overflow-hidden py-3 md:py-4 relative z-20">
                <div className="whitespace-nowrap animate-marquee flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-12 pr-12">
                            <span className="text-primary font-display font-bold text-xl md:text-3xl tracking-tight">UI_DESIGN //</span>
                            <span className="text-white font-display font-bold text-xl md:text-3xl tracking-tight opacity-50">UX_RESEARCH //</span>
                            <span className="text-primary font-display font-bold text-xl md:text-3xl tracking-tight">REACT_ENGINEERING //</span>
                            <span className="text-white font-display font-bold text-xl md:text-3xl tracking-tight opacity-50">AI_INTEGRATION //</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <section id="projects" className="max-w-[1400px] mx-auto px-6 py-20 md:py-32 relative z-10 border-l border-r border-muted/30">
                <div className="flex flex-wrap justify-between items-end mb-16 border-b border-muted pb-4 gap-4">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                        FRAGMENT_<br />DATABASE
                    </h2>
                    <div className="md:block text-right font-mono text-xs">
                        <p className="text-primary mb-1">INDEXING: {projects.length < 10 ? `0${projects.length}` : projects.length} FILES</p>
                        <p className="text-gray-500">SORT: MANUAL_OVERRIDE</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((p, i) => (
                        <div key={p.id} className={i % 2 !== 0 ? "md:mt-12" : ""}>
                            <Reveal delay={i * 0.1}>
                                <ProjectCard
                                    id={`ID_${p.id}`}
                                    title={p.title}
                                    desc={p.description}
                                    tags={p.techStack}
                                    img={p.imageUrl}
                                    delay={i * 0.1}
                                />
                            </Reveal>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="border-t border-muted bg-background-dark relative z-10">
                <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-32 border-l border-r border-muted/30">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-muted pb-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest">
                                    <Code className="w-4 h-4" />
                                    <span>AVAILABLE_RESOURCES</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter uppercase">
                                    SERVICE_PROTOCOLS
                                </h2>
                            </div>
                            <p className="max-w-md text-sm font-mono text-gray-400 text-right hidden md:block">
                                DEPLOYING HIGH-PERFORMANCE DIGITAL ASSETS FOR THE MODERN WEB. OPTIMIZED FOR SCALE AND VISUAL IMPACT.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Reveal delay={0.1}>
                                <ServiceCard
                                    icon={<Cpu className="w-6 h-6" />}
                                    title="Visual Identity & Design"
                                    desc="Comprehensive branding solutions including logo design, visual systems, and brand guidelines."
                                    features={['SPA_DEVELOPMENT', 'API_DESIGN', 'DB_MANAGEMENT', 'CLOUD_DEPLOY']}
                                />
                            </Reveal>
                            <Reveal delay={0.2}>
                                <ServiceCard
                                    icon={<Layers className="w-6 h-6" />}
                                    title="Websites & Stores"
                                    desc="High-performance websites and e-commerce stores designed for optimal user experience and conversion."
                                    features={['FIGMA_PROTOTYPE', 'DESIGN_SYSTEMS', 'WIREFRAMING', 'USER_FLOWS']}
                                />
                            </Reveal>
                            <Reveal delay={0.3}>
                                <ServiceCard
                                    icon={<Box className="w-6 h-6" />}
                                    title="WEB_GL"
                                    desc="Immersive 3D experiences directly in the browser. Using shaders and particle systems to visualize complex data."
                                    features={['THREE.JS', 'R3F', 'GLSL_SHADERS', 'PERFORMANCE']}
                                />
                            </Reveal>
                            <Reveal delay={0.4}>
                                <ServiceCard
                                    icon={<Zap className="w-6 h-6" />}
                                    title="SEO Optimization"
                                    desc="System analysis and performance tuning. Reducing bundle sizes and improving Core Web Vitals for maximum speed."
                                    features={['AUDITING', 'SEO_BOOST', 'REFACTORING', 'ANALYTICS']}
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="border-t border-muted bg-surface relative z-10">
                <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-32 border-l border-r border-muted/30">
                    <div className="flex flex-col gap-12 md:gap-24">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between gap-6 items-end border-l-4 border-primary pl-6">
                            <div className="flex flex-col gap-2">
                                <Reveal>
                                    <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-[-0.05em] uppercase font-display text-white">
                                // Initiate_<br />Handshake
                                    </h2>
                                </Reveal>
                                <Reveal delay={0.2}>
                                    <p className="text-primary font-mono text-sm md:text-base tracking-widest mt-2">
                                        &gt; OPENING_SECURE_CHANNEL... [LISTENING]
                                    </p>
                                </Reveal>
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

                                <form className="flex flex-col gap-10 p-2" onSubmit={async (e) => {
                                    e.preventDefault();

                                    setIsEncrypting(true);
                                    setTerminalLines(["> INITIALIZING_UPLINK..."]);

                                    // Simulate encryption delay
                                    await new Promise(r => setTimeout(r, 600));
                                    setTerminalLines(prev => [...prev, "> ENCRYPTING_PAYLOAD..."]);
                                    await new Promise(r => setTimeout(r, 800));
                                    setTerminalLines(prev => [...prev, "> UPLOADING_TO_SECURE_SERVER..."]);
                                    await new Promise(r => setTimeout(r, 600));

                                    addInquiry({
                                        name: formState.name,
                                        email: formState.email,
                                        message: formState.message
                                    });

                                    setTerminalLines(prev => [
                                        ...prev,
                                        "> TRANSMISSION_COMPLETE [200 OK]",
                                        "> CONNECTION_TERMINATED"
                                    ]);

                                    setIsEncrypting(false);
                                    setFormState({ name: '', email: '', message: '' });
                                }}>
                                    <Reveal delay={0.1} width="100%">
                                        <SecureInput
                                            id="name"
                                            label="01_SENDER_IDENTITY"
                                            placeholder="ENTER_CODENAME"
                                            value={formState.name}
                                            onChange={handleInputChange}
                                            required
                                            isScrambling={isEncrypting}
                                        />
                                    </Reveal>

                                    <Reveal delay={0.2} width="100%">
                                        <SecureInput
                                            id="email"
                                            type="email"
                                            label="02_RETURN_ADDRESS"
                                            placeholder="ENTER_SECURE_EMAIL"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            required
                                            isScrambling={isEncrypting}
                                        />
                                    </Reveal>

                                    <Reveal delay={0.3} width="100%">
                                        <SecureInput
                                            id="message"
                                            type="textarea"
                                            label="03_MISSION_BRIEF"
                                            placeholder="DESCRIBE_OBJECTIVE"
                                            value={formState.message}
                                            onChange={handleInputChange}
                                            required
                                            isScrambling={isEncrypting}
                                        />
                                    </Reveal>

                                    <Reveal delay={0.4} width="100%">
                                        <div className="pt-8">
                                            <button
                                                disabled={isEncrypting}
                                                className={`
                                                    bg-primary text-black font-bold font-display uppercase text-xl py-4 px-12 tracking-wider transition-all duration-300 
                                                    shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none flex items-center gap-2 group/btn
                                                    ${isEncrypting ? 'opacity-50 cursor-wait' : ''}
                                                `}
                                            >
                                                {isEncrypting ? '[ TRANSMITTING... ]' : '[ INIT_TRANSMISSION ]'}
                                                <span className={`w-2 h-2 bg-black rounded-full ${isEncrypting ? 'animate-ping' : 'group-hover/btn:animate-ping'}`}></span>
                                            </button>
                                        </div>
                                    </Reveal>

                                    <div className="mt-8 min-h-[140px]">
                                        {/* Spacer to keep layout stable if needed, or remove completely */}
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
                                        <TypewriterText
                                            key={terminalLines[0]} // Force re-render on new lines
                                            lines={terminalLines}
                                            delay={1.0}
                                            speed={30}
                                            className="text-[#888]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-muted py-8 relative z-20">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>All Systems Nominal</span>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                        <a href="#" className="hover:text-primary transition-colors">Telegram</a>
                    </div>
                    <div>
                        © 2025 TONYSMOSH.COM // V.1.0
                    </div>
                </div>
            </footer>
        </>
    );
};
