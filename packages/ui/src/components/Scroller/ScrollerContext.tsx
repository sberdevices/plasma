import React from 'react';

type ItemRef = React.MutableRefObject<HTMLDivElement | undefined>;

export interface ScrollerContextProps {
    register(item: ItemRef): number;
    unregister(item: ItemRef): void;
    getItem(at: number): ItemRef | undefined;
}

export class ScrollerContextData implements ScrollerContextProps {
    private items: ItemRef[];

    constructor() {
        this.items = [];
    }

    public register(ref: ItemRef): number {
        return this.items.push(ref) - 1;
    }

    public unregister(ref: ItemRef) {
        this.items.splice(this.items.indexOf(ref), 1);
    }

    public getItem(index: number): ItemRef | undefined {
        return this.items[index];
    }
}

const ScrollerContext = React.createContext<ScrollerContextProps>(new ScrollerContextData());

export default ScrollerContext;
