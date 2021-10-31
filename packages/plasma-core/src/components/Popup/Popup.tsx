import React, { HTMLAttributes, ReactNode, memo, useRef, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Всплывающее окно раскрыто или нет.
     */
    isOpen?: boolean;
    /**
     * Способо всплывающего окна - наведение или клик мышью.
     */
    trigger: 'hover' | 'click';
    /**
     * Расположение всплывающего окна.
     */
    placement: 'bottom' | 'right' | 'left';
    /**
     * Элемент, при нажатии на который произойдет вызов всплывающего окна.
     */
    disclosure?: ReactNode;
    /**
     * Контент всплывающего окна.
     */
    children?: ReactNode;
    /**
     * Событие сворачивания/разворачивания всплывающего окна.
     */
    onToggle?: (isOpen: boolean) => void;
}

const StyledRoot = styled.div`
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
`;
const StyledPopup = styled.div<Pick<PopupProps, 'placement'>>`
    position: absolute;
    z-index: 1;
    padding: var(--plasma-popup-padding);
    margin: var(--plasma-popup-margin);
    width: var(--plasma-popup-width);

    ${({ placement }) => {
        switch (placement) {
            case 'left':
                return css`
                    top: 0;
                    right: 100%;
                `;
            case 'right':
                return css`
                    top: 0;
                    left: 100%;
                `;
            case 'bottom':
            default:
                return css`
                    top: 100%;
                    left: 0;
                `;
        }
    }}
`;

/**
 * Всплывающее окно с возможностью позиционирования
 * и вызова по клику либо ховеру.
 */
export const Popup = memo<PopupProps>(({ disclosure, children, isOpen, trigger, placement, onToggle, ...rest }) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const onDocumentClick = useCallback(
        (event) => {
            const targetIsRoot = event.target === rootRef.current;
            const targetInRoot = rootRef.current?.contains(event.target);

            if (!targetIsRoot && !targetInRoot) {
                onToggle?.(false);
            }
        },
        [onToggle],
    );

    const onClick = useCallback(
        (event) => {
            if (trigger === 'click') {
                const targetIsPopup = event.target === popupRef;
                const targetInPopup = popupRef.current?.contains(event.target);

                if (!targetIsPopup && !targetInPopup) {
                    onToggle?.(!isOpen);
                }
            }
        },
        [trigger, isOpen, onToggle],
    );

    const onMouseEnter = useCallback(() => {
        if (trigger === 'hover') {
            onToggle?.(true);
        }
    }, [trigger, onToggle]);

    const onMouseLeave = useCallback(() => {
        if (trigger === 'hover') {
            onToggle?.(false);
        }
    }, [trigger, onToggle]);

    useEffect(() => {
        document.addEventListener('click', onDocumentClick);
        return () => document.removeEventListener('click', onDocumentClick);
    }, []);

    return (
        <StyledRoot ref={rootRef} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>
            {disclosure}
            {children && (
                <StyledPopup ref={popupRef} placement={placement} style={{ display: isOpen ? 'block' : 'none' }}>
                    {children}
                </StyledPopup>
            )}
        </StyledRoot>
    );
});
