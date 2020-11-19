import React from 'react';
import styled from 'styled-components';
import { text, number, boolean, select } from '@storybook/addon-knobs';

import { mediaQuery } from '../../utils';
import { Button } from '../Button/Button';
import { Container } from '../Grid/Grid';
import { Icon } from '../Icon/Icon';
import { Tabs, TabItem } from '../Tabs';

import { Header } from './Header';
import { HeaderRoot } from './HeaderRoot';
import { HeaderBack } from './HeaderBack';
import { HeaderLogo } from './HeaderLogo';
import { HeaderTitleWrapper } from './HeaderTitleWrapper';
import { HeaderTitle } from './HeaderTitle';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderContent } from './HeaderContent';

const MobileHeaderButtons = styled.div`
    display: none;

    ${mediaQuery('sm')(`
        display: flex;
    `)}
`;
const RegularHeaderButtons = styled.div`
    display: flex;

    ${mediaQuery('sm')(`
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
                <Tabs size="m" view="clear" pilled motion shiftRight>
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

export default {
    title: 'Header',
};

export const Default = () => {
    return (
        <Container>
            <Header
                back={boolean('Back button', true)}
                logo={boolean('Logo', true) && './images/logo.png'}
                logoAlt="Logo"
                title={text('title', 'Header title text')}
                subtitle={text('subtitle', 'Subtitle text')}
            >
                <AppBarContent />
            </Header>
        </Container>
    );
};

export const CustomWithResponsiveContent = () => (
    <Container>
        <HeaderRoot>
            <HeaderBack />
            <HeaderLogo src="./images/logo.png" alt="Logo" />
            <HeaderTitleWrapper>
                <HeaderTitle>{text('title', 'Header title text')}</HeaderTitle>
                <HeaderSubtitle>{text('subtitle', 'Subtitle text')}</HeaderSubtitle>
            </HeaderTitleWrapper>
            <HeaderContent>
                <ResponsiveContent />
            </HeaderContent>
        </HeaderRoot>
    </Container>
);
