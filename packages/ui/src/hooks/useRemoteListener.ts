import { useEffect, useRef } from 'react';

type ShortKey = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'OK';
type LongKey = 'LONG_UP' | 'LONG_DOWN' | 'LONG_LEFT' | 'LONG_RIGHT' | 'LONG_OK';
export type RemoteKey = ShortKey | LongKey;

const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];

/**
 * Создает слушателя событий клавиатуры,
 * который вызывает коллбек при нажатии кнопок навигации.
 * @param {Function} cb
 * @return {void}
 */
export const useRemoteListener = (cb: (key: RemoteKey, event: KeyboardEvent) => void) => {
    const keydown = useRef(false);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent): void => {
            if (navKeys.indexOf(event.key) === -1) {
                return;
            }
            switch (event.key) {
                case 'ArrowUp':
                    cb(keydown.current ? 'LONG_UP' : 'UP', event);
                    break;
                case 'ArrowDown':
                    cb(keydown.current ? 'LONG_DOWN' : 'DOWN', event);
                    break;
                case 'ArrowLeft':
                    cb(keydown.current ? 'LONG_LEFT' : 'LEFT', event);
                    break;
                case 'ArrowRight':
                    cb(keydown.current ? 'LONG_RIGHT' : 'RIGHT', event);
                    break;
                case 'Enter':
                    cb(keydown.current ? 'LONG_OK' : 'OK', event);
                    break;
                default:
                    break;
            }
            keydown.current = true;
        };
        const handleKeyup = (event: KeyboardEvent): void => {
            if (navKeys.indexOf(event.key) === -1) {
                return;
            }
            keydown.current = false;
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, [cb]);
};
