import React from 'react';
import styled from 'styled-components';
import { Cell, CellDisclosure, CellIcon } from '@sberdevices/plasma-ui/components/Cell';
import { TextBox, TextBoxBiggerTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';

import { ShowcasePanel, ShowcaseSectionName, UIStoryDecorator, InContainerDecorator } from '../../helpers';

export default {
    title: 'Showcase/Device/Cells',
    decorators: [UIStoryDecorator, InContainerDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const StyledPanel = styled(ShowcasePanel)`
    width: 20rem;
    flex-direction: column;
`;
const StyledRow = styled.div`
    margin-bottom: 1.875rem;
`;

const variants = [
    <Cell content={<TextBox size="l" title="Название раздела" />} />,
    <Cell content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />} />,
    <Cell
        content={<TextBox size="l" title="Название раздела" />}
        contentRight={<CellDisclosure onClick={() => undefined} />}
    />,
    <Cell
        content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
        contentRight={<CellDisclosure onClick={() => undefined} />}
        alignRight="top"
    />,
    <Cell content={<TextBox size="l" title="Название раздела" />} contentRight={<TextBox title="Detail" />} />,
    <Cell
        content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
        contentRight={<TextBox title="Detail" />}
        alignRight="top"
    />,
    <Cell
        content={<TextBoxBiggerTitle>Headline 1</TextBoxBiggerTitle>}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
    />,
    <Cell
        content={
            <TextBox>
                <TextBoxBiggerTitle>Headline 1</TextBoxBiggerTitle>
                <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
            </TextBox>
        }
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        alignLeft="top"
    />,
];

export const SectionHeader = () => (
    <>
        <ShowcaseSectionName title="Section Header" subTitle="Заглавные ячейки для списков и других смысловых групп" />
        <StyledPanel>
            {variants.map((variant, i) => (
                <StyledRow key={i}>{variant}</StyledRow>
            ))}
        </StyledPanel>
    </>
);
