interface ComponentProp {
    type: {
        name: string;
    };
    defaultValue?: any;
    description?: string;
    required?: boolean;
}
export type ComponentProps = Record<string, ComponentProp>;
export interface ComponentDocgenInfo {
    props?: ComponentProps;
    description?: string;
}

export type DocgenInfo = Record<string, ComponentDocgenInfo>;
