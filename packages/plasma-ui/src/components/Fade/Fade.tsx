import styled from 'styled-components';

export const Fade = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: radial-gradient(200% 200% at 50% 200%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
`;
