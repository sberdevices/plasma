import React from 'react';

export interface RadioGroupProps {
    children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(({ children, ...rest }, ref) => {
    return (
        <div role="radiogroup" ref={ref} {...rest}>
            {children}
        </div>
    );
});
