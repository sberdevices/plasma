import React from 'react';
import styled from 'styled-components';
import { Cell, CellListItem, CellIcon, CellDisclosure } from '@sberdevices/plasma-ui/components/Cell';
import {
    TextBox,
    TextBoxTitle,
    TextBoxSubTitle,
    TextBoxLabel,
    TextBoxCaption,
} from '@sberdevices/plasma-ui/components/TextBox';
import { Body1 } from '@sberdevices/plasma-ui/components/Typography';
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
                contentLeft={<CellIcon as="img" src="./images/320_320_7.jpg" alt="avocado" />}
                content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
                contentRight={<CellDisclosure tabIndex={-1} />}
            />
        ),
        Detail: (
            <Cell
                key="sh#2"
                contentLeft={<CellIcon as="img" src="./images/320_320_8.jpg" alt="avocado" />}
                content={<TextBox size="l" title="Название раздела" subTitle="Описание раздела" />}
                contentRight={<Body1>Detail</Body1>}
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
                    contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
                    content={
                        <TextBox>
                            <TextBoxTitle>Title</TextBoxTitle>
                            <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                        </TextBox>
                    }
                    contentRight={<CellDisclosure tabIndex={-1} />}
                />
                <CellListItem
                    outlined
                    tabIndex={0}
                    contentLeft={<CellIcon as="img" src="./images/320_320_11.jpg" alt="avocado" />}
                    content={
                        <TextBox>
                            <TextBoxTitle>Title</TextBoxTitle>
                            <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                        </TextBox>
                    }
                    contentRight={<Body1>Detail</Body1>}
                    alignRight="top"
                />
                <CellListItem
                    outlined
                    tabIndex={0}
                    contentLeft={<CellIcon as="img" src="./images/320_320_10.jpg" alt="avocado" />}
                    content={
                        <TextBox>
                            <TextBoxLabel>Label</TextBoxLabel>
                            <TextBoxTitle>Title</TextBoxTitle>
                            <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                            <TextBoxCaption color={accent}>Accent caption</TextBoxCaption>
                        </TextBox>
                    }
                    contentRight={<TextBox title="Detail" subTitle="Info" />}
                />
            </StyledList>
        ),
    },
};

export const Default = () => <CardShowcase sections={sections} />;
