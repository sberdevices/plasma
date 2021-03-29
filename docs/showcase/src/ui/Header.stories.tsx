import React from 'react';
import styled from 'styled-components';
import { Button } from '@sberdevices/ui/components/Button';
import { Container } from '@sberdevices/ui/components/Grid';
import { Header } from '@sberdevices/ui/components/Header';
import { Tabs, TabItem } from '@sberdevices/ui/components/Tabs';

import {
    actionWithPersistedEvent,
    ShowcaseDivider,
    UIStoryDecorator,
    UIMobileDecorator,
    IconPlaceholder,
} from '../helpers';

export default {
    title: 'UI/Layout/Header',
    component: Header,
};

const onBackClick = actionWithPersistedEvent('onBackClick');

const contentItems = [0, 0, 0];

const StyledContentGrid = styled.div<{ $colCount: number }>`
    display: grid;
    grid-template-columns: ${({ $colCount }) => `repeat(${$colCount}, max-content)`};
    grid-column-gap: 0.75rem;
`;

const MobileButtonGroup = () => (
    <StyledContentGrid $colCount={2}>
        <Button view="clear" size="s" pin="circle-circle" contentLeft={<IconPlaceholder />} />
        <Button view="clear" size="s" pin="circle-circle" contentLeft={<IconPlaceholder />} shiftRight />
    </StyledContentGrid>
);
const ButtonGroup = () => (
    <StyledContentGrid $colCount={3}>
        {contentItems.map((_, i) => (
            <Button
                key={`item:${i}`}
                size="s"
                view="clear"
                shiftRight={i === contentItems.length - 1}
                contentLeft={<IconPlaceholder />}
                text="Button"
            />
        ))}
    </StyledContentGrid>
);
const TabsGroup = () => {
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs size="m" view="clear" pilled scaleOnPress shiftRight>
            {contentItems.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    isActive={i === index}
                    onClick={() => setIndex(i)}
                    contentLeft={<IconPlaceholder />}
                >
                    Tab
                </TabItem>
            ))}
        </Tabs>
    );
};

export const Default = () => (
    <Container>
        <Header title="Title" />
        <ShowcaseDivider />
        <Header
            back
            onBackClick={onBackClick}
            logo="./images/320_320_10.jpg"
            logoAlt="Logo"
            title="Header title text"
        />
        <ShowcaseDivider />
        <Header
            back
            onBackClick={onBackClick}
            logo="./images/320_320_11.jpg"
            logoAlt="Logo"
            title="Header title text is very long to fit given width"
            subtitle="Subtitle text is very long to fit given width even this has smaller font size"
        >
            <ButtonGroup />
        </Header>
        <ShowcaseDivider />
        <Header
            back
            onBackClick={onBackClick}
            logo="./images/320_320_12.jpg"
            logoAlt="Logo"
            title="Header title text is very long to fit given width"
            subtitle="Subtitle text is very long to fit given width even this has smaller font size"
        >
            <TabsGroup />
        </Header>
        <ShowcaseDivider />
    </Container>
);

Default.decorators = [UIStoryDecorator];

export const Mobile = () => (
    <Container>
        <Header back onBackClick={onBackClick} logo="./images/320_320_10.jpg" logoAlt="Logo" title="AppName" />
        <ShowcaseDivider />
        <Header back onBackClick={onBackClick} logo="./images/320_320_11.jpg" logoAlt="Logo" title="AppName">
            <MobileButtonGroup />
        </Header>
        <ShowcaseDivider />
    </Container>
);

Mobile.decorators = [UIMobileDecorator];
Mobile.parameters = {
    viewport: {
        defaultViewport: 'iphone5',
    },
    chromatic: {
        viewports: [320],
    },
};
