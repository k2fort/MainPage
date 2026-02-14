import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Editor } from './pages/Editor';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverlayEffects } from './components/OverlayEffects';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = localStorage.getItem('sys_access') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = ['/dashboard', '/projects', '/editor'].some(path => location.pathname.startsWith(path));
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-text-main font-mono overflow-x-hidden relative">
      <OverlayEffects />

      {isAdmin ? (
        <div className="flex flex-1 h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto relative">
            {/* Admin Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" style={{ backgroundSize: '40px 40px' }} />
            {children}
          </main>
        </div>
      ) : isLogin ? (
        <main className="flex-1 relative h-screen">
          {children}
        </main>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 pt-20 relative">
            {/* Public Grid Background */}
            <div className="fixed inset-0 z-0 bg-grid-pattern opacity-10 pointer-events-none" style={{ backgroundSize: '40px 40px' }} />
            {children}
          </main>
        </>
      )}
    </div>
  );
};

import { ProjectProvider } from './context/ProjectContext';

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/editor/:id" element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            } />
            <Route path="/editor" element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </ProjectProvider>
  );
};

export default App;