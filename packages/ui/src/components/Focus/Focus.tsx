import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { buttonFocused } from 'plasma-tokens';

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

export const Focus = styled.div<{ hideFocus?: boolean }>`
    ${(props) =>
        !props.hideFocus &&
        css`
            &:focus {
                box-shadow: 0 0 0 4px ${buttonFocused};
            }
        `}

    &:focus {
        outline: none;
    }
`;

export const withAutoFocus = <P extends object>(
    Component: React.ComponentType<P>,
    useDefaultStyles: boolean | undefined = true,
): React.FC<P & WithAutoFocusProps> => ({ autoFocusProps, hideFocus, ...props }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const { autoFocus, tabIndex } = autoFocusProps || blankAutoFocusProps;

    useEffect(() => {
        if (autoFocus && divRef.current) {
            divRef.current.focus({ preventScroll: true });
        }
    });

    return useDefaultStyles ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Focus as={Component} tabIndex={tabIndex} ref={divRef} hideFocus={hideFocus} {...(props as P)} />
    ) : (
        <Component tabIndex={tabIndex} ref={divRef} hideFocus={hideFocus} {...(props as P)} />
    );
};
