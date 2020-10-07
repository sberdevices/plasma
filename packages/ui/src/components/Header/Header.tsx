import React from 'react';
import styled from 'styled-components';
import { Headline3 } from 'plasma-styles/components/Headline';
import { Footnote1 } from 'plasma-styles/components/Footnote';
import { colorTextSecondary } from 'plasma-styles/components/Color/tokens';

import { Icon } from '../Icon/Icon';
import { IconSize } from '../Icon/IconRoot';

const StyledHeader = styled.header`
    position: relative;
    z-index: 1;

    display: flex;
    align-items: center;

    height: 72px;
    padding: 60px 48px;
`;

const StyledTitleWrapper = styled.div`
    margin: 0;
    margin-left: 80px;
`;

const StyledTitle = styled(Headline3)`
    font-size: 40px;
    line-height: 1.2;
`;

const StyledSubTitle = styled(Footnote1)`
    color: ${colorTextSecondary};

    font-size: 24px;
    line-height: 36px;
`;

const StyledLogo = styled.img`
    width: 72px;
    height: 72px;
    margin-right: 24px;
    margin-left: 80px;

    border-radius: 16px;

    & + ${StyledTitleWrapper} {
        margin-left: 0;
    }
`;

const StyledBackIcon = styled(Icon)<{ size?: IconSize }>`
    margin: 0;
    padding: 0;

    border: none;
    outline: none;
    background-color: transparent;

    & + ${StyledLogo} {
        margin-left: 32px;
    }

    & + ${StyledTitleWrapper} {
        margin-left: 40px;
    }

    &:focus {
        display: inherit;
    }
`;

const StyledContent = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;

export const Header: React.FC<{ className?: string }> = ({ children, className }) => (
    <StyledHeader className={className}>{children}</StyledHeader>
);

export const HeaderLogo: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => (
    <StyledLogo src={src} alt={alt} className={className} />
);

export const HeaderTitle: React.FC<{ text: string; className?: string }> = ({ text, children, className }) => (
    <StyledTitleWrapper className={className}>
        <StyledTitle>{text}</StyledTitle>
        {children}
    </StyledTitleWrapper>
);

export const HeaderSubTitle: React.FC<{ text: string }> = ({ text }) => <StyledSubTitle>{text}</StyledSubTitle>;

export const HeaderBack: React.FC<{ size?: IconSize }> = ({ size }) => (
    <StyledBackIcon size={size} icon="chevronLeft" />
);

export const HeaderContent: React.FC<{ className?: string }> = ({ children, className }) => (
    <StyledContent className={className}>{children}</StyledContent>
);
