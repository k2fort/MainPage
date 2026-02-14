import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Terminal, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      // Small timeout to allow navigation to complete before scrolling
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 border-b border-muted bg-background-dark/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <Terminal className="text-primary w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="font-display font-bold tracking-tighter text-lg text-white">
            TONY<span className="text-primary">SMOSH.COM</span>
          </span>
          <span className="text-xs text-primary animate-pulse ml-2 font-mono hidden sm:inline-block">[ONLINE]</span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-bold font-mono">
          <button
            onClick={() => handleScroll('projects')}
            className="text-gray-400 hover:text-primary hover:underline decoration-2 decoration-primary underline-offset-4"
          >
            [PROJECTS]
          </button>
          <button
            onClick={() => handleScroll('services')}
            className="text-gray-400 hover:text-primary hover:underline decoration-2 decoration-primary underline-offset-4"
          >
            [SERVICES]
          </button>
          <button
            onClick={() => handleScroll('contact')}
            className="text-gray-400 hover:text-primary hover:underline decoration-2 decoration-primary underline-offset-4"
          >
            [CONTACT]
          </button>
        </div>

        <Link to="/dashboard">
          <button className="flex items-center gap-2 bg-primary text-background-dark font-bold text-xs px-4 py-2 hover:bg-white hover:text-black transition-colors uppercase border border-transparent hover:border-primary shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            <Shield className="w-4 h-4" />
            Sys_Access
          </button>
        </Link>
      </div>
    </nav>
  );
};