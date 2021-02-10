import React from 'react';
import styled from 'styled-components';

import {
    Default as ButtonStoryDefault,
    Squared as ButtonStorySquared,
    Circled as ButtonStoryCircled,
} from '../../../components/Button/Button.stories';
import { ShowcaseDashedBorder } from '../../../helpers';
import { Panel } from '../../Panel';
import { Divider } from '../../Divider';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

export default {
    title: 'Showcase/Mobile',
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const StyledPanel = styled(Panel)`
    --plasma-docs-buttons-horizontal-spacing: 2.5rem;
    --plasma-docs-buttons-vertical-spacing: 2.5rem;
    --plasma-docs-buttons-cell-spacing: 1.25rem;
    --plasma-docs-buttons-border-spacing: 2.5rem;

    flex-wrap: nowrap;
    align-items: initial;
`;
const StyledDashedBorder = styled(ShowcaseDashedBorder)`
    padding: 2.5rem;
`;

const ButtonsSizeGroup: React.FC<{ size: 's' | 'm' }> = ({ size }) => {
    return (
        <>
            <StyledPanel>
                <ButtonStoryDefault size={size} isMobile />
            </StyledPanel>
            <StyledPanel style={{ display: 'flex', marginBottom: '3.75rem' }}>
                <StyledDashedBorder style={{ marginRight: '1.25rem' }}>
                    <ButtonStorySquared size={size} isMobile />
                </StyledDashedBorder>
                <StyledDashedBorder>
                    <ButtonStoryCircled size={size} isMobile />
                </StyledDashedBorder>
            </StyledPanel>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Buttons = () => {
    return (
        <ThemeProvider>
            <Container>
                <SectionName title="Button S 40" description="Кнопки размера 40" />
                <ButtonsSizeGroup size="s" />
                <Divider />
                <SectionName title="Button M 48" description="Кнопки размера 48" />
                <ButtonsSizeGroup size="m" />
            </Container>
        </ThemeProvider>
    );
};
