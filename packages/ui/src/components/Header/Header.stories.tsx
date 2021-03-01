import React from 'react';
import styled from 'styled-components';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconMic, IconPlus, IconTrash } from '@sberdevices/plasma-icons';

import { Button } from '../Button';
import { Tabs, TabItem } from '../Tabs';

import {
    Header,
    HeaderRoot,
    HeaderBack,
    HeaderLogo,
    HeaderTitleWrapper,
    HeaderSubtitle,
    HeaderTitle,
    HeaderContent,
} from '.';

const contentTypes = ['None', 'Buttons', 'Tabs', 'MobileButtons'];

const StyledContentWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-column-gap: 0.75rem;
    width: 1fr;
`;

const Content = () => {
    const contentType = select('Content type', contentTypes, 'Buttons');
    const contentItems = contentType !== 'None' && Array(number('Content items', 3)).fill(0);
    const enableIcons = contentType !== 'None' && boolean('Enable icons', true);
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <StyledContentWrapper>
            {contentType === 'Buttons' &&
                contentItems.map((_, i) => (
                    <Button
                        key={`item:${i}`}
                        size="s"
                        view="clear"
                        shiftRight={i === contentItems.length - 1}
                        contentLeft={enableIcons && <IconMic color="inherit" size="s" />}
                        text="Button"
                    />
                ))}
            {contentType === 'Tabs' && (
                <Tabs size="m" view="clear" pilled scaleOnPress shiftRight>
                    {contentItems.map((_, i) => (
                        <TabItem
                            key={`item:${i}`}
                            isActive={i === activeTab}
                            onClick={() => setActiveTab(i)}
                            contentLeft={enableIcons && <IconMic color="inherit" size="s" />}
                        >
                            Tab
                        </TabItem>
                    ))}
                </Tabs>
            )}
            {contentType === 'MobileButtons' && (
                <>
                    <Button
                        view="clear"
                        size="s"
                        pin="circle-circle"
                        contentLeft={<IconPlus color="inherit" size="s" />}
                    />
                    <Button
                        view="clear"
                        size="s"
                        pin="circle-circle"
                        contentLeft={<IconTrash color="inherit" size="s" />}
                        shiftRight
                    />
                </>
            )}
        </StyledContentWrapper>
    );
};

export const Default = () => (
    <Header
        back={boolean('Back button', true) as true}
        logo={boolean('Logo', true) && './images/logo.png'}
        logoAlt="Logo"
        title={text('title', 'Header title text')}
        subtitle={text('subtitle', 'Subtitle text')}
        onBackClick={action('onBackClick')}
        style={{ minWidth: 1056 }}
    >
        <Content />
    </Header>
);

export const CustomAssembly = () => (
    <HeaderRoot style={{ minWidth: 1056 }}>
        <HeaderBack onClick={action('onBackClick')} />
        <HeaderLogo src="./images/logo.png" alt="Logo" />
        <HeaderTitleWrapper>
            <HeaderTitle>{text('title', 'Header title text')}</HeaderTitle>
            <HeaderSubtitle>{text('subtitle', 'Subtitle text')}</HeaderSubtitle>
        </HeaderTitleWrapper>
        <HeaderContent>
            <Content />
        </HeaderContent>
    </HeaderRoot>
);

CustomAssembly.parameters = {
    chromatic: {
        disable: true,
    },
};
