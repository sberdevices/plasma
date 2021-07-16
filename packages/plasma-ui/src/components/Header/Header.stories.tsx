import React, { useState } from 'react';
import styled from 'styled-components';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconMic, IconPlus, IconTrash } from '@sberdevices/plasma-icons';

import { Button } from '../Button';
import { Tabs, TabItem } from '../Tabs';

import {
    Header,
    HeaderProps,
    HeaderRoot,
    HeaderMinimize,
    HeaderBack,
    HeaderLogo,
    HeaderTitleWrapper,
    HeaderSubtitle,
    HeaderTitle,
    HeaderContent,
} from '.';

const contentTypes = ['Buttons', 'Tabs', 'MobileButtons', ''];

const StyledContentGrid = styled.div<{ $colCount: number }>`
    display: grid;
    grid-template-columns: ${({ $colCount }) => `repeat(${$colCount}, max-content)`};
    grid-column-gap: 0.75rem;
`;

const Content = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const contentType = select('Content type', contentTypes, 'Buttons');
    const contentItems = contentType !== 'None' && Array(number('Content items', 3)).fill(0);
    const enableIcons = contentType !== 'None' && boolean('Enable icons', true);

    if (contentType === 'Buttons') {
        return (
            <StyledContentGrid $colCount={contentItems.length}>
                {contentItems.map((_, i) => (
                    <Button
                        key={`item:${i}`}
                        size="s"
                        view="clear"
                        shiftRight={i === contentItems.length - 1}
                        contentLeft={enableIcons && <IconMic color="inherit" size="s" />}
                        text="Button"
                    />
                ))}
            </StyledContentGrid>
        );
    }

    if (contentType === 'Tabs') {
        return (
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
        );
    }

    if (contentType === 'Mobile') {
        return (
            <StyledContentGrid $colCount={2}>
                <Button view="clear" size="s" pin="circle-circle" contentLeft={<IconPlus color="inherit" size="s" />} />
                <Button
                    view="clear"
                    size="s"
                    pin="circle-circle"
                    contentLeft={<IconTrash color="inherit" size="s" />}
                    shiftRight
                />
            </StyledContentGrid>
        );
    }

    return null;
};

export const Default = () => {
    const [isBack, setIsBack] = useState(true);
    const logo = boolean('logo', true);
    const props: HeaderProps = isBack
        ? {
              back: true,
              onBackClick: () => {
                  action('onBackClick')();
                  setIsBack(false);
              },
          }
        : {
              minimize: true,
              onMinimizeClick: () => {
                  action('onMinimizeClick')();
                  setIsBack(true);
              },
          };

    return (
        <Header
            {...props}
            logo={logo && './images/logo.png'}
            logoAlt={logo && text('logoAlt', 'Logo')}
            title={text('title', 'Header title text')}
            subtitle={text('subtitle', 'Subtitle text')}
        >
            <Content />
        </Header>
    );
};

export const CustomAssembly = () => {
    const [isBack, setIsBack] = useState(true);

    return (
        <HeaderRoot>
            {isBack ? (
                <HeaderBack
                    onClick={() => {
                        action('onBackClick')();
                        setIsBack(false);
                    }}
                />
            ) : (
                <HeaderMinimize
                    onClick={() => {
                        action('onMinimizeClick')();
                        setIsBack(true);
                    }}
                />
            )}
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
};

CustomAssembly.parameters = {
    chromatic: {
        disable: true,
    },
};
