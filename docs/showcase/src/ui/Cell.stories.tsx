import React from 'react';
import styled from 'styled-components';
import { Cell, CellListItem, CellIcon, CellDisclosure } from '@sberdevices/ui/components/Cell';
import {
    TextBox,
    TextBoxTitle,
    TextBoxSubTitle,
    TextBoxLabel,
    TextBoxCaption,
} from '@sberdevices/ui/components/TextBox';
import { Body1 } from '@sberdevices/ui/components/Typography';
import { accent } from '@sberdevices/plasma-tokens';

import { CardShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Cell',
    component: Cell,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const StyledList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const sections = {
    'Section Header': {
        Text: <Cell key="sh#0" content={<TextBox size="l" title="Название раздела" />} />,
        Disclosure: (
            <Cell
                key="sh#1"
                left={<CellIcon as="img" src="./images/320_320_7.jpg" alt="avocado" />}
                content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
                right={<CellDisclosure tabIndex={-1} />}
            />
        ),
        Detail: (
            <Cell
                key="sh#2"
                left={<CellIcon as="img" src="./images/320_320_8.jpg" alt="avocado" />}
                content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
                right={<Body1>Detail</Body1>}
                alignRight="top"
            />
        ),
    },
    'List Item': {
        List: (
            <StyledList key="li#1">
                <CellListItem
                    outlined
                    tabIndex={0}
                    left={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
                    content={
                        <TextBox>
                            <TextBoxTitle>Title</TextBoxTitle>
                            <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                        </TextBox>
                    }
                    right={<CellDisclosure tabIndex={-1} />}
                />
                <CellListItem
                    outlined
                    tabIndex={0}
                    left={<CellIcon as="img" src="./images/320_320_11.jpg" alt="avocado" />}
                    content={
                        <TextBox>
                            <TextBoxTitle>Title</TextBoxTitle>
                            <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                        </TextBox>
                    }
                    right={<Body1>Detail</Body1>}
                    alignRight="top"
                />
                <CellListItem
                    outlined
                    tabIndex={0}
                    left={<CellIcon as="img" src="./images/320_320_10.jpg" alt="avocado" />}
                    content={
                        <TextBox>
                            <TextBoxLabel>Label</TextBoxLabel>
                            <TextBoxTitle>Title</TextBoxTitle>
                            <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                            <TextBoxCaption color={accent}>Accent caption</TextBoxCaption>
                        </TextBox>
                    }
                    right={<TextBox title="Detail" subTitle="Info" />}
                />
            </StyledList>
        ),
    },
};

export const Default = () => <CardShowcase sections={sections} />;
