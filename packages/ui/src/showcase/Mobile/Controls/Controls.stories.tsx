import React from 'react';
import styled from 'styled-components';
import { secondary } from '@sberdevices/plasma-tokens';

import { Default as CheckboxStory } from '../../../components/Checkbox/Checkbox.stories';
import { Default as RadioboxStory } from '../../../components/Radiobox/Radiobox.stories';
import { Default as SwitchStory } from '../../../components/Switch/Switch.stories';
import { Default as PaginationDotsStory } from '../../../components/PaginationDots/PaginationDots.stories';
import { Default as StepperStory } from '../../../components/Stepper/Stepper.stories';
import { Footnote1 } from '../../../components/Typography';
import { ShowcaseDashedBorder } from '../../../helpers';
import { Panel } from '../../Panel';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

const StyledDescription = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.25rem 0;
    margin-right: 2.5rem;
`;

const StyledFootnote1 = styled(Footnote1)`
    color: ${secondary};
    text-align: right;
`;

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

export const Controls = () => (
    <ThemeProvider>
        <SectionName title="Checkbox" description="Чекбокс" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <StyledDescription>
                <StyledFootnote1 style={{ marginBottom: 28 }}>Default</StyledFootnote1>
                <StyledFootnote1>Disabled</StyledFootnote1>
            </StyledDescription>
            <ShowcaseDashedBorder style={{ width: '4.25rem' }}>
                <CheckboxStory withLabels={false} />
            </ShowcaseDashedBorder>
        </Panel>

        <SectionName title="Radio" description="Радиокнопка" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <StyledDescription>
                <StyledFootnote1 style={{ marginBottom: 28 }}>Default</StyledFootnote1>
                <StyledFootnote1>Disabled</StyledFootnote1>
            </StyledDescription>
            <ShowcaseDashedBorder style={{ width: '4.25rem' }}>
                <RadioboxStory withLabels={false} />
            </ShowcaseDashedBorder>
        </Panel>

        <SectionName title="Switch" description="Переключатель" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <StyledDescription>
                <StyledFootnote1 style={{ marginBottom: 30 }}>Default</StyledFootnote1>
                <StyledFootnote1 style={{ marginBottom: 30 }}>Pressed</StyledFootnote1>
                <StyledFootnote1>Disabled</StyledFootnote1>
            </StyledDescription>
            <ShowcaseDashedBorder style={{ width: '6.625rem' }}>
                <SwitchStory withLabels={false} />
            </ShowcaseDashedBorder>
        </Panel>

        <SectionName title="PaginationDots" description="Индикатор активной страницы" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <ShowcaseDashedBorder style={{ width: '4rem' }}>
                <PaginationDotsStory />
            </ShowcaseDashedBorder>
        </Panel>

        <SectionName title="Stepper" description="Контролл количества" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: '3.75rem' }}>
            <ShowcaseDashedBorder style={{ width: '6.75rem' }}>
                <StepperStory />
            </ShowcaseDashedBorder>
        </Panel>
    </ThemeProvider>
);
