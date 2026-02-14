import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Editor } from './pages/Editor';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { InquiryInbox } from './pages/InquiryInbox';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverlayEffects } from './components/OverlayEffects';
import { GlobalBackground } from './components/GlobalBackground';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = localStorage.getItem('sys_access') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = ['/dashboard', '/projects', '/editor', '/inbox'].some(path => location.pathname.startsWith(path));
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col text-text-main font-mono overflow-x-hidden relative">
      <GlobalBackground />
      <OverlayEffects />

      {isAdmin ? (
        <div className="flex flex-1 h-screen overflow-hidden relative z-10">
          <Sidebar />
          <main className="flex-1 overflow-auto relative bg-background-dark/80 backdrop-blur-sm">
            {children}
          </main>
        </div>
      ) : isLogin ? (
        <main className="flex-1 relative h-screen z-10">
          {children}
        </main>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 pt-20 relative z-10">
            {children}
          </main>
        </>
      )}
    </div>
  );
};

import { ProjectProvider } from './context/ProjectContext';
import { InquiryProvider } from './context/InquiryContext';

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <InquiryProvider>
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
              <Route path="/inbox" element={
                <ProtectedRoute>
                  <InquiryInbox />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </Router>
      </InquiryProvider>
    </ProjectProvider>
  );
};

export default App;