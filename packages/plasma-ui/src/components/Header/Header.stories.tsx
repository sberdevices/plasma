import React, { useState } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
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

interface ContentComponentProps {
    contentType: string;
    contentItemsNumber: number;
    enableIcons: boolean;
}

const Content: React.FC<ContentComponentProps> = ({ contentType, contentItemsNumber, enableIcons }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const contentItems = Array(contentItemsNumber).fill(0);

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

    if (contentType === 'MobileButtons') {
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

export default {
    title: 'Layout/Header',
} as Meta;

export const Default: Story<HeaderProps & { enableLogo: boolean; displayGrid: boolean } & ContentComponentProps> = ({
    enableLogo,
    logoAlt,
    title,
    subtitle,
    ...rest
}) => {
    const [isBack, setIsBack] = useState(true);
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
            logo={enableLogo && './images/320_320_12.jpg'}
            logoAlt={enableLogo && logoAlt}
            title={title}
            subtitle={subtitle}
        >
            <Content {...rest} />
        </Header>
    );
};

Default.args = {
    displayGrid: true,
    enableLogo: true,
    logoAlt: 'Logo',
    title: 'Header title text is very long to fit given width',
    subtitle: 'Subtitle text is very long to fit given width even this has smaller font size',
    contentType: 'Buttons',
    contentItemsNumber: 3,
    enableIcons: true,
};

Default.argTypes = {
    contentType: {
        control: {
            type: 'select',
            options: contentTypes,
        },
    },
};

interface CustomAssemblyProps {
    displayGrid: boolean;
    variant: string;
    title: string;
    subtitle: string;
    label: string;
}

export const CustomAssembly: Story<CustomAssemblyProps & ContentComponentProps> = ({
    variant,
    title,
    subtitle,
    label,
    ...rest
}) => {
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
            <HeaderLogo src="./images/320_320_12.jpg" alt="Logo" />
            <HeaderTitleWrapper>
                {variant === 'title+subtitle' && (
                    <>
                        <HeaderTitle>{title}</HeaderTitle>
                        <HeaderSubtitle>{subtitle}</HeaderSubtitle>
                    </>
                )}
                {variant === 'label+title' && (
                    <>
                        <HeaderSubtitle>{label}</HeaderSubtitle>
                        <HeaderTitle>{title}</HeaderTitle>
                    </>
                )}
                {variant === 'title' && <HeaderTitle>{title}</HeaderTitle>}
            </HeaderTitleWrapper>
            <HeaderContent>
                <Content {...rest} />
            </HeaderContent>
        </HeaderRoot>
    );
};

CustomAssembly.args = {
    displayGrid: true,
    variant: 'title+subtitle',
    title: 'Header title text',
    subtitle: 'Subtitle text',
    label: 'Label text',
    contentType: 'Buttons',
    contentItemsNumber: 3,
    enableIcons: true,
};

CustomAssembly.argTypes = {
    ...Default.argTypes,
    variant: {
        control: {
            type: 'inline-radio',
            options: ['title+subtitle', 'label+title', 'title'],
        },
    },
};

CustomAssembly.parameters = {
    chromatic: {
        disable: true,
    },
};
