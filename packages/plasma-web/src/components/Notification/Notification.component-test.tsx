import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Notification', () => {
    const NotificationsProvider = getComponent('NotificationsProvider');
    const addNotification = getComponent('addNotification');
    const Button = getComponent('Button');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <NotificationsProvider>
                    <Button
                        text="Показать оповещение"
                        onClick={() =>
                            addNotification(
                                {
                                    status: 'warning',
                                    title: 'Входящий вызов',
                                    children: 'Magic starts here!',
                                },
                                8000,
                            )
                        }
                    />
                </NotificationsProvider>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.get('button').click().click();

        cy.matchImageSnapshot();
    });
});
