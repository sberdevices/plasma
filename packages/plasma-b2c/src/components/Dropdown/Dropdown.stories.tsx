import React from 'react';
import styled from 'styled-components';
import { background, accent, success, warning, critical } from '@sberdevices/plasma-core';
import {
    IconEye,
    IconMagicWand,
    IconAccessibility,
    IconHeart,
    IconTrash,
    IconLocation,
} from '@sberdevices/plasma-icons';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';

import { Button } from '../Button';
import { Container } from '../Grid';

import { Dropdown, DropdownList, DropdownItem } from '.';

export default {
    title: 'Controls/Dropdown',
    component: Dropdown,
    decorators: [InSpacingDecorator],
};

const StyledWrapper = styled.div`
    width: 13.75rem;
`;
const StyledRadialWrapper = styled(StyledWrapper)`
    --plasma-dropdown-padding: 0.25rem;
    --plasma-dropdown-border-radius: 1rem;
    --plasma-dropdown-item-border-radius: 0.75rem;
`;
const StyledHeaderRoot = styled.header`
    margin: -1rem -1rem 0;
    background: ${background};
    box-shadow: -1px 0 1px rgb(0 0 0 / 5%), -4px 0 14px rgb(0 0 0 / 8%);
`;
const StyledHeaderInner = styled.div`
    display: flex;
    align-items: center;
    height: 3.75rem;
`;
const StyledMenuButton = styled(Button)`
    height: 3.75rem;
    border-radius: 0;
`;

const items = [
    { value: 'each', label: 'Каждый' },
    { value: 'hunter', label: 'Охотник' },
    {
        value: 'wants',
        label: 'Желает',
        contentLeft: <IconHeart color="inherit" />,
        items: [
            { value: '_fulllabel', label: 'Каждый охотник желает знать, где сидит фазан' },
            { value: '_thePheasant', label: 'Фазан' },
            { value: '_is', label: 'Сидит' },
        ],
    },
    { value: 'toKnow', label: 'Знать', isDisabled: true, contentLeft: <IconEye color="inherit" /> },
    { value: 'where', label: 'Где', color: accent, contentLeft: <IconLocation color="inherit" /> },
    { value: 'is', label: 'Сидит', color: success, contentLeft: <IconAccessibility color="inherit" /> },
    { value: 'thePheasant', label: 'Фазан', color: warning, contentLeft: <IconMagicWand color="inherit" /> },
    {
        value: 'fulllabel',
        label: 'Каждый охотник желает знать, где сидит фазан',
        contentLeft: <IconTrash color="inherit" />,
        color: critical,
    },
];

export const Default = () => {
    return (
        <StyledWrapper>
            <DropdownList>
                {items.map((item) => (
                    <DropdownItem key={item.value} {...item} />
                ))}
            </DropdownList>
        </StyledWrapper>
    );
};
export const Radius = () => {
    return (
        <StyledRadialWrapper>
            <DropdownList>
                {items.map((item) => (
                    <DropdownItem key={item.value} {...item} />
                ))}
            </DropdownList>
        </StyledRadialWrapper>
    );
};
export const LiveDemo = () => {
    return (
        <StyledHeaderRoot>
            <Container>
                <StyledHeaderInner>
                    <Dropdown items={items}>
                        <StyledMenuButton text="Item 1" />
                    </Dropdown>
                    <StyledMenuButton text="Item 2" view="clear" />
                    <StyledMenuButton text="Item 3" view="clear" />
                </StyledHeaderInner>
            </Container>
        </StyledHeaderRoot>
    );
};
