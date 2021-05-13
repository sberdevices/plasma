import React from 'react';
import styled from 'styled-components';
import { SmartPaginationDots, PaginationDots, PaginationDot } from '@sberdevices/plasma-web/components/PaginationDots';

import { ShowcaseComponentRow, ShowcaseDashedBorder, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/PaginationDots',
    component: SmartPaginationDots,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const StyledWrapper = styled.div`
    display: flex;
`;
const StyledLimitedWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const rows = Array.from({ length: 4 }, () => [0, 0, 0, 0]);

export const Default = () => {
    return (
        <StyledWrapper>
            <Basic />
            <Limited />
        </StyledWrapper>
    );
};

const Basic = () => {
    return (
        <ShowcaseDashedBorder style={{ marginRight: '1rem' }}>
            {rows.map((items, i) => (
                <ShowcaseComponentRow key={`row:${i}`}>
                    <PaginationDots>
                        {items.map((_, j) => (
                            <PaginationDot key={`item:${i}${j}`} isActive={j === i} />
                        ))}
                    </PaginationDots>
                </ShowcaseComponentRow>
            ))}
        </ShowcaseDashedBorder>
    );
};

const Limited = () => {
    const index = 0;
    const items = Array(10)
        .fill(0)
        .map((_, i) => ({ id: i }));

    return (
        <ShowcaseDashedBorder>
            <StyledLimitedWrapper>
                <SmartPaginationDots items={items} index={index} visibleItems={7} />
            </StyledLimitedWrapper>
        </ShowcaseDashedBorder>
    );
};
