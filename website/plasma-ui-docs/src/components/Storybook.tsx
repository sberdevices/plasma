import React, { FC } from 'react';
import { StorybookLink as BaseLink } from '@sberdevices/plasma-docs-ui';

const storyLinks = {
    Badge: 'content-badge--default',
    Button: 'controls-button--default',
    Card: 'content-card--basic-value',
    Carousel: 'controls-carousel--basic',
    Cell: 'content-cell--default',
    Checkbox: 'controls-checkbox--default',
    Dropdown: 'controls-dropdown--default',
    Grid: 'layout-grid--default',
    Header: 'layout-header--default',
    Icon: 'content-icon--small-size',
    Image: 'content-image--default',
    MarkedList: 'content-markedlist--default',
    Marquee: 'content-marquee--default',
    Price: 'content-price--default',
    Radiobox: 'controls-radiobox--default',
    PaginationDots: 'controls-paginationdots--default',
    Pickers: 'controls-pickers--default',
    Sheet: 'content-sheet--default',
    Skeleton: 'content-select--line',
    Slider: 'controls-slider--default',
    Spinner: 'content-spinner--default',
    Stepper: 'controls-stepper--default',
    Switch: 'controls-switch--default',
    Tabs: 'controls-tabs--default',
    TextArea: 'controls-textarea--default',
    TextBox: 'content-textbox--default',
    TextField: 'controls-textfield--default',
    Toast: 'controls-toast--default',
    Typography: 'content-typography--default',
};

export const StorybookLink: FC<{ name: keyof typeof storyLinks }> = ({ name }) => {
    return <BaseLink link={`https://plasma.sberdevices.ru/ui-storybook/?path=/story/${storyLinks[name]}`} />;
};
