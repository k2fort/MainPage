import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useLocation } from 'react-router-dom';

interface AnalyticsStats {
    totalViews: number;
    uniqueVisitors: number;
    topPages: { name: string; value: number }[];
    recentLogs: any[];
}

interface AnalyticsContextType {
    stats: AnalyticsStats;
    refreshStats: () => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [stats, setStats] = useState<AnalyticsStats>({
        totalViews: 0,
        uniqueVisitors: 0,
        topPages: [],
        recentLogs: []
    });

    // Session ID management
    useEffect(() => {
        let sessionId = localStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            localStorage.setItem('analytics_session_id', sessionId);
        }
    }, []);

    // Log View on route change
    useEffect(() => {
        const logView = async () => {
            if (!supabase) return;

            const sessionId = localStorage.getItem('analytics_session_id');
            const { error } = await supabase
                .from('analytics')
                .insert({
                    session_id: sessionId,
                    page_path: location.pathname,
                    event_type: 'view'
                });

            if (error) console.error('Error logging view:', error);
            else refreshStats();
        };

        logView();
    }, [location.pathname]);

    // Fetch Stats for Dashboard
    const refreshStats = async () => {
        if (!supabase) return;

        // Total Views
        const { count: totalViews } = await supabase
            .from('analytics')
            .select('*', { count: 'exact', head: true });

        // Unique Visitors (Approximate via distinct session_id)
        // Note: Supabase JS doesn't support distinct count easily without RPC, 
        // so we'll fetch ID only and count in JS for this scale.
        // For production scale, use a SQL view or RPC.
        const { data: uniqueData } = await supabase
            .from('analytics')
            .select('session_id');

        const uniqueVisitors = new Set(uniqueData?.map(d => d.session_id)).size;

        // Top Pages
        const { data: allData } = await supabase
            .from('analytics')
            .select('page_path');

        const pageCounts: Record<string, number> = {};
        allData?.forEach(d => {
            pageCounts[d.page_path] = (pageCounts[d.page_path] || 0) + 1;
        });

        const topPages = Object.entries(pageCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        // Recent Logs
        const { data: recentLogs } = await supabase
            .from('analytics')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        setStats({
            totalViews: totalViews || 0,
            uniqueVisitors: uniqueVisitors || 0,
            topPages,
            recentLogs: recentLogs || []
        });
    };

    // Initial load
    useEffect(() => {
        refreshStats();
    }, []);

    return (
        <AnalyticsContext.Provider value={{ stats, refreshStats }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};
