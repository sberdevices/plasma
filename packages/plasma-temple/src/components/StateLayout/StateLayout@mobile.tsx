import React from 'react';
import styled from 'styled-components';
import { Image } from '@sberdevices/plasma-ui';
import { headline3, body1, secondary } from '@sberdevices/plasma-tokens';

import { Header } from '../Header/Header';

import { getImageToRender, StyledHeaderContainer } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';

const StyledContainer = styled.div<{ offsetBottom: number }>`
    display: flex;
    flex-direction: column;
    padding-top: 74px;
    ${({ offsetBottom }) => ({
        height: `calc(100vh - 74px - ${offsetBottom}px)`,
    })}
`;

const StyledTitle = styled.div`
    ${headline3}
    padding-top: 19px;
    text-align: center;
`;

const StyledSubtitle = styled.div`
    ${body1}
    color: ${secondary};
    padding-top: 8px;
    text-align: center;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
`;

export const StateLayoutMobile: React.FC<StateLayoutCommonProps> = ({
    header,
    image,
    background,
    title,
    text,
    button,
    children,
}) => {
    const imageToRender = React.useMemo(() => {
        if (children) {
            return children;
        }
        if (image) {
            return getImageToRender(image);
        }
        return null;
    }, [children, image]);

    return (
        <StyledContainer offsetBottom={118}>
            {header && (
                <StyledHeaderContainer>
                    <Header {...header} />
                </StyledHeaderContainer>
            )}
            {background && <Image base="div" src={background} ratio="1 / 1" />}
            {image && imageToRender}
            <StyledTitle>{title}</StyledTitle>
            {text && <StyledSubtitle>{text}</StyledSubtitle>}
            <StyledButtonWrapper>{button}</StyledButtonWrapper>
        </StyledContainer>
    );
};
