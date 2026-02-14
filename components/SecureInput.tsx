import React, { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { useScrambleText } from '../hooks/useScrambleText';

interface SecureInputProps {
    label: string;
    type?: 'text' | 'email' | 'textarea';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    id?: string;
    isScrambling?: boolean;
}

export const SecureInput: React.FC<SecureInputProps> = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required,
    id,
    isScrambling = false
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(false);

    // Scramble logic
    const displayValue = useScrambleText(value, isScrambling, 40);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setIsFocused(false);
        if (value.length > 0) setIsSecure(true);
    };

    return (
        <div className="flex flex-col gap-1 relative group">
            <div className="flex justify-between items-end mb-1">
                <label
                    htmlFor={id}
                    className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 flex items-center gap-1
                        ${isFocused ? 'text-primary' : 'text-gray-500'}
                    `}
                >
                    {isSecure && !isFocused ? <ShieldCheck className="w-3 h-3" /> : <span className="w-3 h-3 bg-primary/20 block"></span>}
                    {label}
                </label>
                {isFocused && (
                    <span className="text-[10px] text-primary/50 font-mono animate-pulse">
                        INPUT_ACTIVE
                    </span>
                )}
            </div>

            <div className="relative">
                {/* Background Grid Element */}
                <div className={`absolute inset-0 border transition-all duration-300 pointer-events-none
                    ${isFocused ? 'border-primary bg-primary/5' : 'border-muted bg-black'}
                `}></div>

                {/* Corner Markers */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 ${isFocused ? 'border-primary' : 'border-gray-600'}`}></div>
                <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${isFocused ? 'border-primary' : 'border-gray-600'}`}></div>
                <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors duration-300 ${isFocused ? 'border-primary' : 'border-gray-600'}`}></div>
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300 ${isFocused ? 'border-primary' : 'border-gray-600'}`}></div>

                {type === 'textarea' ? (
                    <textarea
                        id={id}
                        value={isScrambling ? displayValue : value}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        required={required}
                        readOnly={isScrambling}
                        rows={4}
                        className="w-full bg-transparent border-none p-3 text-sm font-mono text-white placeholder-gray-700 focus:ring-0 focus:outline-none relative z-10 resize-none"
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        value={isScrambling ? displayValue : value}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        required={required}
                        readOnly={isScrambling}
                        className="w-full bg-transparent border-none p-3 text-sm font-mono text-white placeholder-gray-700 focus:ring-0 focus:outline-none relative z-10"
                    />
                )}

                {/* Scanline Effect on Focus */}
                {isFocused && (
                    <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10 z-0"></div>
                )}
            </div>
        </div>
    );
};
