import React from 'react';
import styled from 'styled-components';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';
import { IconChevronLeft, IconChevronRight } from '@sberdevices/plasma-icons';

describe('plasma-ui: SmartPaginationDots', () => {
    const SmartPaginationDots = getComponent('SmartPaginationDots');
    const ActionButton = getComponent('ActionButton');
    const Caption = getComponent('Caption');

    const StyledWrapper = styled.div`
        display: flex;
        flex-direction: column;
    `;
    const StyledButtonGroup = styled.div`
        display: flex;
        align-self: center;
        align-items: center;
    `;
    const StyledGhostButton = styled(ActionButton).attrs(() => ({ view: 'clear', outlined: false }))`
        padding: 0;
    `;

    it('simple', () => {
        const items = Array.from(Array(10), (_, i) => ({ id: i }));
        const minIndex = 0;
        const maxIndex = items.length - 1;

        const Example = () => {
            const [currentIndex, setIndex] = React.useState(0);

            return (
                <StyledWrapper>
                    <SmartPaginationDots items={items} index={currentIndex} />
                    <StyledButtonGroup>
                        <StyledGhostButton
                            id="cy-left"
                            onClick={() => setIndex(currentIndex - 1 >= minIndex ? currentIndex - 1 : maxIndex)}
                            size="s"
                        >
                            <IconChevronLeft size="xs" />
                        </StyledGhostButton>
                        <Caption>{currentIndex}</Caption>
                        <StyledGhostButton
                            id="cy-right"
                            onClick={() => setIndex(currentIndex + 1 <= maxIndex ? currentIndex + 1 : minIndex)}
                            size="s"
                        >
                            <IconChevronRight size="xs" />
                        </StyledGhostButton>
                    </StyledButtonGroup>
                </StyledWrapper>
            );
        };

        mount(
            <CypressTestDecorator>
                <Example />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
        cy.get('#cy-right').click();
        cy.matchImageSnapshot('+1');

        Array.from(Array(7)).forEach(() => {
            cy.get('#cy-right').click();
        });
        cy.matchImageSnapshot('+8');
        cy.get('#cy-right').click();
        cy.matchImageSnapshot('+9');
        cy.get('#cy-right').click();
        cy.matchImageSnapshot('+10');

        cy.get('#cy-left').click();
        cy.matchImageSnapshot('-1');

        Array.from(Array(7)).forEach(() => {
            cy.get('#cy-left').click();
        });
        cy.matchImageSnapshot('-8');
        cy.get('#cy-left').click();
        cy.matchImageSnapshot('-9');
        cy.get('#cy-left').click();
        cy.matchImageSnapshot('-10');
    });
});
