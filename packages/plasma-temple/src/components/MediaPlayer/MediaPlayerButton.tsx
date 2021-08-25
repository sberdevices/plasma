import React from 'react';
import styled from 'styled-components';
import { ActionButton } from '@sberdevices/plasma-ui';

export interface MediaPlayerButtonProps {
    children?: React.ReactNode;
    disabled?: boolean;
    visible?: boolean;
    onClick?: () => void;
}

const StyledActionButton = styled(ActionButton)`
    position: relative;
    margin: 0 8px;
`;

export const MediaPlayerButton = React.forwardRef<HTMLButtonElement, MediaPlayerButtonProps>(
    ({ disabled, visible = true, children, onClick }, ref) => {
        if (!visible) {
            return null;
        }

        return (
            <StyledActionButton
                ref={ref}
                size="l"
                view="overlay"
                pin="circle-circle"
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </StyledActionButton>
        );
    },
);
