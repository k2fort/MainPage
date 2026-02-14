import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    lines: string[];
    delay?: number;
    speed?: number;
    className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    lines,
    delay = 0,
    speed = 30,
    className = ""
}) => {
    // Current text being displayed for all lines
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);

    // Track which line/char we are currently typing
    // We strive to match 'lines' prop content
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    // Startup delay phase
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasStarted(true);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!hasStarted) return;

        // If we have finished all lines, do nothing
        if (currentLineIndex >= lines.length) return;

        const targetLine = lines[currentLineIndex];

        // If current displayed line is fully typed
        if (currentCharIndex >= targetLine.length) {
            // Move to next line after a pause
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, speed * 15);
            return () => clearTimeout(timeout);
        }

        // Type next character
        const timeout = setTimeout(() => {
            setCurrentCharIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
    }, [hasStarted, currentLineIndex, currentCharIndex, lines, speed]);

    // specific effect to sync displayedLines with progress
    useEffect(() => {
        // Construct the array of lines to display based on progress
        const newDisplayedLines = lines.map((line, i) => {
            if (i < currentLineIndex) return line; // Already fully typed
            if (i === currentLineIndex) return line.substring(0, currentCharIndex); // Currently typing
            return ''; // Not yet started
        });
        setDisplayedLines(newDisplayedLines);
    }, [currentLineIndex, currentCharIndex, lines]);

    return (
        <div className={`font-mono ${className}`}>
            {displayedLines.map((line, i) => (
                <div key={i} className="min-h-[1.5em] break-words">
                    <span>{line}</span>
                    {i === currentLineIndex && i < lines.length && (
                        <span className="animate-pulse inline-block w-2 h-4 bg-primary/50 ml-1 align-middle"></span>
                    )}
                </div>
            ))}
        </div>
    );
};
