import { useCallback, useState, useEffect } from 'react';
import { Drawer } from '../Drawer/Drawer';

/**
 * A custom React hook that manages the state and behavior for the Home component.
 * It handles navigation, interaction, and the background effects.
 * 
 * @returns {Object} The state values and functions necessary to interface with {@link HomeComponent}.
 */
export const Home = () => {
    const { isDrawerOpen, toggleDrawer } = Drawer();

    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleBackgroundClick = () => {
        if (isDrawerOpen) {
            toggleDrawer();
        }
    };

    const calculateImages = useCallback(() => {
        const numImages = 20;
        return Array.from({ length: numImages }, (_, i) => ({
            id: i,
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            speed: Math.random() * 2 + 1,
            direction: Math.random() > 0.5 ? 1 : -1,
            opacity: 1,
        }));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [images, setImages] = useState(calculateImages());

    useEffect(() => {
        setImages(calculateImages());
    }, [viewportSize, calculateImages]);

    useEffect(() => {
        const updateImages = () => {
            setImages((images) =>
                images.map((image) => {
                    let newLeft = image.left + image.speed * image.direction;

                    // Reverse direction if it hits the edge
                    if (newLeft <= 0 || newLeft >= window.innerWidth) {
                        image.direction *= -1;
                        newLeft = image.left + image.speed * image.direction;
                    }

                    return {
                        ...image,
                        left: newLeft,
                        top: Math.random() * window.innerHeight,
                        opacity: Math.random(),
                    };
                })
            );
        };

        const intervalId = setInterval(updateImages, 10000);

        return () => clearInterval(intervalId);
    }, [calculateImages]);

    return { images, isDrawerOpen, toggleDrawer, handleBackgroundClick };
};
