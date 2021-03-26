import { getRect } from 'core/utils/getRect';
import { generateDistanceFunctions } from 'core/utils/generateDistanceFunctions';
import { partition } from 'core/utils/partition';
import { prioritize } from 'core/utils/prioritize';
import type { Rect, Priority, Config } from 'core/types';

export function navigate(
    target: HTMLElement,
    direction: string,
    candidates: HTMLElement[],
    config: Config,
): HTMLElement | null {
    if (!target || !direction || !candidates || !candidates.length) {
        return null;
    }

    const rects: Rect[] = [];

    for (const candidate of candidates) {
        const rect = getRect(candidate);
        if (rect) {
            rects.push(rect);
        }
    }
    if (!rects.length) {
        return null;
    }

    const targetRect = getRect(target);
    if (!targetRect) {
        return null;
    }

    const distanceFunction = generateDistanceFunctions(targetRect);

    const groups = partition(rects, targetRect, config.straightOverlapThreshold);

    const internalGroups = partition(groups[4], targetRect.center, config.straightOverlapThreshold);

    let priorities: Priority[];

    switch (direction) {
        case 'left':
            priorities = [
                {
                    group: internalGroups[0].concat(internalGroups[3]).concat(internalGroups[6]),
                    distance: [
                        distanceFunction.nearPlumbLineIsBetter.bind(null),
                        distanceFunction.topIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[3],
                    distance: [
                        distanceFunction.nearPlumbLineIsBetter.bind(null),
                        distanceFunction.topIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[0].concat(groups[6]),
                    distance: [
                        distanceFunction.nearHorizonIsBetter.bind(null),
                        distanceFunction.rightIsBetter.bind(null),
                        distanceFunction.nearTargetTopIsBetter.bind(null),
                    ],
                },
            ];
            break;
        case 'right':
            priorities = [
                {
                    group: internalGroups[2].concat(internalGroups[5]).concat(internalGroups[8]),
                    distance: [
                        distanceFunction.nearPlumbLineIsBetter.bind(null),
                        distanceFunction.topIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[5],
                    distance: [
                        distanceFunction.nearPlumbLineIsBetter.bind(null),
                        distanceFunction.topIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[2].concat(groups[8]),
                    distance: [
                        distanceFunction.nearHorizonIsBetter.bind(null),
                        distanceFunction.leftIsBetter.bind(null),
                        distanceFunction.nearTargetTopIsBetter.bind(null),
                    ],
                },
            ];
            break;
        case 'up':
            priorities = [
                {
                    group: internalGroups[0].concat(internalGroups[1]).concat(internalGroups[2]),
                    distance: [
                        distanceFunction.nearHorizonIsBetter.bind(null),
                        distanceFunction.leftIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[1],
                    distance: [
                        distanceFunction.nearHorizonIsBetter.bind(null),
                        distanceFunction.leftIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[0].concat(groups[2]),
                    distance: [
                        distanceFunction.nearPlumbLineIsBetter.bind(null),
                        distanceFunction.bottomIsBetter.bind(null),
                        distanceFunction.nearTargetLeftIsBetter.bind(null),
                    ],
                },
            ];
            break;
        case 'down':
            priorities = [
                {
                    group: internalGroups[6].concat(internalGroups[7]).concat(internalGroups[8]),
                    distance: [
                        distanceFunction.nearHorizonIsBetter.bind(null),
                        distanceFunction.leftIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[7],
                    distance: [
                        distanceFunction.nearHorizonIsBetter.bind(null),
                        distanceFunction.leftIsBetter.bind(null),
                    ],
                },
                {
                    group: groups[6].concat(groups[8]),
                    distance: [
                        distanceFunction.nearPlumbLineIsBetter.bind(null),
                        distanceFunction.topIsBetter.bind(null),
                        distanceFunction.nearTargetLeftIsBetter.bind(null),
                    ],
                },
            ];
            break;
        default:
            return null;
    }

    if (config.straightOnly) {
        priorities.pop();
    }

    const destGroups = prioritize(priorities);
    if (!destGroups) {
        return null;
    }

    let dest = null;
    if (
        config.rememberSource &&
        config.previous &&
        config.previous.destination === target &&
        config.previous.reverse === direction
    ) {
        for (const destGroup of destGroups) {
            if (destGroup.element === config.previous.target) {
                dest = destGroup.element;
                break;
            }
        }
    }

    if (!dest) {
        dest = destGroups[0].element;
    }

    return dest;
}
