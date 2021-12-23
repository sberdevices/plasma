import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import { Headline1 } from '@sberdevices/plasma-core';
import { IconEdit } from '@sberdevices/plasma-icons';

const paste = (selector: string, text: string) => {
    // https://github.com/cypress-io/cypress/issues/2386#issuecomment-613374266
    cy.get(selector)
        .first()
        .then(($destination) => {
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
            const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
                clipboardData: {
                    getData: () => text,
                },
            });
            $destination[0].dispatchEvent(pasteEvent);
        });
};

const noop = () => {};

describe('plasma-b2c: Editable', () => {
    const Editable = getComponent('Editable');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Editable value="Пример текста" textComponent={Headline1} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('empty', () => {
        mount(
            <CypressTestDecorator>
                <Editable textComponent={Headline1} icon={<IconEdit size="s" color="inherit" />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('onChange', () => {
        mount(
            <CypressTestDecorator>
                <Editable value="onChange" onChange={noop} maxLength={5} textComponent={Headline1} />
            </CypressTestDecorator>,
        );

        cy.get('span > div').first().type('Hello');

        cy.get('span > div').first().type('Hello world');

        cy.matchImageSnapshot();
    });

    it('onBlur and onFocus', () => {
        mount(
            <CypressTestDecorator>
                <Editable
                    value="onBlur and onFocus"
                    onBlur={noop}
                    icon={<IconEdit size="s" color="inherit" />}
                    textComponent={Headline1}
                />
            </CypressTestDecorator>,
        );

        cy.get('span > span').click();

        cy.get('span > div').first().blur();

        // для случаев, если не поддерживаются современные интерфейсы window
        cy.window().then((win) => {
            // callsFake не работает с данным методом
            cy.stub(win, 'getSelection', undefined);

            // для браузеров IE < 9 при использовании компонента
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (win.document as any).selection = {
                empty: noop,
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (win.document.body as any).createTextRange = () => ({
                moveToElementText: noop,
                select: noop,
            });
        });

        cy.get('span > div').first().focus();

        cy.get('span > div').first().trigger('keydown', { keyCode: 13 });

        cy.matchImageSnapshot();
    });

    it('onPaste', () => {
        mount(
            <CypressTestDecorator>
                <Editable value="onPaste" onPaste={noop} textComponent={Headline1} />
            </CypressTestDecorator>,
        );

        paste('span > div', 'Hello from paste');

        // для случаев, если не поддерживаются современные интерфейсы window
        cy.window().then((win) => {
            cy.stub(win.document, 'queryCommandSupported').callsFake(() => false);
            cy.stub(navigator.clipboard, 'writeText').callsFake(undefined);

            paste('span > div', 'Hello from paste');
        });

        cy.matchImageSnapshot();
    });
});
