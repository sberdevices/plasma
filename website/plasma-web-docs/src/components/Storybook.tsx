import React, { FC } from 'react';
import { StorybookLink as BaseLink } from '@sberdevices/plasma-docs-ui';

const storyLinks = {
    Badge: 'content-badge--default',
    Button: 'controls-button--default',
    Carousel: 'controls-carousel--default',
    Checkbox: 'controls-checkbox--default',
    Dropdown: 'controls-dropdown--default',
    Grid: 'layout-grid--default',
    Image: 'content-image--default',
    Link: 'content-link--default',
    Modal: 'controls-modal--default',
    Notification: 'controls-notification--default',
    Price: 'content-price--default',
    Progress: 'controls-progress--default',
    Radiobox: 'controls-radiobox--default',
    Select: 'controls-select--default',
    Skeleton: 'content-select--line',
    Spinner: 'content-spinner--default',
    Switch: 'controls-switch--default',
    Tabs: 'controls-tabs--default',
    TextArea: 'controls-textarea--default',
    TextField: 'controls-textfield--default',
    Toast: 'controls-toast--default',
    Tooltip: 'controls-tooltip--live',
    Typography: 'content-typography--default',
};

export const StorybookLink: FC<{ name: keyof typeof storyLinks }> = ({ name }) => {
    return <BaseLink link={`https://plasma.sberdevices.ru/web-storybook/?path=/story/${storyLinks[name]}`} />;
};
