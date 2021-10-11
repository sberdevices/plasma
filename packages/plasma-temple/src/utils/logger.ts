import React from 'react';

export const logger = <T>(title: string, data: T, color = '#2AC673'): void => {
    if (process.env.NODE_ENV === 'development') {
        const label = `%c${title}`;

        /* eslint-disable no-console */
        console.groupCollapsed(label, `color: ${color}; font-weight: 700;`);
        console.log(data);
        console.groupEnd();
        /* eslint-enable no-console */
    }
};

export const reducerLogger = <S, A>(reducer: React.Reducer<S, A>): React.Reducer<S, A> => (state, action) => {
    if (process.env.NODE_ENV === 'development') {
        logger('Prev state', state, '#DC283A');
        logger('Current action', action, '#EF6B25');
        const nextState = reducer(state, action);

        logger('Next state', nextState);

        return nextState;
    }

    return reducer(state, action);
};
