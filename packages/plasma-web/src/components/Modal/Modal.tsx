import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

import { ModalsContext } from './ModalsContext';
import { ModalView, ModalViewProps } from './ModalView';

export interface ModalProps extends ModalViewProps {
    isOpen: boolean;
}
interface HidingProps {
    isHiding?: boolean;
}

const wrapperHideAnimation = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;
const bodyShowAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-100%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;
const bodyHideAnimation = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(-100%);
    }
`;

const StyledWrapper = styled.div<HidingProps>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isHiding }) =>
        isHiding &&
        css`
            animation: 0.1s ${wrapperHideAnimation} ease-out;
        `}
`;
const StyledOverlay = styled.div<{ transparent?: boolean }>`
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: ${({ transparent }) => (transparent ? 'transparent' : 'rgba(8, 8, 8, 0.2)')};

    cursor: pointer;
`;
const StyledModal = styled.div<HidingProps>`
    && {
        position: absolute;
    }

    ${({ isHiding }) => css`
        animation: 0.4s ${isHiding ? bodyHideAnimation : bodyShowAnimation} ease-out;
    `}
`;

const generateId = () => `${Date.now()}-${Math.round(Math.random() * 1000000)}`;

/**
 * Модальное окно.
 * Управляет показом/скрытием, подложкой и анимацией визуальной части модального окна.
 */
export const Modal: React.FC<ModalProps> = ({ id, isOpen, onClose, ...rest }) => {
    const innerId = React.useMemo(() => id || generateId(), [id]);
    const portalRef = React.useRef<HTMLElement | null>(null);
    const modals = React.useContext(ModalsContext);

    React.useEffect(() => {
        const portalId = 'plasma-modals-root';
        let portal = document.getElementById(portalId);

        if (!portal) {
            portal = document.createElement('div');
            portal.setAttribute('id', portalId);
            portal.style.position = 'relative';
            portal.style.zIndex = '9000';
            document.body.appendChild(portal);
        }

        portalRef.current = portal;

        return () => {
            if (portal && document.body.contains(portal)) {
                document.body.removeChild(portal);
            }
        };
    }, []);

    if (isOpen) {
        modals.register(innerId);
    } else {
        modals.unregister(innerId);
        return null;
    }

    return (
        portalRef &&
        portalRef.current &&
        ReactDOM.createPortal(
            <StyledWrapper>
                <StyledOverlay transparent={modals.items.indexOf(innerId) !== 0} onClick={onClose} />
                <StyledModal>
                    <ModalView onClose={onClose} {...rest} />
                </StyledModal>
            </StyledWrapper>,
            portalRef.current,
        )
    );
};
