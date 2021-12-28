import React, { FC } from 'react';
import styled from 'styled-components';

import { addFocus } from '../../mixins';
import { Image, ImageProps } from '../Image';
import { Headline4, Footnote1 } from '../Typography';

interface CarouselCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt?: string;
    imageBase?: ImageProps['base'];
}

const StyledCard = styled.a`
    display: flex;
    position: relative;
    border-radius: 1rem;

    ${addFocus({
        outlined: true,
        outlineRadius: '1.125rem',
    })}
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
export const CarouselCard: FC<CarouselCardProps> = ({
    title,
    subtitle,
    imageSrc,
    imageAlt,
    imageBase = 'div',
    ...rest
}) => (
    <StyledCard {...rest}>
        <Image src={imageSrc} ratio="16 / 9" base={imageBase} alt={imageAlt} />
        <StyledCardContent>
            <Headline4>{title}</Headline4>
            <Footnote1>{subtitle}</Footnote1>
        </StyledCardContent>
    </StyledCard>
);
