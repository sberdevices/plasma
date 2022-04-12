import React from 'react';
import styled, { css } from 'styled-components';
import { overlay, primary, backgroundPrimary } from '@sberdevices/plasma-tokens';

import { useSheetSwipe } from './useSheetSwipe';

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Состояние шторки, открыта или скрыта
     */
    isOpen: boolean;

    /**
     * Обработчик закрытия шторки. Вызывается при клике по оверлею или смахиванию шторки вниз
     */
    onClose: () => void;

    /**
     * Наличие оверлея шторки. Если включен, то контент под шторкой перекрывается оверлеем, при нажатии на
     * который шторка закрывается.
     */
    withOverlay?: boolean;
}

const StyledWrapper = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'all 0.5s 0.1s')};
    z-index: 1000;

    ${({ isOpen }) =>
        !isOpen &&
        css`
            opacity: 0;
            visibility: hidden;
        `}
`;

const StyledContentWrapper = styled.div<{ isOpen: boolean }>`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: 100%;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'transform 0.5s')};

    ${({ isOpen }) =>
        !isOpen &&
        css`
            transform: translateY(100%);
        `}
`;

const StyledOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: ${overlay};
`;

const StyledSheetContent = styled.div`
    border-radius: 1.5rem 1.5rem 0 0;
    background-color: ${backgroundPrimary};
    padding: 1rem;

    max-height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledSheetHandle = styled.div`
    width: 4rem;
    padding: 0.25rem 0;
    opacity: 0.65;
    align-self: center;

    &::before {
        content: '';
        display: block;
        border-radius: 0.625rem;
        background-color: ${primary};
        height: 0.25rem;
    }
`;

/**
 * Открывает окно-шторку поверх основного экрана.
 * Только для СберБанк Онлайн и Сбер Салют.
 */
export const Sheet: React.FC<React.PropsWithChildren<SheetProps>> = ({
    isOpen,
    children,
    onClose,
    withOverlay = true,
    ...restProps
}) => {
    const contentWrapperRef = React.useRef<HTMLDivElement>(null);
    const handleRef = React.useRef<HTMLDivElement>(null);

    useSheetSwipe({ contentWrapperRef, handleRef, onClose });

    return (
        <StyledWrapper isOpen={isOpen} {...restProps}>
            <StyledContentWrapper isOpen={isOpen} ref={contentWrapperRef}>
                <StyledSheetHandle ref={handleRef} />
                <StyledSheetContent>{children}</StyledSheetContent>
            </StyledContentWrapper>
            {withOverlay && <StyledOverlay onClick={onClose} />}
        </StyledWrapper>
    );
};
