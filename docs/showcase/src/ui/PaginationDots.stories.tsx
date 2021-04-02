import React from 'react';
import styled from 'styled-components';
import { SmartPaginationDots, PaginationDots, PaginationDot } from '@sberdevices/plasma-ui/components/PaginationDots';
import { Badge } from '@sberdevices/plasma-ui/components/Badge';
import { ActionButton } from '@sberdevices/plasma-ui/components/Button';
import isChromatic from 'chromatic/isChromatic';

import { ShowcaseComponentRow, ShowcaseDashedBorder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/PaginationDots',
    component: SmartPaginationDots,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const StyledWrapper = styled.div`
    display: flex;
`;
const StyledLimitedWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
`;
const StyledBadge = styled(Badge)`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;
const StyledControlButton = styled(ActionButton).attrs(() => ({ size: 's', square: true }))``;

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
    const [index, setIndex] = React.useState(0);
    const items = Array(10)
        .fill(0)
        .map((_, i) => ({ id: i }));
    const minIndex = 0;
    const maxIndex = items.length - 1;

    return (
        <ShowcaseDashedBorder>
            <StyledLimitedWrapper>
                <SmartPaginationDots items={items} index={index} visibleItems={7} />
                {!isChromatic() && (
                    <StyledButtonGroup>
                        <StyledControlButton onClick={() => setIndex(index - 1 >= minIndex ? index - 1 : maxIndex)}>
                            &lt;
                        </StyledControlButton>
                        <StyledBadge size="l" view="primary" text={index.toString()} />
                        <StyledControlButton onClick={() => setIndex(index + 1 <= maxIndex ? index + 1 : minIndex)}>
                            &gt;
                        </StyledControlButton>
                    </StyledButtonGroup>
                )}
            </StyledLimitedWrapper>
        </ShowcaseDashedBorder>
    );
};
