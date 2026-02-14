import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const useScrambleText = (
    value: string,
    trigger: boolean,
    speed: number = 30
) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (!trigger) {
            setDisplayValue(value);
            return;
        }

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayValue(prev =>
                prev.split('').map((char, index) => {
                    if (index < iterations) {
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    return value[index];
                }).join('')
            );

            if (iterations >= value.length) {
                clearInterval(interval);
                setDisplayValue(''); // Clear after full scramble
            }

            iterations += 1 / 2; // Slower pace
        }, speed);

        return () => clearInterval(interval);
    }, [trigger, value, speed]);

    return displayValue;
};
