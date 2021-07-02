import React from 'react';
import styled from 'styled-components';
import { ActionButton } from '@sberdevices/plasma-ui';

export interface MediaPlayerButtonProps {
    disabled?: boolean;
    visible?: boolean;
    onClick?: () => void;
}

const StyledActionButton = styled(ActionButton)`
    position: relative;
    margin: 0 8px;
`;

export const MediaPlayerButton: React.FC<MediaPlayerButtonProps> = ({
    disabled,
    visible = true,
    children,
    onClick,
}) => {
    if (!visible) {
        return null;
    }

    return (
        <StyledActionButton size="l" view="overlay" pin="circle-circle" disabled={disabled} onClick={onClick}>
            {children}
        </StyledActionButton>
    );
};
