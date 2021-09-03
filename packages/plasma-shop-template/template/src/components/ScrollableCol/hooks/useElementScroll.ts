import React from 'react';
import { RemoteKey, useRemoteListener, useThrottledCallback } from '@sberdevices/plasma-temple';

interface NavigationEvent extends Event {
    target: HTMLElement;
    detail: { dir: 'up' | 'down' | 'left' | 'right' };
}

const scrollOffset = 600;

export const useElementScroll = () => {
    const elementRef = React.useRef<HTMLDivElement>(null);

    const remoteListenerHandler = useThrottledCallback(
        (key: RemoteKey) => {
            const element = elementRef.current;

            if (!element || !element.contains(document.activeElement)) {
                return;
            }

            switch (key) {
                case 'LONG_DOWN':
                    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
                    break;
                case 'DOWN':
                    element.scrollTo({ top: element.scrollTop + scrollOffset, behavior: 'smooth' });
                    break;
                case 'UP':
                    element.scrollTo({ top: element.scrollTop - scrollOffset, behavior: 'smooth' });
                    break;
                case 'LONG_UP':
                    element.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                default:
            }
        },
        [],
        350,
    );

    useRemoteListener(remoteListenerHandler, {});

    React.useEffect(() => {
        const spatNavHandler = (evt: Event) => {
            const { detail, target } = evt as NavigationEvent;

            if (
                elementRef.current &&
                ['up', 'down'].includes(detail.dir) &&
                elementRef.current.scrollTop > elementRef.current.offsetTop
            ) {
                evt.stopPropagation();
                evt.preventDefault();

                if (
                    elementRef.current?.contains(target as HTMLElement) &&
                    /*
                        При верртикальном скролле устанавливаем фокус на элемент контейнера,
                        только если ранее он не был установлен
                    */
                    !elementRef.current.contains(document.activeElement)
                ) {
                    target.focus({ preventScroll: true });
                }
            }
        };

        document.body.addEventListener('navbeforefocus', spatNavHandler);

        return () => {
            document.body.removeEventListener('navbeforefocus', spatNavHandler);
        };
    }, []);

    return elementRef;
};
