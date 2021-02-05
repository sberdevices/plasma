import { Priority, Rect } from '../utils/types';

function prioritize(priorities: Priority[]): Rect[] | null {
    let destPriority = null;
    for (let i = 0; i < priorities.length; i += 1) {
        if (priorities[i].group.length) {
            destPriority = priorities[i];
            break;
        }
    }

    if (!destPriority) {
        return null;
    }

    const destDistance = destPriority.distance;

    destPriority.group.sort((a: any, b: any) => {
        for (let i = 0; i < destDistance.length; i += 1) {
            const distance = destDistance[i];
            const delta = distance(a) - distance(b);
            if (delta) {
                return delta;
            }
        }
        return 0;
    });

    return destPriority.group;
}

export { prioritize };

export default prioritize;
