import React from 'react';
import styled, { css } from 'styled-components';
import { typography, colors } from '@sberdevices/plasma-tokens';

import { Icon } from '../Icon/Icon';

export const CellRoot = styled.div`
    display: flex;
    min-width: 320px;
`;

export const CellContent = styled.div<{ withBorderBottom?: boolean }>`
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 12px 0;

    ${({ withBorderBottom }) =>
        withBorderBottom &&
        css`
            padding-bottom: 11px;
            border-bottom: 1px solid ${colors.surfaceLiquid03};
        `}
`;

export const CellHeader = styled.span`
    padding-bottom: 8px;

    color: ${colors.text};
    ${typography.headline3};

    &:last-child {
        padding-bottom: 0;
    }
`;

export const CellTitle = styled.span`
    padding-bottom: 2px;

    color: ${colors.text};
    ${typography.body1};

    &:last-child {
        padding-bottom: 0;
    }
`;

export const CellDetail = styled.span<{ hasHeader?: boolean }>`
    padding-bottom: 2px;
    ${({ hasHeader }) =>
        hasHeader &&
        css`
            padding-top: 3px;
        `}

    color: ${colors.text};
    ${typography.body1};

    &:last-child {
        padding-bottom: 0;
    }
`;

export const CellSubTitle = styled.span`
    padding-bottom: 4px;

    color: ${colors.secondary};
    ${typography.footnote1};

    &:last-child {
        padding-bottom: 0;
    }
`;

export const CellLeft = styled.div<{ centerColLeft?: boolean }>`
    display: flex;
    flex-direction: column;

    ${({ centerColLeft }) => css`
        justify-content: ${centerColLeft ? 'center' : 'flex-start'};
    `}
`;

export const CellRight = styled.div<{ centerColRight?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    ${({ centerColRight }) => css`
        justify-content: ${centerColRight ? 'center' : 'flex-start'};
    `}
`;

export const CellIcon = styled.div<{ centerIcon?: boolean }>`
    display: flex;
    padding: 2px 12px 2px 0;

    ${({ centerIcon }) => css`
        align-items: ${centerIcon === false ? 'flex-start' : 'center'};
    `}
`;

export const CellIconWrapper = styled.button`
    display: flex;
    padding: 0;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    & span {
        transform: translateX(33%);
    }
`;

interface CellProps {
    header?: string;
    title?: string;
    subTitle?: string;
    detail?: string;
    icon?: React.ReactNode;
    centerColLeft?: boolean;
    centerColRight?: boolean;
    centerIcon?: boolean;
    withBorderBottom?: boolean;
    actionIconSize?: 's' | 'm' | 'l';
    onClick?: () => void;
}

export const Cell: React.FC<CellProps> = ({
    header,
    title,
    subTitle,
    detail,
    icon,
    centerColLeft,
    centerColRight = true,
    centerIcon,
    withBorderBottom,
    actionIconSize,
    onClick,
}) => {
    return (
        <CellRoot>
            {icon && <CellIcon centerIcon={centerIcon}>{icon}</CellIcon>}
            <CellContent withBorderBottom={withBorderBottom}>
                <CellLeft centerColLeft={centerColLeft}>
                    {header && <CellHeader>{header}</CellHeader>}
                    {title && <CellTitle>{title}</CellTitle>}
                    {subTitle && <CellSubTitle>{subTitle}</CellSubTitle>}
                </CellLeft>
                <CellRight centerColRight={centerColRight}>
                    {detail && <CellDetail hasHeader={Boolean(header)}>{detail}</CellDetail>}
                    {onClick && (
                        <CellIconWrapper onClick={onClick}>
                            <Icon size={actionIconSize || 's'} icon="disclosureRight" />
                        </CellIconWrapper>
                    )}
                </CellRight>
            </CellContent>
        </CellRoot>
    );
};
