import React from 'react';
import styled, { css } from 'styled-components';
import { Button, mediaQuery } from '@sberdevices/plasma-ui';

import { StateLayout } from './StateLayout';

export default {
    title: 'StateLayout',
    parameters: {
        ignoreInsets: true,
    },
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

const StyledIcon = styled.div<{ src: string }>`
    width: 252px;
    height: 252px;

    ${mediaQuery('M')(css`
        width: 168px;
        height: 168px;
    `)}

    ${mediaQuery('S')(css`
        width: 84px;
        height: 84px;
    `)}

    background-image: url(${({ src }) => src});
    background-size: contain;
    margin: auto;
`;

const insets = { bottom: 80 };

const buttonGroup = (
    <StyledButtonGroup>
        <Button view="primary" size="m" stretch>
            Label
        </Button>
        <Button size="m" stretch>
            Label
        </Button>
    </StyledButtonGroup>
);

export const Success = () => {
    return (
        <StateLayout
            title="Успех"
            text="Описание (при необходимости)"
            button={buttonGroup}
            image={<StyledIcon src="images/success.svg" />}
            insets={insets}
        />
    );
};

export const Error = () => {
    return (
        <StateLayout
            title="Ошибка"
            text="Описание (при необходимости)"
            button={buttonGroup}
            image={<StyledIcon src="images/error.svg" />}
        />
    );
};

export const WithBackgroundImage = () => {
    return (
        <StateLayout
            title="Название навыка"
            text="Более подробное описание навыка, условия доставки или важной информации для принятия решения"
            button={buttonGroup}
            background="images/cat.png"
        />
    );
};
