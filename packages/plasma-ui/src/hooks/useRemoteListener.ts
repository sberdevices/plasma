import { useEffect, useRef } from 'react';

type ShortKey = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'OK';
type LongKey = 'LONG_UP' | 'LONG_DOWN' | 'LONG_LEFT' | 'LONG_RIGHT' | 'LONG_OK';
type JumpKey = 'PAGE_UP' | 'PAGE_DOWN' | 'HOME' | 'END';
export type RemoteKey = ShortKey | LongKey | JumpKey;

const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'PageUp', 'PageDown', 'Home', 'End'];

const getRemoteKey = (key: string, isLong: boolean): RemoteKey | undefined => {
    switch (key) {
        case 'ArrowUp':
            return isLong ? 'LONG_UP' : 'UP';
        case 'ArrowDown':
            return isLong ? 'LONG_DOWN' : 'DOWN';
        case 'ArrowLeft':
            return isLong ? 'LONG_LEFT' : 'LEFT';
        case 'ArrowRight':
            return isLong ? 'LONG_RIGHT' : 'RIGHT';
        case 'Enter':
            return isLong ? 'LONG_OK' : 'OK';
        case 'PageUp':
            return 'PAGE_UP';
        case 'PageDown':
            return 'PAGE_DOWN';
        case 'Home':
            return 'HOME';
        case 'End':
            return 'END';
        default:
            return undefined;
    }
};

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
            const isLong = Boolean(keydown.current && Date.now() - keydown.current < keypressTimeMs);
            const remoteKey = getRemoteKey(event.key, isLong);

            if (!remoteKey) {
                return;
            }

            cb(remoteKey, event);
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
