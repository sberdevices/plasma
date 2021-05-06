import React from 'react';

/**
 * Хранилище модальных окон.
 */
class ModalsController {
    public items: string[] = [];

    public register(ref: string) {
        return this.items.push(ref);
    }

    public unregister(ref: string) {
        this.items.splice(this.items.indexOf(ref), 1);
    }
}

const initialState = new ModalsController();

export const ModalsContext = React.createContext(initialState);

export const ModalsProvider: React.FC = ({ children }) => {
    return <ModalsContext.Provider value={initialState}>{children}</ModalsContext.Provider>;
};
