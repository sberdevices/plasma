import type { ReactNode, SyntheticEvent } from 'react';

export interface DropdownItem {
    value: string | number;
    label: string;
    color?: string;
    contentLeft?: ReactNode;
}
export interface DropdownNode extends DropdownItem {
    items?: Array<DropdownNode>;
    isActive?: boolean;
    isDisabled?: boolean;
}

export type OnItemSelect = (item: DropdownItem, event: SyntheticEvent) => void;
export type OnIndexChange = (index: number) => void;
