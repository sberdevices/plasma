import React from 'react';
import { Header } from '@sberdevices/plasma-ui/components/Header';
import { Button } from '@sberdevices/plasma-ui/components/Button';
import { Tabs, TabItem } from '@sberdevices/plasma-ui/components/Tabs';
import { Container } from '@sberdevices/plasma-ui/components/Grid';
import { Icon } from '@sberdevices/plasma-icons';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel, actionWithPersistedEvent } from '../../../helpers';

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
                contentLeft={<Icon icon="mic" />}
                text="Label"
            />
        ))}
    </>
);

const TabsGroup = () => {
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs size="m" view="clear" pilled scaleOnPress shiftRight>
            {contentItems.map((_, i) => (
                <TabItem key={`item:${i}`} isActive={i === index} onClick={() => setIndex(i)}>
                    Label
                </TabItem>
            ))}
        </Tabs>
    );
};

function TopbarSmall() {
    return (
        <ShowcaseDashedBorder style={{ width: '1350px', marginRight: '2.5rem', flexShrink: 0 }}>
            <Container>
                <Header
                    back
                    onBackClick={onBackClick}
                    logo="./images/320_320_11.jpg"
                    logoAlt="Logo"
                    title="Title"
                    subtitle="Subtitle"
                />
            </Container>
            <Container>
                <Header
                    back
                    onBackClick={onBackClick}
                    logo="./images/320_320_11.jpg"
                    logoAlt="Logo"
                    title="Title"
                    subtitle="Subtitle"
                >
                    <ButtonGroup />
                </Header>
            </Container>
            <Container>
                <Header
                    back
                    onBackClick={onBackClick}
                    logo="./images/320_320_11.jpg"
                    logoAlt="Logo"
                    title="Title"
                    subtitle="Subtitle"
                >
                    <TabsGroup />
                </Header>
            </Container>
        </ShowcaseDashedBorder>
    );
}

function TopbarBig() {
    return (
        <ShowcaseDashedBorder style={{ width: '2000px', flexShrink: 0 }}>
            <Container>
                <Header logo="./images/320_320_11.jpg" logoAlt="Logo" title="Title" subtitle="Subtitle" />
            </Container>
            <Container>
                <Header logo="./images/320_320_11.jpg" logoAlt="Logo" title="Title" subtitle="Subtitle">
                    <ButtonGroup />
                </Header>
            </Container>
            <Container>
                <Header logo="./images/320_320_11.jpg" logoAlt="Logo" title="Title" subtitle="Subtitle">
                    <TabsGroup />
                </Header>
            </Container>
        </ShowcaseDashedBorder>
    );
}

export function TopbarShowcase() {
    return (
        <>
            <ShowcaseSectionName title="Top Bar" subTitle="Верхняя навигационная панель" />
            <ShowcasePanel>
                <TopbarSmall />
                <TopbarBig />
            </ShowcasePanel>
        </>
    );
}
