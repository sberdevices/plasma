import React from 'react';
import { StoreContext } from 'storeon/react';

import { notificationsStore } from './notificationsStore';
import { NotificationsController } from './NotificationsController';

export const NotificationsProvider: React.FC = ({ children }) => {
    return (
        <StoreContext.Provider value={notificationsStore}>
            {children}
            <NotificationsController />
        </StoreContext.Provider>
    );
};
