import React, { useEffect, useRef } from 'react';

export interface WithAutoFocusProps {
    autoFocus?: boolean | null;
    tabIndex?: number;
    preventScroll?: boolean;
}

export const withAutoFocus = <P extends object>(
    Component: React.ComponentType<P>,
): React.FC<P & WithAutoFocusProps> => ({ autoFocus, tabIndex = -1, preventScroll = true, ...props }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (autoFocus && divRef.current) {
            divRef.current.focus({ preventScroll });
        }
    });

    return <Component tabIndex={tabIndex} ref={divRef} {...(props as P)} />;
};
