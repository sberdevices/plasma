import React from 'react';
import styled from 'styled-components';
import { Footnote1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { Default as CheckboxStory } from '../../ui/Checkbox.stories';
import { Default as RadioboxStory } from '../../ui/Radiobox.stories';
import { Default as SwitchStory } from '../../ui/Switch.stories';
import { Default as PaginationDotsStory } from '../../ui/PaginationDots.stories';
import { Default as StepperStory } from '../../ui/Stepper.stories';
import { ShowcasePanel, ShowcaseDashedBorder, ShowcaseSectionName, UIStoryDecorator } from '../../helpers';

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
    title: 'Showcase/Device',
    decorators: [UIStoryDecorator],
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
    <>
        <ShowcaseSectionName title="Checkbox" subTitle="Чекбокс" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <StyledDescription>
                <StyledFootnote1 style={{ marginBottom: '1.75rem' }}>Default</StyledFootnote1>
                <StyledFootnote1>Disabled</StyledFootnote1>
            </StyledDescription>
            <ShowcaseDashedBorder style={{ width: '4.25rem' }}>
                {(CheckboxStory as any)({ withLabels: false })}
            </ShowcaseDashedBorder>
        </ShowcasePanel>

        <ShowcaseSectionName title="Radio" subTitle="Радиокнопка" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <StyledDescription>
                <StyledFootnote1 style={{ marginBottom: 28 }}>Default</StyledFootnote1>
                <StyledFootnote1>Disabled</StyledFootnote1>
            </StyledDescription>
            <ShowcaseDashedBorder style={{ width: '4.25rem' }}>
                {(RadioboxStory as any)({ withLabels: false })}
            </ShowcaseDashedBorder>
        </ShowcasePanel>

        <ShowcaseSectionName title="Switch" subTitle="Переключатель" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <StyledDescription>
                <StyledFootnote1 style={{ marginBottom: 30 }}>Default</StyledFootnote1>
                <StyledFootnote1 style={{ marginBottom: 30 }}>Pressed</StyledFootnote1>
                <StyledFootnote1>Disabled</StyledFootnote1>
            </StyledDescription>
            <ShowcaseDashedBorder style={{ width: '6.625rem' }}>
                {(SwitchStory as any)({ withLabels: false })}
            </ShowcaseDashedBorder>
        </ShowcasePanel>

        <ShowcaseSectionName title="PaginationDots" subTitle="Индикатор активной страницы" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <PaginationDotsStory />
        </ShowcasePanel>

        <ShowcaseSectionName title="Stepper" subTitle="Контролл количества" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: '3.75rem' }}>
            <ShowcaseDashedBorder>
                <StepperStory />
            </ShowcaseDashedBorder>
        </ShowcasePanel>
    </>
);
