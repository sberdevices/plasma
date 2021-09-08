import styled from 'styled-components';

const gradients = {
    top: 'radial-gradient(200% 200% at 50% -100%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
    bottom: 'radial-gradient(200% 200% at 50% 200%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
};

export const Fade = styled.div<{ placement?: 'top' | 'bottom' }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: ${({ placement = 'bottom' }) => gradients[placement]};
`;
