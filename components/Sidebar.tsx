import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Terminal, Settings, LogOut, Activity } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem('sys_access');
    navigate('/');
  };

  return (
    <aside className="w-[60px] lg:w-[250px] flex-col border-r border-muted bg-surface flex shrink-0 z-30 transition-all">
      <div className="flex flex-col p-4 lg:p-6 gap-8 h-full">
        {/* Branding */}
        <div className="hidden lg:flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-2">
            <Activity className="text-primary w-5 h-5 animate-pulse" />
            <h1 className="font-display font-bold text-xl tracking-tighter text-white uppercase leading-none">
              ADMIN_PANEL
            </h1>
          </div>
          <p className="text-xs text-muted font-mono mt-2 pl-7">SYS.ADMIN // V.1.0</p>
        </div>

        {/* Mobile Branding Icon Only */}
        <div className="lg:hidden flex justify-center mb-6">
          <Activity className="text-primary w-6 h-6 animate-pulse" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 w-full flex-1">
          <Link
            to="/dashboard"
            className={`group flex items-center gap-3 px-3 py-3 border transition-all ${isActive('/dashboard') ? 'bg-primary/10 border-primary text-primary' : 'border-transparent text-gray-400 hover:text-primary hover:border-muted'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight hidden lg:block">[ DASHBOARD ]</span>
          </Link>

          <Link
            to="/projects"
            className={`group flex items-center gap-3 px-3 py-3 border transition-all ${isActive('/projects') ? 'bg-primary/10 border-primary text-primary' : 'border-transparent text-gray-400 hover:text-primary hover:border-muted'}`}
          >
            <FolderOpen className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight hidden lg:block">[ PROJECTS ]</span>
          </Link>

          <div className="group flex items-center gap-3 px-3 py-3 border border-transparent text-gray-600 cursor-not-allowed">
            <Terminal className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight hidden lg:block">[ ANALYTICS ]</span>
          </div>

          <div className="group flex items-center gap-3 px-3 py-3 border border-transparent text-gray-600 cursor-not-allowed">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight hidden lg:block">[ CONFIG ]</span>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-muted pt-6 hidden lg:block">
          <div className="flex flex-col gap-4">
            <div className="text-xs text-muted font-mono">
              <span className="block">CPU_LOAD: 34%</span>
              <span className="block">MEM_USAGE: 10.6/12GB</span>
              <span className="block mt-1 text-primary animate-pulse">● STATUS_ONLINE</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full h-10 flex items-center justify-center border border-accent text-accent hover:bg-accent hover:text-black transition-colors duration-0 uppercase text-xs font-bold tracking-wider gap-2"
            >
              <LogOut className="w-4 h-4" />
              [ LOGOUT ]
            </button>
          </div>
        </div>

        {/* Mobile Footer Icon */}
        <div className="lg:hidden mt-auto pt-4 flex justify-center">
          <button onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-accent hover:text-white" />
          </button>
        </div>

      </div>
    </aside>
  );
};