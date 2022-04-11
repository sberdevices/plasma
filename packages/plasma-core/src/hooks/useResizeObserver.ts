import { useEffect } from 'react';

/**
 * Отслеживает изменение размеров переданного элемента
 * @param {React.Ref<T>} ref - реф элемента, за которым нужно следить
 * @callback callback - функция, которая вызывается при изменении элемента
 * @param {Element} element - элемент, размер которого изменился
 */
export const useResizeObserver = <T extends HTMLElement>(
    ref: React.MutableRefObject<T | null>,
    callback: (element: T) => void,
) => {
    useEffect(() => {
        /* istanbul ignore if: убираем проверку на рефы из покрытия */
        if (!ref?.current) {
            return;
        }

        const { current } = ref;

        const resizeObserver = new window.ResizeObserver(() => callback(current));

        resizeObserver.observe(ref.current);

        return () => {
            /* istanbul ignore if: убираем проверку на рефы из покрытия */
            if (!ref?.current) {
                return;
            }

            resizeObserver.unobserve(ref.current);
        };
    }, [ref]);
};
