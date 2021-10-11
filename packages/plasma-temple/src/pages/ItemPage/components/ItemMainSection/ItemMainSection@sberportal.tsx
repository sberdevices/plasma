import { secondary } from '@sberdevices/plasma-tokens';
import { Headline3, Body1 } from '@sberdevices/plasma-ui';
import React from 'react';
import styled from 'styled-components';

import { Section } from '../Section/Section';

import { ItemMainSectionProps, ItemMainSection as DefaultItemMainSection } from './ItemMainSection';

const StyledSection = styled(Section)`
    margin-top: -128px;
    margin-bottom: 64px;
    padding-top: 128px;
    position: relative;
`;

const StyledBody1 = styled(Body1)`
    margin-top: 24px;
    margin-bottom: 36px;

    color: ${secondary};
`;

export const ItemMainSection: React.FC<Omit<ItemMainSectionProps, 'platformComponents'>> = (props) => (
    <DefaultItemMainSection
        {...props}
        platformComponents={{
            Container: StyledSection,
            Title: Headline3,
            Subtitle: StyledBody1,
        }}
    />
);
