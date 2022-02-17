import { useEffect, useRef, useState, StateUpdater } from 'preact/compat';

export const useInView = (
    { root = null, threshold = 0 }: IntersectionObserverInit,
    cb: () => void,
): [StateUpdater<Element>] => {
    const [node, setNode] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cb();
                    observer.current.disconnect();
                }
            },
            { root, threshold },
        );

        if (node) {
            observer.current.observe(node);
        }

        return () => {
            observer.current.disconnect();
        };
    }, [node, root, threshold, cb]);

    return [setNode];
};
