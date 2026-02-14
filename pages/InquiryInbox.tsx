import React from 'react';
import { useInquiryContext } from '../context/InquiryContext';
import { Reveal } from '../components/Reveal';
import { Terminal, Trash2, MailOpen, User, Clock, AlertCircle } from 'lucide-react';

export const InquiryInbox: React.FC = () => {
    const { inquiries, markAsRead, deleteInquiry } = useInquiryContext();

    return (
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto flex flex-col gap-8 h-full">
            <Reveal direction="down">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-muted pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary text-xs font-mono mb-1">
                            <Terminal className="w-3 h-3" />
                            <span>CONNECTED :: SECURE_CHANNEL_INBOX</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter uppercase">
                            INQUIRY_INBOX<span className="text-primary animate-blink">_</span>
                        </h2>
                    </div>
                </header>
            </Reveal>

            <div className="flex-1 border border-muted bg-black/50 overflow-hidden flex flex-col">
                {/* Terminal Header */}
                <div className="bg-surface border-b border-muted p-3 flex justify-between items-center text-xs font-mono text-gray-400">
                    <div className="flex gap-4">
                        <span>STATUS: RECEIVING</span>
                        <span>ENCRYPTION: AES-256</span>
                    </div>
                    <span>TOTAL_PACKETS: {inquiries.length}</span>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {inquiries.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono gap-4 opacity-50">
                            <AlertCircle className="w-12 h-12" />
                            <p>&gt; NO_TRANSMISSIONS_DETECTED</p>
                            <p>&gt; CHANNEL_IDLE...</p>
                        </div>
                    ) : (
                        inquiries.map((inquiry, index) => (
                            <Reveal key={inquiry.id} delay={index * 0.1} width="100%">
                                <div className={`relative border ${inquiry.read ? 'border-muted bg-surface/30' : 'border-primary/50 bg-primary/5'} p-4 transition-all duration-200 hover:bg-surface/50 group`}>
                                    {/* Unread Indicator */}
                                    {!inquiry.read && (
                                        <div className="absolute top-0 right-0 p-1">
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                            </span>
                                        </div>
                                    )}

                                    {/* Header Info */}
                                    <div className="flex flex-wrap gap-4 text-xs font-mono mb-3 text-gray-400 border-b border-muted/50 pb-2">
                                        <span className="flex items-center gap-2">
                                            <User className="w-3 h-3" />
                                            <span className="text-white uppercase">{inquiry.name}</span>
                                        </span>
                                        <span className="text-primary">&lt;{inquiry.email}&gt;</span>
                                        <span className="flex items-center gap-2 ml-auto">
                                            <Clock className="w-3 h-3" />
                                            {new Date(inquiry.timestamp).toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Message Body */}
                                    <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {inquiry.message}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!inquiry.read && (
                                            <button
                                                onClick={() => markAsRead(inquiry.id)}
                                                className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-black text-xs font-bold uppercase transition-colors"
                                            >
                                                <MailOpen className="w-3 h-3" />
                                                [ MARK_READ ]
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteInquiry(inquiry.id)}
                                            className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white text-xs font-bold uppercase transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            [ PURGE ]
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
