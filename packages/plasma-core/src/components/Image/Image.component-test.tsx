import React, { Fragment } from 'react';
import styled from 'styled-components';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

const src = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';

describe('plasma-core: Image', () => {
    const Image = getComponent('Image');

    const Why = styled.div`
        width: 8rem;
        display: inline-block;
    `;

    beforeEach(() => {
        cy.intercept(src, (req) => {
            req.reply({
                fixture: 'images/320_320_0.jpg',
            });
        });
    });

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <Image src={src} width="320px" height="320px" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('div', () => {
        mount(
            <CypressTestDecorator>
                <Image base="div" src={src} width="320px" height="320px" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_ratio', () => {
        const ratios = Object.keys({
            '1 / 1': '100',
            '1/1': '100',
            '3 / 4': '133.3333',
            '3/4': '133.3333',
            '4 / 3': '75',
            '4/3': '75',
            '9 / 16': '177.7778',
            '9/16': '177.7778',
            '16 / 9': '56.25',
            '16/9': '56.25',
            '1 / 2': '200',
            '1/2': '200',
            '2 / 1': '50',
            '2/1': '50',
        });

        mount(
            <CypressTestDecorator>
                {ratios.map((ratio) => (
                    <Fragment key={ratio}>
                        <Why key="_base_div">
                            <Image base="div" ratio={ratio} src={src} />
                        </Why>
                        <Why key="_base_img">
                            <Image ratio={ratio} src={src} />
                        </Why>
                        <PadMe />
                    </Fragment>
                ))}
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_customRatio', () => {
        mount(
            <CypressTestDecorator>
                <Why key="_base_div">
                    <Image base="div" customRatio={75} src={src} />
                </Why>
                <Why key="_base_img">
                    <Image customRatio={75} src={src} />
                </Why>
                <PadMe />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
