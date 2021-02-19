import React from 'react';

import { Route } from '../types';

export const useHistoryUpdater = (currentStateItem: Route): void =>
    React.useEffect(() => {
        if (currentStateItem) {
            window.history.pushState(currentStateItem, currentStateItem.type.toLowerCase());
        }
    }, [currentStateItem]);
