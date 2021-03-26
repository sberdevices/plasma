import type { Priority, Rect } from '../types';

export function prioritize(priorities: Priority[]): Rect[] | null {
    let destPriority = null;
    for (const priority of priorities) {
        if (priority.group.length) {
            destPriority = priority;
            break;
        }
    }

    if (!destPriority) {
        return null;
    }

    const destDistance = destPriority.distance;

    destPriority.group.sort((a, b) => {
        for (const distance of destDistance) {
            const delta = distance(a) - distance(b);
            if (delta) {
                return delta;
            }
        }
        return 0;
    });

    return destPriority.group;
}
