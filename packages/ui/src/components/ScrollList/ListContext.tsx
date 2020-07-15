import React from 'react';

type ItemRef = React.MutableRefObject<HTMLElement | null>;

export class ListContextController {
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

    public getItem(at: number): ItemRef | null {
        return this.items[at] || null;
    }
}

export const ListContext = React.createContext(new ListContextController());
