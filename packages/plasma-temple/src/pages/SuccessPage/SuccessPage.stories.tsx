import React from 'react';
import styled, { css } from 'styled-components';
import { Button, mediaQuery } from '@sberdevices/plasma-ui';

import { SuccessPage } from './SuccessPage';

export default {
    title: 'Pages/Success',
    parameters: {
        ignoreInsets: true,
    },
};

export const Default = () => {
    return <SuccessPage title="Успех" subtitle="Описание (при необходимости)" />;
};

const StyledButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;

    & > button:not(:last-child) {
        margin-right: 0.75rem;
    }

    ${mediaQuery('S')(css`
        flex-direction: column;

        & > button:not(:last-child) {
            margin-right: 0;
            margin-bottom: 0.5rem;
        }
    `)}
`;

export const WithButtons = () => {
    return (
        <SuccessPage
            title="Успех"
            subtitle="Описание (при необходимости)"
            buttons={(buttonRef) => (
                <StyledButtonGroup>
                    <Button ref={buttonRef} view="primary" size="m" stretch>
                        Label
                    </Button>
                    <Button size="m" stretch>
                        Label
                    </Button>
                </StyledButtonGroup>
            )}
        />
    );
};
