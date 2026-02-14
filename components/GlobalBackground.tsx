import React, { useState, useEffect } from 'react';

const BACKGROUNDS = [
    '/img/logo01.webp',
    '/img/logo02.webp',
    '/img/logo03.webp'
];

export const GlobalBackground: React.FC = () => {
    const [bgImage, setBgImage] = useState<string>('');

    useEffect(() => {
        const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
        setBgImage(randomBg);
    }, []);

    if (!bgImage) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <img
                src={bgImage}
                alt="Background Animation"
                className="w-full h-full object-cover opacity-40 scale-125 translate-x-24"
            />
            <div className="absolute inset-0 bg-background-dark/60"></div>
        </div>
    );
};
