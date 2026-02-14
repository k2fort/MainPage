import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
const Landing = React.lazy(() => import('./pages/Landing').then(module => ({ default: module.Landing })));
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Projects = React.lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })));
const Editor = React.lazy(() => import('./pages/Editor').then(module => ({ default: module.Editor })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Login = React.lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const InquiryInbox = React.lazy(() => import('./pages/InquiryInbox').then(module => ({ default: module.InquiryInbox })));

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverlayEffects } from './components/OverlayEffects';
import { GlobalBackground } from './components/GlobalBackground';

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-background-dark text-primary font-mono animate-pulse">
    LOADING_MODULE...
  </div>
);

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
import { AnalyticsProvider } from './context/AnalyticsContext';

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <InquiryProvider>
        <Router>
          <AnalyticsProvider>
            <Layout>
              <React.Suspense fallback={<LoadingFallback />}>
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
              </React.Suspense>
            </Layout>
          </AnalyticsProvider>
        </Router>
      </InquiryProvider>
    </ProjectProvider>
  );
};

export default App;