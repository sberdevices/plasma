import React from 'react';
import { action } from '@storybook/addon-actions';

/**
 * Storybook action с какой-то задержкой выводит инфу в панель,
 * что заставляет React ругаться на это,
 * ведь там идет отложенное использование объекта Event.
 */
export const actionWithPersistedEvent = (name: string) => {
    const calledAction = action(name);

    return (event: React.SyntheticEvent) => {
        event.persist();
        calledAction(event);
    };
};
