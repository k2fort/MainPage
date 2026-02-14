import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: number;
    read: boolean;
}

interface InquiryContextType {
    inquiries: Inquiry[];
    addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'read'>) => void;
    markAsRead: (id: string) => void;
    deleteInquiry: (id: string) => void;
    unreadCount: number;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
        const saved = localStorage.getItem('sys_inquiries');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('sys_inquiries', JSON.stringify(inquiries));
    }, [inquiries]);

    const addInquiry = (data: Omit<Inquiry, 'id' | 'timestamp' | 'read'>) => {
        const newInquiry: Inquiry = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            read: false
        };
        setInquiries(prev => [newInquiry, ...prev]);
    };

    const markAsRead = (id: string) => {
        setInquiries(prev => prev.map(item =>
            item.id === id ? { ...item, read: true } : item
        ));
    };

    const deleteInquiry = (id: string) => {
        setInquiries(prev => prev.filter(item => item.id !== id));
    };

    const unreadCount = inquiries.filter(i => !i.read).length;

    return (
        <InquiryContext.Provider value={{ inquiries, addInquiry, markAsRead, deleteInquiry, unreadCount }}>
            {children}
        </InquiryContext.Provider>
    );
};

export const useInquiryContext = () => {
    const context = useContext(InquiryContext);
    if (context === undefined) {
        throw new Error('useInquiryContext must be used within an InquiryProvider');
    }
    return context;
};
