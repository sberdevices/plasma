import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';
import { colorValues } from '@sberdevices/plasma-tokens';

const { accent } = colorValues;

// TODO: PLASMA-1086
describe('plasma-ui: Header: desktop', () => {
    const Container = getComponent('Container');
    const Header = getComponent('Header');
    const Button = getComponent('HeaderButton');

    const src = 'https://plasma.sberdevices.ru/ui-storybook/images/avocado.png';
    const title = 'Hello World of Plasma';
    const subTitle = 'Use with wisdom';
    const noop = () => {};

    beforeEach(() => {
        cy.intercept(src, (req) => {
            req.reply({
                fixture: 'images/avocado.png',
            });
        });
        cy.viewport(1280, 200);
    });

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header logo={src} title={title} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__title', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header title={title} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__sub-title', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__logo', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header logo={src} logoAlt="avocado" title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__content', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header logo={src} logoAlt="avocado" title={title} subtitle={subTitle}>
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_minimize', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header minimize onMinimizeClick={noop} logo={src} title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_back', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header back onBackClick={noop} logo={src} title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_gradient', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header
                        gradientColor={accent}
                        minimize
                        onMinimizeClick={noop}
                        logo={src}
                        title={title}
                        subtitle={subTitle}
                    >
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});

describe('plasma-ui: Header: mobile', () => {
    const Container = getComponent('Container');
    const Header = getComponent('Header');
    const Button = getComponent('HeaderButton');

    const src = 'https://plasma.sberdevices.ru/ui-storybook/images/avocado.png';
    const title = 'Hello World of Plasma';
    const subTitle = 'Use with wisdom';
    const noop = () => {};

    beforeEach(() => {
        cy.intercept(src, (req) => {
            req.reply({
                fixture: 'images/avocado.png',
            });
        });
        cy.viewport('iphone-6');
    });

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header logo={src} title={title} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__title', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header title={title} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__sub-title', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__logo', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header logo={src} logoAlt="avocado" title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__content', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header logo={src} logoAlt="avocado" title={title} subtitle={subTitle}>
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_minimize', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header minimize onMinimizeClick={noop} logo={src} title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_back', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header back onBackClick={noop} logo={src} title={title} subtitle={subTitle} />
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_gradient', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Header
                        gradientColor={accent}
                        minimize
                        onMinimizeClick={noop}
                        logo={src}
                        title={title}
                        subtitle={subTitle}
                    >
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});

describe('plasma-ui: Header: _size', () => {
    const Container = getComponent('Container');
    const Header = getComponent('Header');
    const Button = getComponent('HeaderButton');

    const src = 'https://plasma.sberdevices.ru/ui-storybook/images/avocado.png';
    const title = 'Hello World of Plasma';
    const subTitle = 'Use with wisdom';
    const noop = () => {};

    it('_sberBox', () => {
        cy.viewport(1920, 200);

        mount(
            <CypressTestDecorator>
                <Container>
                    <Header size="sberBox" minimize onMinimizeClick={noop} logo={src} title={title} subtitle={subTitle}>
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_sberPortal', () => {
        cy.viewport(1280, 200);

        mount(
            <CypressTestDecorator>
                <Container>
                    <Header
                        size="sberPortal"
                        minimize
                        onMinimizeClick={noop}
                        logo={src}
                        title={title}
                        subtitle={subTitle}
                    >
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_mobile', () => {
        cy.viewport('iphone-6');

        mount(
            <CypressTestDecorator>
                <Container>
                    <Header size="mobile" minimize onMinimizeClick={noop} logo={src} title={title} subtitle={subTitle}>
                        <Button text="buy" />
                    </Header>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
