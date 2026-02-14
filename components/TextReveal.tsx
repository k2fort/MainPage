import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?';

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = "", delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let interval: NodeJS.Timeout;
        let iteration = 0;

        // Initial delay before starting the scramble effect
        const startTimeout = setTimeout(() => {
            interval = setInterval(() => {
                setDisplayText(prev =>
                    children
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) {
                                return children[index];
                            }
                            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                        })
                        .join('')
                );

                if (iteration >= children.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3; // Controls speed of reveal
            }, 30);
        }, delay * 1000);

        return () => {
            clearTimeout(startTimeout);
            clearInterval(interval);
        };
    }, [children, isInView, delay]);

    return (
        <span ref={ref} className={className}>
            {displayText || (isInView ? children.replace(/./g, ' ') : '')}
            {/* Show empty space initially to prevent layout shift, or random chars if desired in future */}
        </span>
    );
};
