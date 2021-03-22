import styled from 'styled-components';

const sizes = {
    xs: 'width: 1rem;height: 1rem;border-width: 1rem 1rem 0 0;',
    s: 'width: 1.5rem;height: 1.5rem;border-width: 1.5rem 1.5rem 0 0;',
    m: 'width: 2.25rem;height: 2.25rem;border-width: 2.25rem 2.25rem 0 0;',
    l: 'width: 3rem;height: 3rem;border-width: 3rem 3rem 0 0;',
    xl: 'width: 3.5rem;height: 3.5rem;border-width: 3.5rem 3.5rem 0 0;',
};

export const IconPlaceholder = styled.div<{ size?: keyof typeof sizes; color?: string }>`
    ${({ size }) => sizes[size || 's']};
    box-sizing: border-box;
    border-radius: 50%;
    border-style: solid;
    color: ${({ color }) => color || 'inherit'};
`;
