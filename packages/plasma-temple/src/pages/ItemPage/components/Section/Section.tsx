import styled, { css } from 'styled-components';

export interface SectionProps {
    withSpatNav?: boolean;
    className?: string;
}

export const Section = styled.section<SectionProps>`
    ${(props) =>
        props.withSpatNav &&
        css`
            --spatial-navigation-contain: contain;
        `}
    box-sizing: border-box;
`;
