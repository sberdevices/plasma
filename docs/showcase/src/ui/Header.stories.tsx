import React from 'react';
import { Button } from '@sberdevices/ui/components/Button';
import { Container } from '@sberdevices/ui/components/Grid';
import { Header } from '@sberdevices/ui/components/Header';
import { Tabs, TabItem } from '@sberdevices/ui/components/Tabs';

import { actionWithPersistedEvent, ShowcaseDivider, UIStoryDecorator, IconPlaceholder } from '../helpers';

export default {
    title: 'UI/Layout/Header',
    component: Header,
    decorators: [UIStoryDecorator],
};

const onBackClick = actionWithPersistedEvent('onBackClick');

const contentItems = [0, 0, 0];

const ButtonGroup = () => (
    <>
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
    </>
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
        <Header back onBackClick={onBackClick} logo="./images/320_320_10.jpg" logoAlt="Logo" title="Header title text">
            <Button view="clear" size="s" pin="circle-circle" contentLeft={<IconPlaceholder />} />
            <Button view="clear" size="s" pin="circle-circle" contentLeft={<IconPlaceholder />} shiftRight />
        </Header>
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
    </Container>
);
