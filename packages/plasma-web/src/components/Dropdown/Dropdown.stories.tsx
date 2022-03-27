import React from 'react';
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
import { action } from '@storybook/addon-actions';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';

import { Button } from '../Button';

import { Dropdown, DropdownList, DropdownItem, withAssistiveDropdown } from '.';

export default {
    title: 'Controls/Dropdown',
    component: Dropdown,
    decorators: [InSpacingDecorator],
};

const StyledWrapper = styled.div`
    width: 13.75rem;
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

const items = [
    { value: 'each', label: 'Каждый' },
    { value: 'hunter', label: 'Охотник' },
    {
        value: 'wants',
        label: 'Желает',
        contentLeft: <IconHeart color="inherit" />,
        items: [
            { value: '_nestedLabel', label: 'Лейбл во вложенном списке' },
            { value: '_thePheasant', label: 'Фазан' },
            { value: '_is', label: 'Сидит' },
        ],
    },
    { value: 'toKnow', label: 'Знать', isDisabled: true, contentLeft: <IconEye color="inherit" /> },
    { value: 'where', label: 'Где', color: accent, contentLeft: <IconLocation color="inherit" /> },
    { value: 'is', label: 'Сидит', color: success, contentLeft: <IconAccessibility color="inherit" /> },
    { value: 'thePheasant', label: 'Фазан', color: warning, contentLeft: <IconMagicWand color="inherit" /> },
    {
        value: 'fullLabel',
        label: 'Длинный лейбл: каждый охотник желает знать, где сидит фазан',
        contentLeft: <IconTrash color="inherit" />,
        color: critical,
    },
];

export const Trigger = () => {
    return (
        <Styled25Rem>
            <StyledDashedBorder style={{ display: 'inline-flex' }}>
                <Dropdown
                    id="example-dropdown-click"
                    items={items}
                    trigger="click"
                    placement="bottom"
                    onItemSelect={action('onItemSelect')}
                >
                    <Button text="Нажмите" />
                </Dropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <Dropdown
                    id="example-dropdown-hover"
                    items={items}
                    trigger="hover"
                    placement="bottom"
                    onItemSelect={action('onItemSelect')}
                >
                    <Button text="Наведите" />
                </Dropdown>
            </StyledDashedBorder>
        </Styled25Rem>
    );
};

const Styled240Dropdown = styled(Dropdown)`
    --plasma-dropdown-padding: 0.25rem;
    --plasma-dropdown-border-radius: 1rem;
    --plasma-dropdown-item-border-radius: 0.75rem;
    --plasma-popup-width: 240px;
    --plasma-popup-nested-padding: 0 var(--plasma-dropdown-padding, 0);
    --plasma-popup-nested-margin: calc(var(--plasma-dropdown-padding, 0) * -1) 0 0;
`;

export const Styling = () => {
    return (
        <Styled240Dropdown id="example-dropdown-styled" items={items} onItemSelect={action('onItemSelect')}>
            <Button text="Нажмите" />
        </Styled240Dropdown>
    );
};

export const Placement = () => {
    return (
        <Styled25Rem style={{ flexDirection: 'row' }}>
            <StyledDashedBorder>
                <Dropdown id="example-dropdown-bottom" items={items}>
                    <Button text="Снизу" />
                </Dropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <Dropdown id="example-dropdown-right" items={items} placement="right">
                    <Button text="Справа" />
                </Dropdown>
            </StyledDashedBorder>
        </Styled25Rem>
    );
};

const StyledDropdown = styled(Dropdown)`
    --plasma-popup-width: 100%;
`;
const StyledBlockDropdown = styled(Dropdown)`
    --plasma-popup-width: 100%;
    display: block;
`;

export const InlineOrBlockWrapper = () => {
    return (
        <Styled25Rem>
            <StyledDashedBorder style={{ display: 'inline-flex' }}>
                <StyledDropdown id="example-dropdown-inline" items={items} onItemSelect={action('onItemSelect')}>
                    <Button text="Inline" />
                </StyledDropdown>
            </StyledDashedBorder>
            <StyledDashedBorder>
                <StyledBlockDropdown id="example-dropdown-block" items={items} onItemSelect={action('onItemSelect')}>
                    <Button text="Block" stretch />
                </StyledBlockDropdown>
            </StyledDashedBorder>
        </Styled25Rem>
    );
};

export const CustomAssembly = () => {
    return (
        <StyledWrapper>
            <DropdownList>
                {items.map(({ items, ...rest }) => (
                    <DropdownItem key={rest.value} {...rest} />
                ))}
            </DropdownList>
        </StyledWrapper>
    );
};

const DropdownButton = withAssistiveDropdown(Button);

export const AccessibilityHOC = () => {
    return (
        <DropdownButton
            id="example-dropdown-assistive"
            text="Нажмите"
            items={items}
            trigger="click"
            placement="bottom"
            onItemSelect={action('onItemSelect')}
        />
    );
};
