import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui';

import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';

interface BackgroundProps {
    /** Ссылка на фоновое изображение */
    src: string;
}

interface GridColumns {
    /** Количество колонок при разрешении XL */
    columnXL?: number;
    /** Количество колонок при разрешении M */
    columnM?: number;
    /** Количество колонок при разрешении S */
    columnS?: number;
}
export interface GridProps extends GridColumns {
    /** Фоновое изображение */
    background?: BackgroundProps;
    className?: string;
}

const StyledContainer = styled.div<Required<GridColumns>>`
    display: grid;
    grid-gap: 1rem;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);

    ${({ columnXL, columnM, columnS }) => {
        return [
            mediaQuery('XL')(css`
                grid-template-columns: repeat(${columnXL}, 1fr);
            `),
            mediaQuery('M')(css`
                grid-template-columns: repeat(${columnM}, 1fr);
            `),
            mediaQuery('S')(css`
                grid-template-columns: repeat(${columnS}, 1fr);
            `),
        ];
    }};
`;

/** Компонент для отображения однотипного контента (обычно карточки) в виде сетки с заданным количеством колонок */
export function Grid({
    columnXL = 4,
    columnS = 2,
    columnM = 3,
    className,
    children,
    background,
}: React.PropsWithChildren<GridProps>) {
    return (
        <StyledContainer className={className} columnXL={columnXL} columnM={columnM} columnS={columnS}>
            {background && <FullScreenBackground src={background.src} />}
            {children}
        </StyledContainer>
    );
}
