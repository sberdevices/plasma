import styled, { css } from 'styled-components';

export const NotificationsBackground = styled.div<{ enabled: boolean }>`
    position: fixed;
    left: 0;
    top: 0;

    display: flex;

    width: 100%;
    height: 100vh;

    transition: 0.3s all;
    background: radial-gradient(188.98% 188.98% at 50% -88.98%, #000 0%, rgba(0, 0, 0, 0.16) 100%);
    opacity: 0;
    z-index: 100;

    ${({ enabled }) =>
        enabled
            ? css`
                  opacity: 1;
              `
            : css`
                  opacity: 0;
                  pointer-events: none;
              `}
`;
