import { useEffect } from 'react';

export type RemoteKey = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'OK';

/**
 * Создает слушателя событий клавиатуры,
 * который вызывает коллбек при нажатии кнопок навигации.
 * @param {Function} cb
 * @return {void}
 */
export const useRemoteListener = (cb: (key: RemoteKey, event: KeyboardEvent) => void) => {
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent): void => {
            switch (event.key) {
                case 'ArrowUp':
                    cb('UP', event);
                    break;
                case 'ArrowDown':
                    cb('DOWN', event);
                    break;
                case 'ArrowLeft':
                    cb('LEFT', event);
                    break;
                case 'ArrowRight':
                    cb('RIGHT', event);
                    break;
                case 'Enter':
                    cb('OK', event);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [cb]);
};
