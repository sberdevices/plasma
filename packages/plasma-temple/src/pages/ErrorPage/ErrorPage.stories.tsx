import React from 'react';
import styled, { css } from 'styled-components';
import { Button, mediaQuery } from '@sberdevices/plasma-ui';

import { ErrorPage } from './ErrorPage';

export default {
    title: 'Pages/Error',
    parameters: {
        ignoreInsets: true,
    },
};

const error = {
    status: 'Ошибка',
    message: 'Описание ошибки',
};

export const Default = () => {
    return <ErrorPage error={error} />;
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
        <ErrorPage
            error={error}
            buttons={
                <StyledButtonGroup>
                    <Button view="primary" size="m" stretch>
                        Label
                    </Button>
                    <Button size="m" stretch>
                        Label
                    </Button>
                </StyledButtonGroup>
            }
        />
    );
};
