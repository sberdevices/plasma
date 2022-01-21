import React, { FC, useCallback } from 'react';

import { StyledButton, StyledFooter } from './Footer.style';

/**
 * Кнопки управления окном плагина.
 */
export const Footer: FC = () => {
    const onCancel = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    }, []);

    return (
        <StyledFooter>
            <StyledButton onClick={onCancel}>Cancel</StyledButton>
            <StyledButton id="create" view="primary" form="form" type="submit">
                Create
            </StyledButton>
        </StyledFooter>
    );
};
