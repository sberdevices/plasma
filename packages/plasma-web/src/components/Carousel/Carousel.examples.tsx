import React, { FC } from 'react';
import styled from 'styled-components';

import { Image } from '../Image';
import { Headline4, Footnote1 } from '../Typography';

const StyledCard = styled.div`
    position: relative;
    border-radius: 1rem;
`;
const StyledCardContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1.72rem;
    color: #fff;
`;

/**
 * Карточка под примеры с каруселью.
 * @private
 */
export const CarouselCard: FC<{ title: string; subtitle: string; imageSrc: string }> = ({
    title,
    subtitle,
    imageSrc,
}) => (
    <StyledCard>
        <Image src={imageSrc} ratio="16 / 9" base="div" />
        <StyledCardContent>
            <Headline4>{title}</Headline4>
            <Footnote1>{subtitle}</Footnote1>
        </StyledCardContent>
    </StyledCard>
);
