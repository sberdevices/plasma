import React from 'react';
import styled from 'styled-components';
import { headline2, paragraph1, secondary } from '@sberdevices/plasma-tokens';

import { Header } from '../Header/Header';
import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';
import { useWindowInnerHeight } from '../../hooks';

import { StyledHeaderContainer } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';
import { useImageToRender } from './hooks/useImageToRender';

const defaultBottomOffset = 80;

const StyledContainer = styled.div<{ offsetBottom?: number; $height: number | null }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${({ $height }) => ($height ? `${$height}px` : '100vh')};
    box-sizing: border-box;

    padding-bottom: ${({ offsetBottom }) => offsetBottom ?? defaultBottomOffset}px;
`;

const StyledImageContainer = styled.div`
    width: 100%;
    margin-top: auto;
    margin-bottom: 2.875rem;
`;

const StyledTitle = styled.div`
    ${headline2}
    text-align: center;
    margin-bottom: 0.75rem;
`;

const StyledSubtitle = styled.div`
    ${paragraph1}
    color: ${secondary};
    hyphens: none;
    text-align: center;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: auto;
`;

export const StateLayoutMobile: React.FC<StateLayoutCommonProps> = ({
    header,
    image,
    background,
    backgroundFit,
    backgroundWidth,
    title,
    text,
    button,
    children,
    className,
    insets,
}) => {
    const imageToRender = useImageToRender(image, children);
    const height = useWindowInnerHeight();

    return (
        <StyledContainer className={className} offsetBottom={insets?.bottom} $height={height}>
            {header && (
                <StyledHeaderContainer>
                    <Header {...header} />
                </StyledHeaderContainer>
            )}
            {background && (
                <FullScreenBackground src={background} imageWidth={backgroundWidth} imageFit={backgroundFit} />
            )}
            {(image || children) && <StyledImageContainer>{imageToRender}</StyledImageContainer>}
            <StyledTitle data-cy="state-layout-title">{title}</StyledTitle>
            {text && <StyledSubtitle data-cy="state-layout-text">{text}</StyledSubtitle>}
            <StyledButtonWrapper>{button}</StyledButtonWrapper>
        </StyledContainer>
    );
};
