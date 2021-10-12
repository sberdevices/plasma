import { useEffect, useState, useCallback } from 'react';

/**
 * Метод для форматирования секунд в минуты в формате `SS:SS`
 * @param {number} seconds время в секундах
 * @returns {string} строка времени в минутах
 */
export const formatSecondsToMintues = (seconds: number) =>
    new Date(Math.round(seconds) * 1000).toISOString().substr(11, 8).replace(/^00:/, '');

/**
 * Хук для воспроизведения аудио, возвращает состояние возможности проиграть аудио
 * @param {string} url конечный адрес до файла
 * @param {boolean} isPlaying воспроизводится ли сейчас трек
 * @param {React.MutableRefObject<HTMLAudioElement | undefined>} refAudio ссылка на ref-объект
 * @returns {boolean} возможность воспроизвести трек
 */
export const useAudioPlayer = (
    url: string,
    isPlaying: boolean,
    refAudio: React.MutableRefObject<HTMLAudioElement | undefined>,
) => {
    const [canPlaying, setCanPlaying] = useState(false);

    const canPlay = useCallback(
        function canPlay(this: HTMLAudioElement) {
            refAudio.current = this;
            setCanPlaying(true);
        },
        [refAudio],
    );

    useEffect(() => {
        if (refAudio.current) {
            refAudio.current[isPlaying ? 'play' : 'pause']();
            return;
        }

        const audio = new Audio(url);

        audio.addEventListener('canplaythrough', canPlay);

        return () => {
            audio.addEventListener('canplaythrough', canPlay);
        };
    }, [canPlay, url, refAudio, isPlaying]);

    return [canPlaying];
};
