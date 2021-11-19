import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Tooltip', () => {
    const Tooltip = getComponent('Tooltip');
    const Button = getComponent('Button');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Tooltip text="Высокое качество воспроизведения" isVisible placement="right">
                    <Button text="hello" />
                </Tooltip>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('multiple placement', () => {
        const Container = ({ children }) => {
            return (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, max-content)',
                        gridGap: '1rem 3.5rem',
                        padding: '2.5rem',
                    }}
                >
                    {children}
                </div>
            );
        };

        mount(
            <CypressTestDecorator>
                <Container>
                    <Tooltip placement="top-start" isVisible arrow text="Top start" animated={false}>
                        <Tooltip placement="left" isVisible arrow text="Left" animated={false}>
                            <Button text="hello" />
                        </Tooltip>
                    </Tooltip>
                    <Tooltip placement="top" isVisible arrow text="Top" animated={false}>
                        <Button text="hello" />
                    </Tooltip>
                    <Tooltip placement="top-end" isVisible arrow text="Top end" animated={false}>
                        <Tooltip placement="right" isVisible arrow text="Right" animated={false}>
                            <Button text="hello" />
                        </Tooltip>
                    </Tooltip>
                    <Tooltip placement="bottom-start" isVisible arrow text="Bottom start" animated={false}>
                        <Button text="hello" />
                    </Tooltip>
                    <Tooltip placement="bottom" isVisible arrow text="Bottom" animated={false}>
                        <Button text="hello" />
                    </Tooltip>
                    <Tooltip placement="bottom-end" isVisible arrow text="Bottom end" animated={false}>
                        <Button text="hello" />
                    </Tooltip>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('interaction', () => {
        function Demo() {
            const [isVisible, setVisible] = React.useState(false);

            return (
                <>
                    <Tooltip isVisible={isVisible} placement="bottom" text="Hello there">
                        <Button
                            text="Toggle"
                            onClick={() => {
                                setVisible((isVis) => !isVis);
                            }}
                        />
                    </Tooltip>
                </>
            );
        }

        mount(
            <CypressTestDecorator>
                <Demo />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('out of bounds', () => {
        const Container = ({ children }) => {
            return (
                <div
                    style={{
                        display: 'flex',
                        gap: '4rem',
                    }}
                >
                    {children}
                </div>
            );
        };

        mount(
            <CypressTestDecorator>
                <Container>
                    <Tooltip placement="left" isVisible arrow text="Left" animated={false}>
                        <Button text="hello" />
                    </Tooltip>
                    <Tooltip placement="top" isVisible arrow text="Top" animated={false}>
                        <Button text="hello" />
                    </Tooltip>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
