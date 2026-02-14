import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    blur?: boolean;
    className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
    children,
    width = 'fit-content',
    direction = 'up',
    delay = 0,
    duration = 0.5,
    blur = false,
    className = ""
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView, mainControls]);

    const getHiddenVariant = () => {
        const variants: any = { opacity: 0 };
        if (blur) variants.filter = 'blur(10px)';

        switch (direction) {
            case 'up': variants.y = 75; break;
            case 'down': variants.y = -75; break;
            case 'left': variants.x = 75; break;
            case 'right': variants.x = -75; break;
        }
        return variants;
    };

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }} className={className}>
            <motion.div
                variants={{
                    hidden: getHiddenVariant(),
                    visible: { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};
