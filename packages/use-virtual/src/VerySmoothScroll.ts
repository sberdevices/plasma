/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { getConfig } from 'api/AndroidAPI';

import { useEffect, useMemo } from 'react';

// const { autoScrollMode = 'smooth' } = getConfig().jsConfig;

type VerySmoothScrollDirection = 'left' | 'right' | 'up' | 'down' | 'none';

type VerySmoothScrollAbsoluteDir = 'vertical' | 'horizontal';

export default class VerySmoothScroll {
    constructor(element?: HTMLElement) {
        this.element = element ?? document.body;
    }

    element: HTMLElement;

    private readonly GOOD_DT = 1000 / 60;

    readonly minVelocity = 0.1;

    readonly maxVelocity = 20;

    readonly native = false;

    private gapX = 0;

    private gapY = 0;

    private rAFId?: number;

    private prevTimestamp?: number;

    private get visibleHeight(): number {
        return this.element === document.scrollingElement ? this.element.clientHeight : this.element.offsetHeight;
    }

    private get visibleWidth(): number {
        return this.element === document.scrollingElement ? this.element.clientWidth : this.element.offsetWidth;
    }

    private get verticalAbsoluteCap(): number {
        return this.element.scrollHeight - this.visibleHeight;
    }

    private get horizontalAbsoluteCap(): number {
        return this.element.scrollWidth - this.visibleWidth;
    }

    private get verticalRelativeCap(): number {
        return this.element.scrollHeight - (this.element.scrollTop + this.visibleHeight);
    }

    private get horizontalRelativeCap(): number {
        return this.element.scrollWidth - (this.element.scrollLeft + this.visibleWidth);
    }

    private ratio(gap: number): number {
        return gap / 2000;
    }

    private velocity(gap: number): number {
        return this.ratio(gap) * this.maxVelocity + this.minVelocity;
    }

    stop(): void {
        if (this.rAFId) {
            window.cancelAnimationFrame(this.rAFId);
        }

        this.rAFId = undefined;
        this.prevTimestamp = undefined;
        this.gapX = 0;
        this.gapY = 0;
    }

    private animate = (timestamp: number): void => {
        // if (autoScrollMode === 'jump') {
        //     this.scrollRelative(this.gapX, this.gapY);
        //     this.stop();

        //     return;
        // }
        // console.log('animate', this.gapX);

        const dT = timestamp - (this.prevTimestamp ?? timestamp - this.GOOD_DT);

        this.prevTimestamp = timestamp;

        let dSX = Math.floor(dT * this.velocity(this.gapX));
        let dSY = Math.floor(dT * this.velocity(this.gapY));

        if (Math.abs(dSX) > Math.abs(this.gapX)) {
            dSX = this.gapX;
        }

        if (Math.abs(dSY) > Math.abs(this.gapY)) {
            dSY = this.gapY;
        }

        this.gapX -= dSX;
        this.gapY -= dSY;

        this.scrollRelative(dSX, dSY);

        if (dSX === 0 && dSY === 0) {
            this.gapX = 0;
            this.gapY = 0;
        }

        if (this.gapX !== 0 || this.gapY !== 0) {
            this.rAFId = window.requestAnimationFrame(this.animate);
        } else {
            this.stop();
        }
    };

    private scrollRelative(x: number, y: number): void {
        this.element.scrollBy(x, y);
    }

    setElement(element: HTMLElement): void {
        if (this.element === document.body) {
            this.element = element;
        }
    }

    go(pixels: number, dir: VerySmoothScrollDirection = 'none'): void {
        if (dir === 'none' || this.element === document.body) {
            return;
        }

        if (this.native) {
            let left = 0;
            let top = 0;

            if (dir === 'down' || dir === 'up') {
                top = dir === 'up' ? -pixels : pixels;
            } else if (dir === 'right' || dir === 'left') {
                left = dir === 'left' ? -pixels : pixels;
            }

            this.element.scrollBy({ top, left, behavior: 'smooth' });

            return;
        }

        switch (dir) {
            case 'up':
                this.gapY = -Math.min(this.element.scrollTop, pixels);
                break;
            case 'down':
                this.gapY = Math.min(this.verticalRelativeCap, pixels);
                break;
            case 'left':
                this.gapX = -Math.min(this.element.scrollLeft, pixels);
                break;
            case 'right':
                this.gapX = Math.min(this.horizontalRelativeCap, pixels);
                break;
            default:
                return;
        }

        if (!this.rAFId) {
            this.rAFId = window.requestAnimationFrame(this.animate);
        }
    }

    goAbsolute(position: number, axis: VerySmoothScrollAbsoluteDir): void {
        if (this.element === document.body) {
            return;
        }

        if (this.native) {
            this.element.scrollTo({
                top: axis === 'vertical' ? position : 0,
                left: axis === 'horizontal' ? position : 0,
                behavior: 'smooth',
            });

            return;
        }

        if (axis === 'vertical') {
            let { gapY } = this;
            const { scrollTop } = this.element;

            gapY = Math.floor(Math.max(position, 0) - scrollTop);

            this.gapY = gapY <= 0 ? Math.max(gapY, -scrollTop) : Math.min(gapY, this.verticalAbsoluteCap);
        } else {
            let { gapX } = this;
            const { scrollLeft } = this.element;

            gapX = Math.floor(Math.max(position, 0) - scrollLeft);

            this.gapX = gapX <= 0 ? Math.max(gapX, -scrollLeft) : Math.min(gapX, this.horizontalAbsoluteCap);
        }

        if (this.gapX === 0 && this.gapY === 0) {
            this.stop();

            return;
        }

        if (!this.rAFId) {
            this.rAFId = window.requestAnimationFrame(this.animate);
        }
    }
}

export const useVerySmoothScroll = (ref?: React.MutableRefObject<HTMLDivElement | null>): VerySmoothScroll => {
    const scroll = useMemo(() => {
        if (typeof window === 'undefined') {
            return () => ({
                setElement: () => undefined,
            });
        }

        return new VerySmoothScroll();
    }, []);

    useEffect(() => {
        if (ref?.current) {
            // @ts-ignore
            scroll.setElement(ref.current);
        }
    });

    // @ts-ignore
    return scroll;
};

export function useVerySmoothWindowScroll(): VerySmoothScroll {
    return useMemo(() => {
        return new VerySmoothScroll(document.scrollingElement as HTMLElement);
    }, []);
}
