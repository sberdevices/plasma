import React from 'react';
import styled from 'styled-components';
import { Row, Col } from '@sberdevices/plasma-ui';

import { Header } from '../Header/Header';
import { UnifiedComponentProps } from '../../registry/types';
import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';
import { useWindowInnerHeight } from '../../hooks';

import { StateLayoutCommonProps } from './types';
import { StateLayoutImage } from './StateLayoutImage/StateLayoutImage';

type PlatformComponents = {
    Headline: void;
    Text: void;
    TextWrapper: void;
};

type StateLayoutProps = UnifiedComponentProps<StateLayoutCommonProps, PlatformComponents>;

export const StyledHeaderContainer = styled.div`
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    padding-left: var(--plasma-grid-margin);
    padding-right: var(--plasma-grid-margin);
`;

const StyledContainer = styled(Row)`
    align-items: center;
    flex: 1;
`;

const StyledWrapper = styled.div<{ $height: number | null }>`
    position: relative;

    display: flex;
    flex-direction: column;

    height: ${({ $height }) => ($height ? `${$height}px` : '100vh')};
    margin: 0 calc(var(--plasma-grid-margin) * -1);
    padding: 0 var(--plasma-grid-margin);
`;

export const StateLayout: React.FC<StateLayoutProps> = ({
    title,
    text,
    button,
    image,
    background,
    backgroundWidth,
    backgroundFit,
    backgroundMask,
    header,
    children,
    platformComponents: { Headline, Text, TextWrapper },
    className,
}) => {
    const height = useWindowInnerHeight();

    return (
        <StyledWrapper className={className} $height={height}>
            {background && (
                <FullScreenBackground
                    src={background}
                    imageWidth={backgroundWidth}
                    imageFit={backgroundFit}
                    mask={backgroundMask}
                />
            )}
            {header && (
                <StyledHeaderContainer>
                    <Header {...header} />
                </StyledHeaderContainer>
            )}
            <StyledContainer>
                <Col sizeXL={6} sizeM={3}>
                    <TextWrapper>
                        <Headline data-cy="state-layout-title">{title}</Headline>
                        {text && <Text data-cy="state-layout-text">{text}</Text>}
                    </TextWrapper>
                    {button}
                </Col>
                <Col sizeXL={6} sizeM={3} data-cy="state-layout-image-wrapper">
                    <StateLayoutImage image={children ?? image} />
                </Col>
            </StyledContainer>
        </StyledWrapper>
    );
};
