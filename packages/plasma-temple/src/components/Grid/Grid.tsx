import React from 'react';
import styled from 'styled-components';
import { detectDevice } from '@sberdevices/plasma-ui';

import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';

interface BackgroundProps {
    /** Ссылка на фоновое изображение */
    src: string;
}

export interface GridProps {
    /** Количество колонок при разрешении XL */
    columnXL?: number;
    /** Количество колонок при разрешении M */
    columnM?: number;
    /** Количество колонок при разрешении S */
    columnS?: number;
    /** Фоновое изображение */
    background?: BackgroundProps;
    className?: string;
}

const StyledContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
    grid-auto-rows: 1fr;
`;

const getColumnCount = ({ columnXL, columnM, columnS }: { columnXL: number; columnM: number; columnS: number }) => {
    switch (detectDevice()) {
        case 'sberBox':
            return columnXL;
        case 'sberPortal':
            return columnM;
        default:
            return columnS;
    }
};

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
        <StyledContainer className={className} columns={getColumnCount({ columnXL, columnM, columnS })}>
            {background && <FullScreenBackground src={background.src} />}
            {children}
        </StyledContainer>
    );
}
