import React, { useEffect, useRef } from 'react';

export interface AutoFocusProps {
    autoFocus?: boolean | null;
    tabIndex: number;
}

export interface WithAutoFocusProps {
    autoFocusProps?: AutoFocusProps;
    hideFocus?: boolean;
}

export const blankAutoFocusProps: AutoFocusProps = {
    tabIndex: -1,
};

export const withAutoFocus = <P extends object>(
    Component: React.ComponentType<P>,
): React.FC<P & WithAutoFocusProps> => ({ autoFocusProps, hideFocus, ...props }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const { autoFocus, tabIndex } = autoFocusProps || blankAutoFocusProps;

    useEffect(() => {
        if (autoFocus && divRef.current) {
            divRef.current.focus({ preventScroll: true });
        }
    });

    return <Component tabIndex={tabIndex} ref={divRef} hideFocus={hideFocus} {...(props as P)} />;
};
