import { useEffect, useRef } from 'react';

type ShortKey = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'OK';
type LongKey = 'LONG_UP' | 'LONG_DOWN' | 'LONG_LEFT' | 'LONG_RIGHT' | 'LONG_OK';
export type RemoteKey = ShortKey | LongKey;

const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];

/**
 * Создает слушателя событий клавиатуры,
 * который вызывает коллбек при нажатии кнопок навигации.
 * @param {Function} cb
 * @param {number} keypressTimeMs
 * @return {void}
 */
export const useRemoteListener = (cb: (key: RemoteKey, event: KeyboardEvent) => void, keypressTimeMs = 150) => {
    const keydown = useRef<number | null>(null);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent): void => {
            if (navKeys.indexOf(event.key) === -1) {
                return;
            }

            const isLong = keydown.current && Date.now() - keydown.current < keypressTimeMs;

            switch (event.key) {
                case 'ArrowUp':
                    cb(isLong ? 'LONG_UP' : 'UP', event);
                    break;
                case 'ArrowDown':
                    cb(isLong ? 'LONG_DOWN' : 'DOWN', event);
                    break;
                case 'ArrowLeft':
                    cb(isLong ? 'LONG_LEFT' : 'LEFT', event);
                    break;
                case 'ArrowRight':
                    cb(isLong ? 'LONG_RIGHT' : 'RIGHT', event);
                    break;
                case 'Enter':
                    cb(isLong ? 'LONG_OK' : 'OK', event);
                    break;
                default:
                    break;
            }
            keydown.current = Date.now();
        };
        const handleKeyup = (event: KeyboardEvent): void => {
            if (navKeys.indexOf(event.key) === -1) {
                return;
            }
            keydown.current = null;
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, [cb]);
};
