import { useEffect } from 'react';

import { throttleByFrames } from './helpers';

/**
 * Всегда "тротлим" нажатие на клавиатуру.
 * Акутально для случаев когда пользователь зажимает клавишу.
 * Не имеет смысла делать рендер на каждый кадр,
 * так как пользователь не успеет осознать инфорацию при зажатой клавише.
 * Привязываемся к requestAnimationFrame, чтобы учитывать скорость
 * отрисовки на девайсе пользователя.
 * По дефолту - 12 (~200ms), если 60FPS.
 */

export const useKeyboard = ({
    up,
    down,
    horizontal,
    framesToThrottle = 12,
}: {
    up: () => void;
    down: () => void;
    horizontal: boolean;
    framesToThrottle?: number;
}) => {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (horizontal) {
                switch (event.key) {
                    case 'ArrowLeft':
                        down();
                        break;
                    case 'ArrowRight':
                        up();
                        break;
                    default:
                        break;
                }
            } else {
                switch (event.key) {
                    case 'ArrowUp':
                        // TODO: rename down up
                        down();
                        break;
                    case 'ArrowDown':
                        up();
                        break;
                    default:
                        break;
                }
            }
        };

        const throttledHandler = throttleByFrames(handler, framesToThrottle);

        window.addEventListener('keydown', throttledHandler);

        return () => {
            window.removeEventListener('keydown', throttledHandler);
        };
    }, [horizontal, down, up, framesToThrottle]);
};
