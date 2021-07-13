export interface DropdownItem {
    value: string | number;
    label: string;
}

export interface DropdownNode extends DropdownItem {
    isActive?: boolean;
    items?: Array<DropdownNode>;
    isDisabled?: boolean;
}
