import React from 'react';
import styled, { css, InterpolationFunction } from 'styled-components';
import { primary, secondary } from '@sberdevices/plasma-tokens';
import { applyMaxLines, MaxLinesProps } from '@sberdevices/plasma-core';

import { Body1, Footnote1 } from '../Typography';

import { Card, CardProps } from './Card';
import { CardBody } from './CardBody';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';

interface TextAlignProps {
    textAlign?: 'left' | 'center' | 'right';
}

interface ContentProps {
    title: string;
    subtitle?: string;
}

interface ImageProps {
    imageSrc: string;
    imageRatio?: string;
    imageCustomRatio?: string;
}

interface CardExampleProps extends Omit<CardProps, 'title'>, ContentProps, ImageProps, TextAlignProps {}

const applyTextAlign: InterpolationFunction<TextAlignProps> = ({ textAlign }) =>
    textAlign &&
    css`
        text-align: ${textAlign};
    `;

const StyledProductIcon = styled(CardMedia)`
    width: 3rem;
    height: 3rem;
    padding: 0;
    border-radius: 1rem;
`;

const StyledItemDescr = styled(Footnote1)<MaxLinesProps & TextAlignProps>`
    ${applyMaxLines}
    ${applyTextAlign}

    margin-top: 0.25rem;
    color: ${secondary};

    /* stylelint-disable-next-line max-line-length */
    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before, selector-nested-pattern */
    ${StyledProductIcon} + & {
        margin-top: 1rem;
    }
`;

const StyledItemTitle = styled(Body1)<MaxLinesProps & TextAlignProps>`
    ${applyMaxLines}
    ${applyTextAlign}

    margin-top: 0.75rem;
    color: ${primary};

    /* stylelint-disable-next-line max-line-length */
    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before, selector-nested-pattern */
    ${StyledItemDescr} + & {
        margin-top: 0.25rem;
    }
`;

export const ProductCard: React.FC<CardExampleProps> = ({ title, subtitle, imageSrc, ...rest }) => (
    <Card {...rest}>
        <CardBody>
            <CardContent>
                <StyledProductIcon src={imageSrc} />
                {subtitle && <StyledItemDescr maxLines={1}>{subtitle}</StyledItemDescr>}
                <StyledItemTitle maxLines={1}>{title}</StyledItemTitle>
            </CardContent>
        </CardBody>
    </Card>
);

export const MusicCard: React.FC<CardExampleProps> = ({
    title,
    subtitle,
    roundness = 12,
    imageSrc,
    imageRatio,
    imageCustomRatio,
    textAlign,
    ...rest
}) => (
    <>
        <Card roundness={roundness} {...rest}>
            <CardBody>
                <CardMedia src={imageSrc} ratio={imageRatio as any} customRatio={imageCustomRatio as any} />
            </CardBody>
        </Card>
        <StyledItemTitle maxLines={1} textAlign={textAlign}>
            {title}
        </StyledItemTitle>
        {subtitle && (
            <StyledItemDescr maxLines={1} textAlign={textAlign}>
                {subtitle}
            </StyledItemDescr>
        )}
    </>
);

export const GalleryCard: React.FC<CardExampleProps> = ({
    title,
    subtitle,
    imageSrc,
    imageRatio,
    imageCustomRatio,
    textAlign,
    ...rest
}) => (
    <>
        <Card {...rest}>
            <CardBody>
                <CardMedia src={imageSrc} ratio={imageRatio as any} customRatio={imageCustomRatio as any} />
                <CardContent cover>
                    <StyledItemTitle maxLines={1} textAlign={textAlign}>
                        {title}
                    </StyledItemTitle>
                    {subtitle && (
                        <StyledItemDescr maxLines={1} textAlign={textAlign}>
                            {subtitle}
                        </StyledItemDescr>
                    )}
                </CardContent>
            </CardBody>
        </Card>
    </>
);
