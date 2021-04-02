import styled from 'styled-components';

const sizes = {
    xs: 'width: 1rem;height: 1rem;',
    s: 'width: 1.5rem;height: 1.5rem;',
    m: 'width: 2.25rem;height: 2.25rem;',
    l: 'width: 3rem;height: 3rem;',
    xl: 'width: 3.5rem;height: 3.5rem;',
};

export const IconPlaceholder = styled.div<{ size?: keyof typeof sizes }>`
    ${({ size }) => sizes[size || 's']};
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.32);
`;
