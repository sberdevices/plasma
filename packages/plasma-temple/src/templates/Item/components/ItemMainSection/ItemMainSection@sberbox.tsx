import React from 'react';
import styled from 'styled-components';
import { secondary } from '@sberdevices/plasma-tokens';
import { Headline1, Body1 } from '@sberdevices/ui';

import { Section } from '../Section/Section';

import { ItemMainSection as DefaultItemMainSection, ItemMainSectionProps } from './ItemMainSection';

const StyledSection = styled(Section)`
    margin-top: -192px;
    margin-bottom: 80px;
    padding-top: 192px;
    position: relative;
`;

const StyledTitle = styled(Headline1)`
    max-width: 674px;

    font-size: 64px;
    line-height: 72px;
`;

const StyledBody1 = styled(Body1)`
    margin-top: 32px;
    margin-bottom: 50px;

    font-size: 32px;
    line-height: 40px;

    color: ${secondary};
`;

export const ItemMainSection: React.FC<Omit<ItemMainSectionProps, 'platformComponents'>> = (props) => (
    <DefaultItemMainSection
        {...props}
        platformComponents={{
            Container: StyledSection,
            Title: StyledTitle,
            Subtitle: StyledBody1,
        }}
    />
);
