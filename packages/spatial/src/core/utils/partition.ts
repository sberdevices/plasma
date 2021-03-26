import type { Rect, Partition, Center } from '../types';

function partition(rects: Rect[], targetRect: Rect, straightOverlapThreshold: number): Partition;

function partition(rects: Rect[], targetRect: Center, straightOverlapThreshold: number): Partition;

function partition(rects: Rect[], targetRectOrCenter: Rect | Center, straightOverlapThreshold: number): Partition {
    const groups: Partition = [[], [], [], [], [], [], [], [], []];

    for (const rect of rects) {
        const { center } = rect;
        let x: number;
        let y: number;

        if (center.x < targetRectOrCenter.left) {
            x = 0;
        } else if (center.x <= targetRectOrCenter.right) {
            x = 1;
        } else {
            x = 2;
        }

        if (center.y < targetRectOrCenter.top) {
            y = 0;
        } else if (center.y <= targetRectOrCenter.bottom) {
            y = 1;
        } else {
            y = 2;
        }

        const groupId = y * 3 + x;
        groups[groupId].push(rect);

        if ([0, 2, 6, 8].includes(groupId)) {
            const threshold = straightOverlapThreshold;

            if (rect.left <= targetRectOrCenter.right - targetRectOrCenter.width * threshold) {
                if (groupId === 2) {
                    groups[1].push(rect);
                } else if (groupId === 8) {
                    groups[7].push(rect);
                }
            }

            if (rect.right >= targetRectOrCenter.left + targetRectOrCenter.width * threshold) {
                if (groupId === 0) {
                    groups[1].push(rect);
                } else if (groupId === 6) {
                    groups[7].push(rect);
                }
            }

            if (rect.top <= targetRectOrCenter.bottom - targetRectOrCenter.height * threshold) {
                if (groupId === 6) {
                    groups[3].push(rect);
                } else if (groupId === 8) {
                    groups[5].push(rect);
                }
            }

            if (rect.bottom >= targetRectOrCenter.top + targetRectOrCenter.height * threshold) {
                if (groupId === 0) {
                    groups[3].push(rect);
                } else if (groupId === 2) {
                    groups[5].push(rect);
                }
            }
        }
    }

    return groups;
}

export { partition };
