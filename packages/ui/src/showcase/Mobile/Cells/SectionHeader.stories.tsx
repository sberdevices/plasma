import React from 'react';
import styled from 'styled-components';

import { Cell, CellDisclosure, CellIcon } from '../../../components/Cell';
import { TextBox, TextBoxBiggerTitle, TextBoxSubTitle } from '../../../components/TextBox';
import { InContainerDecorator, ShowcaseDashedBorder } from '../../../helpers';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

export default {
    title: 'Showcase/Mobile/Cells',
    decorators: [InContainerDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const ContentWrapper = styled.div`
    display: flex;
    padding: 40px 80px;
`;

const variants = [
    <Cell content={<TextBox size="l" title="Название раздела" />} />,
    <Cell content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />} />,
    <Cell
        content={<TextBox size="l" title="Название раздела" />}
        right={<CellDisclosure onClick={() => undefined} />}
    />,
    <Cell
        content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
        right={<CellDisclosure onClick={() => undefined} />}
        alignRight="top"
    />,
    <Cell content={<TextBox size="l" title="Название раздела" />} right={<TextBox title="Detail" />} />,
    <Cell
        content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
        right={<TextBox title="Detail" />}
        alignRight="top"
    />,
    <Cell
        content={<TextBoxBiggerTitle>Headline 1</TextBoxBiggerTitle>}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
    />,
    <Cell
        content={
            <TextBox>
                <TextBoxBiggerTitle>Headline 1</TextBoxBiggerTitle>
                <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
            </TextBox>
        }
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        alignLeft="top"
    />,
];

export const SectionHeader = () => (
    <ThemeProvider>
        <SectionName title="Section Header" description="Заглавные ячейки для списков и других смысловых групп" />
        <ContentWrapper>
            <ShowcaseDashedBorder style={{ width: 320 }}>
                {variants.map((variant, i) => (
                    <div key={i} style={{ marginBottom: 30 }}>
                        {variant}
                    </div>
                ))}
            </ShowcaseDashedBorder>
        </ContentWrapper>
    </ThemeProvider>
);
