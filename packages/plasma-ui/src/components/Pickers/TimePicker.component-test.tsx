/* eslint-disable cypress/no-unnecessary-waiting */
import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const noop = () => {};

describe('plasma-ui: TimePicker', () => {
    const TimePicker = getComponent('TimePicker');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <TimePicker
                    value={new Date(1980, 8, 1, 0, 28, 59)}
                    min={new Date(1975, 1, 1, 0, 15, 29)}
                    max={new Date(1985, 10, 30, 12, 30, 30)}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_size', () => {
        const props = {
            value: new Date(1980, 8, 1, 1, 28, 58),
            min: new Date(1975, 1, 1, 0, 15, 29),
            max: new Date(1985, 10, 30, 12, 30, 30),
            infiniteScroll: false,
            visibleItems: 3,
        };

        mount(
            <CypressTestDecorator>
                <TimePicker size="xs" {...props} />
                <TimePicker size="s" {...props} />
                <TimePicker size="l" {...props} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('without infiniteScroll', () => {
        mount(
            <CypressTestDecorator>
                <TimePicker
                    infiniteScroll={false}
                    value={new Date(1980, 8, 1, 0, 28, 59)}
                    min={new Date(1975, 1, 1, 0, 15, 29)}
                    max={new Date(1985, 10, 30, 12, 30, 30)}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('change values by click', () => {
        mount(
            <CypressTestDecorator>
                <TimePicker
                    scrollSnapType="none"
                    step={2}
                    onChange={noop}
                    value={new Date(1980, 8, 1, 0, 28, 59)}
                    min={new Date(1975, 1, 1, 0, 15, 29)}
                    max={new Date(1985, 10, 30, 12, 30, 30)}
                />
            </CypressTestDecorator>,
        );

        // отключение анимаций на всех div'ах внутри окружения, TODO: перенести в plasma-cy-utils?
        cy.get('div').invoke('attr', 'style', 'transition: unset; animation: none; scroll-snap-type: none;');

        cy.get('div > div:nth-child(1)').contains('03').click({ force: true });
        cy.wait(150);
        cy.get('div > div:nth-child(3)').contains('04').click({ force: true });
        cy.wait(150);
        cy.get('div > div:nth-child(5)').contains('06').click({ force: true });

        cy.wait(1000);

        cy.matchImageSnapshot();
    });

    it('should error', () => {
        mount(
            <CypressTestDecorator>
                <TimePicker
                    scrollSnapType="none"
                    step={9}
                    onChange={noop}
                    value={new Date(1980, 8, 1, 0, 28, 25)}
                    max={new Date(1975, 1, 1, 0, 15, 29)}
                    min={new Date(1985, 10, 30, 12, 30, 30)}
                />
            </CypressTestDecorator>,
        );

        cy.on('fail', (err) => {
            const errorMessage = err.toString().match(/Passed value/);
            if (errorMessage?.length) {
                expect('Passed value').to.equal(errorMessage[0]);
                return false;
            }
        });
    });
});

describe('plasma-ui: TimePicker update value', () => {
    const TimePicker = getComponent('TimePicker');
    const Button = getComponent('Button');

    function Demo({ value }: { value: Date }) {
        const [state, setState] = React.useState(new Date(1980, 8, 1, 0, 28, 25));

        const onClick = React.useCallback(() => {
            setState(value);
        }, [value]);

        return (
            <>
                <TimePicker
                    scrollSnapType="none"
                    step={1}
                    onChange={noop}
                    value={state}
                    min={new Date(1975, 1, 1, 0, 15, 29)}
                    max={new Date(1985, 10, 30, 12, 30, 30)}
                />
                <Button onClick={onClick}>Изменить значение</Button>
            </>
        );
    }

    it('change values', () => {
        mount(
            <CypressTestDecorator>
                <Demo value={new Date(1980, 8, 1, 3, 30, 35)} />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('change values with max', () => {
        mount(
            <CypressTestDecorator>
                <Demo value={new Date(1980, 8, 1, 12, 30, 25)} />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('change values with min', () => {
        mount(
            <CypressTestDecorator>
                <Demo value={new Date(1980, 8, 1, 0, 15, 25)} />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('with controls', () => {
        mount(
            <CypressTestDecorator>
                <TimePicker
                    value={new Date(1980, 8, 1, 0, 28, 59)}
                    min={new Date(1975, 1, 1, 0, 15, 29)}
                    max={new Date(1985, 10, 30, 12, 30, 30)}
                    controls
                    autofocus
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('with single item', () => {
        mount(
            <CypressTestDecorator>
                <>
                    <TimePicker
                        value={new Date(1980, 8, 1, 0, 28, 59)}
                        min={new Date(1975, 1, 1, 0, 15, 29)}
                        max={new Date(1985, 10, 30, 0, 30, 30)}
                        controls
                    />
                    <TimePicker
                        value={new Date(1980, 8, 1, 0, 28, 59)}
                        min={new Date(1975, 1, 1, 0, 28, 59)}
                        max={new Date(1985, 10, 30, 0, 28, 59)}
                        visibleItems={3}
                        controls
                    />
                </>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
