import React from 'react';

interface FieldProps {
    active: string;
    name: string;
}

export const FormField: React.FC<FieldProps> = (props) => {
    const { children, active, name } = props;

    if (name !== active) {
        return null;
    }

    return <>{children}</>;
}
