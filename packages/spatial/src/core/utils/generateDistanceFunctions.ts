import type { Rect, DistanceFunctions } from '../types';

export function generateDistanceFunctions(targetRect: Rect): DistanceFunctions {
    return {
        nearPlumbLineIsBetter(rect: Rect) {
            let d;
            if (rect.center.x < targetRect.center.x) {
                d = targetRect.center.x - rect.right;
            } else {
                d = rect.left - targetRect.center.x;
            }
            return d < 0 ? 0 : d;
        },
        nearHorizonIsBetter(rect: Rect) {
            let d;
            if (rect.center.y < targetRect.center.y) {
                d = targetRect.center.y - rect.bottom;
            } else {
                d = rect.top - targetRect.center.y;
            }
            return d < 0 ? 0 : d;
        },
        nearTargetLeftIsBetter(rect: Rect) {
            let d;
            if (rect.center.x < targetRect.center.x) {
                d = targetRect.left - rect.right;
            } else {
                d = rect.left - targetRect.left;
            }
            return d < 0 ? 0 : d;
        },
        nearTargetTopIsBetter(rect: Rect) {
            let d;
            if (rect.center.y < targetRect.center.y) {
                d = targetRect.top - rect.bottom;
            } else {
                d = rect.top - targetRect.top;
            }
            return d < 0 ? 0 : d;
        },
        topIsBetter(rect: Rect) {
            return rect.top;
        },
        bottomIsBetter(rect: Rect) {
            return -1 * rect.bottom;
        },
        leftIsBetter(rect: Rect) {
            return rect.left;
        },
        rightIsBetter(rect: Rect) {
            return -1 * rect.right;
        },
    };
}
