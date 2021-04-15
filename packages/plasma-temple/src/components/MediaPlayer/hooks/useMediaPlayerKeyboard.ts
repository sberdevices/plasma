import { useEffect } from 'react';

const OK_KEY = 'Enter';

export const useMediaPlayerKeyboard = (
    playback: () => void,
    controlsHidden: boolean,
    cb?: (event: KeyboardEvent) => void,
): void => {
    useEffect(() => {
        const keydownHandler = (event: KeyboardEvent) => {
            if (event.key === OK_KEY) {
                event.preventDefault();

                if (controlsHidden) {
                    playback();
                } else {
                    document.activeElement?.click();
                }
            }

            cb?.(event);
        };

        document.addEventListener('keydown', keydownHandler);

        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [playback, controlsHidden, cb]);
};
