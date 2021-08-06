import React, { MutableRefObject, createContext, useContext } from 'react';

export class TabItemRefs {
    public items: MutableRefObject<HTMLElement | null>[] = [];

    public register(ref: MutableRefObject<HTMLElement | null>): number {
        this.items.push(ref);
        return this.items.length - 1;
    }

    public unregister(ref: React.MutableRefObject<HTMLElement | null>) {
        this.items.splice(this.items.indexOf(ref), 1);
    }
}

interface TabsState {
    refs?: TabItemRefs;
    animated: boolean;
}

const initialValue: TabsState = {
    animated: false,
};

export const TabsContext = createContext<TabsState>(initialValue);

export const useTabsContext = () => useContext(TabsContext);
