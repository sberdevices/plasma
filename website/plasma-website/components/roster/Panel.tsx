import { useContext, useRef, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

import { Context } from '../../store';

import { PanelView, PanelViewProps } from './PanelView';

export interface PanelProps extends PanelViewProps {
    isOpen: boolean;
}
interface HidingProps {
    isHiding?: boolean;
}

const showAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;
const hideAnimation = keyframes`
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(100%);
    }
`;

const StyledPanel = styled.div<HidingProps>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;

    ${({ isHiding }) => css`
        animation: 0.4s ${isHiding ? hideAnimation : showAnimation} ease-out;
    `}
`;

const portalId = 'plasma-modals-root';

/**
 * Модальное окно.
 * Управляет показом/скрытием, подложкой и анимацией визуальной части модального окна.
 */
export const Panel: FC<PanelProps> = ({ isOpen, onClose, ...rest }) => {
    const { state } = useContext(Context);
    const portalRef = useRef<HTMLElement | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const onDocumentClick = useCallback(
        (event) => {
            const targetIsPanel = event.target === panelRef.current;
            const targetInPanel = panelRef.current?.contains(event.target);
            if (!targetIsPanel && !targetInPanel) {
                onClose?.(event);
            }
        },
        [onClose],
    );

    useEffect(() => {
        let portal = document.getElementById(portalId);

        if (!portal) {
            portal = document.createElement('div');
            portal.setAttribute('id', portalId);
            portal.style.position = 'relative';
            portal.style.zIndex = '9000';
            document.body.appendChild(portal);
        }

        portalRef.current = portal;

        document.addEventListener('click', onDocumentClick);

        return () => {
            if (portal && document.body.contains(portal)) {
                document.body.removeChild(portal);
            }
            document.removeEventListener('click', onDocumentClick);
        };
    }, [onDocumentClick]);

    useEffect(
        () =>
            isOpen
                ? document.body.classList.add('plasma-panel-open')
                : document.body.classList.remove('plasma-panel-open'),
        [isOpen],
    );

    if (!isOpen) {
        return null;
    }

    return (
        portalRef &&
        portalRef.current &&
        ReactDOM.createPortal(
            <StyledPanel ref={panelRef}>
                <PanelView heading={state.wizardItemName} onClose={onClose} {...rest} />
            </StyledPanel>,
            portalRef.current,
        )
    );
};
