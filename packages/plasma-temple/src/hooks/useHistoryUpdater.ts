import React from 'react';
import { CurrentHistory } from '../store/reducer';

export const useHistoryUpdater = (currentStateItem: CurrentHistory): void =>
    React.useEffect(() => {
        if (!currentStateItem) {
            return;
        }

        const title = currentStateItem.type.toLowerCase();

        if (currentStateItem.type === window.history.state?.type) {
            window.history.replaceState(currentStateItem, title);
        } else {
            window.history.pushState(currentStateItem, title);
        }
    }, [currentStateItem]);
