import { Rect } from '../../src/utils/types';

function getRect(element: HTMLElement): Rect {
    const { left, top, right, bottom, width, height } = element.getBoundingClientRect();
    const x = left + Math.floor(width / 2);
    const y = top + Math.floor(height / 2);
    const rect: Rect = {
        left,
        top,
        right,
        bottom,
        width,
        height,
        element,
        center: { x, y, left: x, right: x, top: y, bottom: y, width: 0, height: 0 },
    };

    return rect;
}

export { getRect };

export default getRect;
