import React from 'react';
import styled from 'styled-components';
import { SelfPosition } from 'csstype';

import { addFocus, FocusProps, OutlinedProps } from '../../mixins';

export const CellRoot = styled.div<FocusProps & OutlinedProps>`
    display: flex;

    &:focus {
        outline: 0 none;
    }

    ${({ focused, outlined }) =>
        addFocus({
            focused,
            outlined,
            outlineOffset: '0.25rem',
            outlineRadius: '0.125rem',
        })};
`;

export type CellSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
type sizeVal = { margin: number; height: number; br: number };

const sizeMap: Record<CellSize, sizeVal> = {
    xs: { margin: 0.25, height: 1, br: 0.25 }, // 16px
    s: { margin: 0.5, height: 1.5, br: 0.25 }, // 24px
    m: { margin: 0.75, height: 2.25, br: 0.5 }, // 36px
    l: { margin: 1, height: 3, br: 0.75 }, // 48px
    xl: { margin: 1, height: 3.5, br: 0.75 }, // 56px
    xxl: { margin: 1, height: 4, br: 0.75 }, // 64px
};

type alignLeftProp = 'center' | 'top' | 'bottom';
type alignRightProp = 'center' | 'top';

const alignToFlex: Record<alignLeftProp, SelfPosition> = {
    center: 'center',
    top: 'flex-start',
    bottom: 'flex-end',
};

export const CellLeft = styled.div<{ align: alignLeftProp }>`
    display: flex;
    align-items: ${({ align = 'center' }) => alignToFlex[align]};
    padding: 0.375rem 0;
`;

export const CellRight = styled.div<{ align: alignRightProp }>`
    display: flex;
    align-items: ${({ align = 'center' }) => alignToFlex[align]};

    text-align: right;
`;

/** Оборачивает ( content + right ) */
export const CellContentWrapper = styled.div`
    display: flex;
    flex: auto;
    justify-content: space-between;

    padding: 0.375rem 0;
`;

export const CellContent = styled.div`
    display: flex;
    align-items: center;
`;

export interface CellIconProps {
    /** Размер Иконки ( по умолчанию – m ) */
    size?: CellSize;
}

export const CellIcon = styled.div<CellIconProps>`
    height: ${({ size = 'm' }) => sizeMap[size].height}rem;
    border-radius: ${({ size = 'm' }) => sizeMap[size].br}rem;
    overflow: hidden;

    margin: 0.125rem ${({ size = 'm' }) => sizeMap[size].margin}rem;

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${CellLeft} &:first-child {
        margin-left: 0;
    }

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${CellRight} &:last-child {
        margin-right: 0;
    }

    & + & {
        margin-left: 0;
    }
`;

export interface CellProps extends FocusProps, OutlinedProps {
    left?: React.ReactNode;
    content: React.ReactNode;
    right?: React.ReactNode;

    alignLeft?: alignLeftProp;
    alignRight?: alignRightProp;

    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

/**
 * Базовый компонент для отображения блоков контента в списках и карточках.
 */
export const Cell: React.FC<CellProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { left, content, right, alignLeft = 'center', alignRight = 'center', ...rest } = props;

    return (
        <CellRoot {...rest}>
            {left && <CellLeft align={alignLeft}>{left}</CellLeft>}
            <CellContentWrapper>
                <CellContent>{content}</CellContent>
                {right && <CellRight align={alignRight}>{right}</CellRight>}
            </CellContentWrapper>
        </CellRoot>
    );
};
