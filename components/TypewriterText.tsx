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
    const [displayedLines, setDisplayedLines] = useState<string[]>(lines.map(() => ''));
    const [started, setStarted] = useState(false);

    // Refs to track progress without forcing re-renders on every tick logic
    const lineIndex = useRef(0);
    const charIndex = useRef(0);
    const isTyping = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started || isTyping.current) return;
        isTyping.current = true;

        let timeoutId: NodeJS.Timeout;

        const type = () => {
            if (lineIndex.current >= lines.length) {
                isTyping.current = false;
                return;
            }

            const currentLine = lines[lineIndex.current];

            if (charIndex.current < currentLine.length) {
                // Add next character
                const nextCharIndex = charIndex.current + 1;
                const nextText = currentLine.substring(0, nextCharIndex);

                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    newLines[lineIndex.current] = nextText;
                    return newLines;
                });

                charIndex.current = nextCharIndex;
                timeoutId = setTimeout(type, speed);
            } else {
                // End of line, move to next
                lineIndex.current++;
                charIndex.current = 0;
                timeoutId = setTimeout(type, speed * 15); // Pause before next line
            }
        };

        type();

        return () => clearTimeout(timeoutId);
    }, [started, lines, speed]);

    if (!started) return null;

    return (
        <div className={`font-mono ${className}`}>
            {displayedLines.map((line, i) => (
                <div key={i} className="min-h-[1.5em] break-words">
                    {/* Only render line if it has content or if we want to preserve space. 
                        Since we initialize as empty strings, checking index < lineIndex.current + 1 ensures we only show what we've touched
                    */}
                    {i <= lineIndex.current && (
                        <span>{line}</span>
                    )}
                </div>
            ))}
        </div>
    );
};
