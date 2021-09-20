import React from 'react';
import { RadioGroup as Base } from '@sberdevices/plasma-core';

interface RadioGroupProps {
    children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(({ children, ...rest }, ref) => {
    return (
        <Base ref={ref} {...rest}>
            {children}
        </Base>
    );
});
