import React, { useState } from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

import { SheetProps } from './Sheet';

describe('plasma-ui: Sheet', () => {
    const Sheet = getComponent('Sheet');
    const Body1 = getComponent('Body1');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Sheet isOpen>
                    <Body1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae tempore vitae porro laboriosam
                        consectetur fugiat assumenda, earum nesciunt. Distinctio minima nesciunt dicta rem quae vel
                        illum ea fugit molestiae dolorem? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                        nostrum placeat, neque repudiandae consectetur voluptates soluta et sint eum obcaecati nesciunt
                        ullam, dolorem labore quaerat vero maxime ab ipsa nihil.
                    </Body1>
                </Sheet>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    const Interactive = ({ withOverlay }: Pick<SheetProps, 'withOverlay'>) => {
        const [open, setOpen] = useState(true);

        return (
            <>
                <div>Content</div>
                <Sheet id="sheet" isOpen={open} withOverlay={withOverlay} onClose={() => setOpen(false)}>
                    <Body1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae tempore vitae porro laboriosam
                        consectetur fugiat assumenda, earum nesciunt. Distinctio minima nesciunt dicta rem quae vel
                        illum ea fugit molestiae dolorem? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                        nostrum placeat, neque repudiandae consectetur voluptates soluta et sint eum obcaecati nesciunt
                        ullam, dolorem labore quaerat vero maxime ab ipsa nihil.
                    </Body1>
                </Sheet>
            </>
        );
    };

    it('onClose', () => {
        mount(
            <CypressTestDecorator>
                <Interactive />
            </CypressTestDecorator>,
        );

        cy.root().click();

        cy.matchImageSnapshot();
    });

    it('onTouchMove', () => {
        cy.viewport('iphone-6');

        mount(
            <CypressTestDecorator>
                <Interactive />
            </CypressTestDecorator>,
        );

        const touchEvent = ({ clientX, clientY }) => ({
            changedTouches: {
                0: {
                    clientX,
                    clientY,
                },
            },
        });

        // Handle
        cy.get('#sheet > div > div:first-child')
            .trigger('touchstart', touchEvent({ clientX: 180, clientY: 409 }))
            .trigger('touchmove', touchEvent({ clientX: 180, clientY: 420 }))
            .trigger('touchmove', touchEvent({ clientX: 180, clientY: 450 }))
            .trigger('touchend', touchEvent({ clientX: 180, clientY: 450 }));

        cy.matchImageSnapshot(':opened');

        cy.get('#sheet > div > div:first-child')
            .trigger('touchstart', touchEvent({ clientX: 180, clientY: 409 }))
            .trigger('touchmove', touchEvent({ clientX: 180, clientY: 450 }))
            .trigger('touchmove', touchEvent({ clientX: 180, clientY: 500 }))
            .trigger('touchend', touchEvent({ clientX: 180, clientY: 500 }));

        cy.matchImageSnapshot(':closed');
    });

    it('withoutOverlay', () => {
        cy.viewport('iphone-6');

        mount(
            <CypressTestDecorator>
                <Interactive withOverlay={false} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
