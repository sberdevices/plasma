import React from 'react';
import styled from 'styled-components';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Icon } from '@sberdevices/plasma-icons';

import { GridLines } from '../../helpers/GridLines';
import { mediaQuery } from '../../utils';
import { Button } from '../Button';
import { Container } from '../Grid';
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

const MobileHeaderButtons = styled.div`
    display: none;

    ${mediaQuery('S')(`
        display: flex;
    `)}
`;
const RegularHeaderButtons = styled.div`
    display: flex;

    ${mediaQuery('S')(`
        display: none;
    `)}
`;

const icons = ['clock', 'settings', 'house', 'trash'];
const contentTypes = ['None', 'Buttons', 'Tabs'];

const AppBarContent = () => {
    const contentType = select('Content type', contentTypes, 'None');
    const contentItems = Array(number('Content items', 3)).fill(text('Content text', 'Label'));
    const enableIcons = boolean('Enable icons', true);
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <>
            {contentType === 'Buttons' &&
                contentItems.map((label, i) => (
                    <Button
                        key={`item:${i}`}
                        size="s"
                        view="clear"
                        shiftRight={i === contentItems.length - 1}
                        contentLeft={enableIcons && <Icon icon={icons[i % icons.length]} size="s" />}
                        text={label}
                        style={{ marginLeft: 12 }}
                    />
                ))}
            {contentType === 'Tabs' && (
                <Tabs size="m" view="clear" pilled scaleOnInteraction shiftRight>
                    {contentItems.map((label, i) => (
                        <TabItem
                            key={`item:${i}`}
                            isActive={i === activeTab}
                            onClick={() => setActiveTab(i)}
                            contentLeft={enableIcons && <Icon icon={icons[i % icons.length]} size="s" />}
                        >
                            {label}
                        </TabItem>
                    ))}
                </Tabs>
            )}
        </>
    );
};

const ResponsiveContent = () => (
    <>
        <MobileHeaderButtons>
            <Button view="clear" size="s" pin="circle-circle" contentLeft={<Icon icon="plus" size="s" />} />
            <Button view="clear" size="s" pin="circle-circle" contentLeft={<Icon icon="trash" size="s" />} shiftRight />
        </MobileHeaderButtons>
        <RegularHeaderButtons>
            <Button view="clear" shiftRight>
                {text('content', 'Regular button')}
            </Button>
        </RegularHeaderButtons>
    </>
);

export const Default = () => (
    <Header
        back={boolean('Back button', true) as true}
        logo={boolean('Logo', true) && './images/logo.png'}
        logoAlt="Logo"
        title={text('title', 'Header title text')}
        subtitle={text('subtitle', 'Subtitle text')}
        onBackClick={action('onBackClick')}
    >
        <AppBarContent />
    </Header>
);

export const CustomWithResponsiveContent = () => (
    <HeaderRoot>
        <HeaderBack onClick={action('onBackClick')} />
        <HeaderLogo src="./images/logo.png" alt="Logo" />
        <HeaderTitleWrapper>
            <HeaderTitle>{text('title', 'Header title text')}</HeaderTitle>
            <HeaderSubtitle>{text('subtitle', 'Subtitle text')}</HeaderSubtitle>
        </HeaderTitleWrapper>
        <HeaderContent>
            <ResponsiveContent />
        </HeaderContent>
    </HeaderRoot>
);
