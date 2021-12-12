import React from 'react';
import styled from 'styled-components';
import { mount, CypressTestDecorator, getComponent, withNoAnimation } from '@sberdevices/plasma-cy-utils';

describe('plasma-ui: Marquee', () => {
    const Marquee = withNoAnimation(getComponent('Marquee'));

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Marquee>Очень очень длинный текст бегущей строки Такой что не влезает прям никуда!!</Marquee>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_textAlign', () => {
        mount(
            <CypressTestDecorator>
                <Marquee textAlign="start">Не очень очень длинный текст !!</Marquee>
                <Marquee textAlign="center">Не очень очень длинный текст !!</Marquee>
                <Marquee textAlign="end">Не очень очень длинный текст !!</Marquee>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
