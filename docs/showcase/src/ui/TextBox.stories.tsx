import React from 'react';
import {
    TextBox,
    TextBoxTitle,
    TextBoxSubTitle,
    TextBoxCaption,
    TextBoxBigTitle,
    TextBoxLabel,
} from '@sberdevices/plasma-ui/components/TextBox';

import { CardShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/TextBox',
    component: TextBox,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const sections = {
    Default: {
        'Title + Subtitle': <TextBox title="Title" subTitle="Subtitle" />,
        'Title + Subtitle + Caption': <TextBox title="Title" subTitle="Subtitle" caption="Caption" />,
        'Label + Title': <TextBox label="Label" title="Title" />,
        'Label + BigTitle': <TextBox label="Label" title="Title" size="l" />,
        'Caption + Body': (
            <TextBox>
                <TextBoxCaption>Caption</TextBoxCaption>
                <TextBoxTitle>Title</TextBoxTitle>
            </TextBox>
        ),
        'Headline3 + Subtitle': (
            <TextBox title="" subTitle="" size="l">
                <TextBoxBigTitle>Title</TextBoxBigTitle>
                <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
            </TextBox>
        ),
        'Label + Title + Subtitle': (
            <TextBox>
                <TextBoxLabel>Label</TextBoxLabel>
                <TextBoxTitle>Title</TextBoxTitle>
                <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
            </TextBox>
        ),
    },
};

export const Default = () => <CardShowcase sections={sections} colWidth="max-content" />;
