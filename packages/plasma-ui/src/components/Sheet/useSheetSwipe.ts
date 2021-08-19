import React from 'react';

export const useSheetSwipe = (args: {
    contentWrapperRef: React.RefObject<HTMLDivElement>;
    handleRef: React.RefObject<HTMLDivElement>;
    onClose: () => void;
}) => {
    const { contentWrapperRef, handleRef, onClose } = args;

    React.useEffect(() => {
        if (!handleRef.current || !contentWrapperRef.current) {
            return;
        }
        const handleEl = handleRef.current;
        const contentWrapperEl = contentWrapperRef.current;

        const curtainHeight = contentWrapperEl.offsetHeight;

        let startY: number;
        let currentY: number;

        const onTouchStart = (event: TouchEvent) => {
            startY = event.changedTouches[0].clientY;
            currentY = startY;
            contentWrapperEl.style.transition = 'none';
        };

        const onTouchMove = (event: TouchEvent) => {
            const { clientY } = event.changedTouches[0];
            currentY = Math.max(startY, clientY);
            contentWrapperEl.style.transform = `translateY(${currentY - startY}px)`;
        };

        const onTouchEnd = (event: TouchEvent) => {
            const endY = event.changedTouches[0].clientY;
            const offsetY = endY - startY;

            contentWrapperEl.style.transform = '';
            contentWrapperEl.style.transition = '';

            if (offsetY / curtainHeight > 0.2) {
                onClose();
            }
        };

        handleEl.addEventListener('touchstart', onTouchStart);
        handleEl.addEventListener('touchmove', onTouchMove);
        handleEl.addEventListener('touchend', onTouchEnd);

        return () => {
            handleEl.removeEventListener('touchstart', onTouchStart);
            handleEl.removeEventListener('touchmove', onTouchMove);
            handleEl.removeEventListener('touchend', onTouchEnd);
        };
    }, []);
};
