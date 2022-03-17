import React from 'react';
import styled from 'styled-components';
import { Headline2, ParagraphText1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { Header } from '../Header/Header';
import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';
import { useWindowInnerHeight } from '../../hooks';

import { StyledHeaderContainer } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';
import { StateLayoutImage } from './StateLayoutImage/StateLayoutImage';

const defaultBottomOffset = 80;

const StyledContainer = styled.div<{ offsetBottom?: number; $height: number | null }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: ${({ $height }) => ($height ? `${$height}px` : '100vh')};
    box-sizing: border-box;

    padding-bottom: ${({ offsetBottom }) => offsetBottom ?? defaultBottomOffset}px;
`;

const StyledContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin-top: auto;
`;

const StyledTitle = styled(Headline2)`
    text-align: center;
    margin-bottom: 0.75rem;
`;

const StyledSubtitle = styled(ParagraphText1)`
    color: ${secondary};
    text-align: center;
    margin-bottom: 1.875rem;
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
    backgroundMask,
    title,
    text,
    button,
    children,
    className,
    insets,
}) => {
    const height = useWindowInnerHeight();

    return (
        <StyledContainer className={className} offsetBottom={insets?.bottom} $height={height}>
            {header && (
                <StyledHeaderContainer>
                    <Header {...header} />
                </StyledHeaderContainer>
            )}
            {background && (
                <FullScreenBackground
                    src={background}
                    imageWidth={backgroundWidth}
                    imageFit={backgroundFit}
                    mask={backgroundMask}
                />
            )}
            <StyledContentContainer>
                <StateLayoutImage image={children ?? image} />
                <StyledTitle data-cy="state-layout-title" breakWord={false}>
                    {title}
                </StyledTitle>
                {text && (
                    <StyledSubtitle data-cy="state-layout-text" breakWord={false}>
                        {text}
                    </StyledSubtitle>
                )}
            </StyledContentContainer>
            <StyledButtonWrapper>{button}</StyledButtonWrapper>
        </StyledContainer>
    );
};
