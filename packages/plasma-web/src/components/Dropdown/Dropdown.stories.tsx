import React from 'react';
import styled from 'styled-components';
import { background } from '@sberdevices/plasma-core';

import { InSpacingDecorator } from '../../helpers';
import { Button } from '../Button';
import { Container } from '../Grid';

import { DropdownList } from './DropdownList';
import { DropdownItem } from './DropdownItem';

import { Dropdown } from '.';

export default {
    title: 'Controls/Dropdown',
    component: Dropdown,
    decorators: [InSpacingDecorator],
};

const StyledWrapper = styled.div`
    width: 13.75rem;
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
    { value: 'hunter', label: 'Охотник', isDisabled: true },
    { value: 'wants', label: 'Желает' },
    {
        value: 'toKnow',
        label: 'Знать',
        items: [
            { value: '_fulllabel', label: 'Каждый охотник желает знать, где сидит фазан' },
            { value: '_thePheasant', label: 'Фазан' },
            { value: '_is', label: 'Сидит' },
        ],
    },
    { value: 'where', label: 'Где' },
    { value: 'is', label: 'Сидит' },
    { value: 'thePheasant', label: 'Фазан' },
    { value: 'fulllabel', label: 'Каждый охотник желает знать, где сидит фазан' },
];
const flatList = items.map(({ value, label, isDisabled }) => ({ value, label, isDisabled }));

export const Default = () => {
    return (
        <StyledWrapper>
            <DropdownList>
                {flatList.map((item) => (
                    <DropdownItem key={item.value} {...item} />
                ))}
            </DropdownList>
        </StyledWrapper>
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
