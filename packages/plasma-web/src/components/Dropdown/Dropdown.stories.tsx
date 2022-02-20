import React, { useState } from 'react';
import styled from 'styled-components';
import { accent, success, warning, critical } from '@sberdevices/plasma-core';
import {
    IconEye,
    IconMagicWand,
    IconAccessibility,
    IconHeart,
    IconTrash,
    IconLocation,
} from '@sberdevices/plasma-icons';

import { InSpacingDecorator } from '../../helpers';
import { Button } from '../Button';

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
const Styled25Rem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 25rem;
`;
const StyledDashedBorder = styled.div`
    padding: 0.25rem;
    border: 1px dashed #00000030;
    border-radius: 0.75rem;
`;
const StyledBlockDropdown = styled(Dropdown)`
    display: block;
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

export const RadiusAndPadding = () => {
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

export const Placement = () => {
    return (
        <Styled25Rem style={{ flexDirection: 'row' }}>
            <StyledDashedBorder>
                <Dropdown items={items}>
                    <Button text="Bottom" />
                </Dropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <Dropdown items={items} placement="right">
                    <Button text="Right" />
                </Dropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <Dropdown items={items} placement="left">
                    <Button text="Left" />
                </Dropdown>
            </StyledDashedBorder>
        </Styled25Rem>
    );
};

export const InlineOrBlockWrapper = () => {
    return (
        <Styled25Rem>
            <StyledDashedBorder style={{ display: 'inline-flex' }}>
                <Dropdown items={items}>
                    <Button text="Inline" />
                </Dropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <StyledBlockDropdown items={items}>
                    <Button text="Block" stretch />
                </StyledBlockDropdown>
            </StyledDashedBorder>
        </Styled25Rem>
    );
};

export const Trigger = () => {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    return (
        <Styled25Rem>
            <StyledDashedBorder style={{ display: 'inline-flex' }}>
                <Dropdown
                    onToggle={setOpen}
                    onActiveChange={setSelectedItem}
                    listId="combo1"
                    items={items}
                    trigger="click"
                    multiselect
                >
                    <Button
                        aria-activedescendant={selectedItem}
                        aria-controls="combo1"
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        role="combobox"
                        text="Click me"
                    />
                </Dropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <Dropdown items={items} trigger="hover">
                    <Button text="Hover me" />
                </Dropdown>
            </StyledDashedBorder>
        </Styled25Rem>
    );
};
