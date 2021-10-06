import { useEffect, useState, useCallback } from 'react';

export const formatSecondsToMintues = (seconds: number) =>
    new Date(Math.round(seconds) * 1000).toISOString().substr(11, 8).replace(/^00:/, '');

export const useAudioPlayer = (
    url: string,
    isPlaying: boolean,
    ref: React.MutableRefObject<HTMLAudioElement | undefined>,
) => {
    const [canPlaying, setCanPlaying] = useState(false);

    const canPlay = useCallback(
        function canPlay(this: HTMLAudioElement) {
            ref.current = this;
            setCanPlaying(true);
        },
        [ref, setCanPlaying],
    );

    useEffect(() => {
        if (ref.current) {
            ref.current[isPlaying ? 'play' : 'pause']();
            return;
        }

        const audio = new Audio(url);

        audio.addEventListener('canplaythrough', canPlay);

        return () => {
            audio.addEventListener('canplaythrough', canPlay);
        };
    }, [canPlay, url, ref, isPlaying]);

    return [canPlaying];
};
