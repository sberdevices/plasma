import { Axis } from '../types';

export function scroll<T extends Window | Element>({
    element,
    offset,
    startPosition = 0,
    duration = 400,
    axis = 'x',
}: {
    element: T;
    offset: number;
    startPosition?: number;
    duration?: number;
    axis?: Axis;
}) {
    let start = 0;
    const scrollStart = startPosition;
    const direction = {
        x: 'left',
        y: 'top',
    }[axis];

    requestAnimationFrame(function animate(timestamp) {
        if (start === 0) {
            start = timestamp;
        }

        let timeFraction = (timestamp - start) / duration;

        if (timeFraction > 1) {
            timeFraction = 1;
        }

        const diff = Math.ceil(offset * timeFraction);

        element.scrollTo({
            [direction]: scrollStart + diff,
        });

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}
