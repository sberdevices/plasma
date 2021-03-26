import React from 'react';
import { action } from '@storybook/addon-actions';

import {
    AssistantActionConfirmWrapper,
    AssistantActionConfirmDescription,
    AssistantActionConfirmLabel,
    AssistantActionConfirmResult,
    AssistantActionConfirmResults,
    AssistantActionConfirmTitle,
    AssistantActionConfirmControls,
} from './AssistantActionConfirm';

export default {
    title: 'AssistantActionConfirm',
};

export const SingleSuggestWithDescription = () => (
    <AssistantActionConfirmWrapper>
        <AssistantActionConfirmLabel>Имя</AssistantActionConfirmLabel>
        <AssistantActionConfirmResult>Inav</AssistantActionConfirmResult>
        <AssistantActionConfirmDescription>
            Для покупки авиабилета по загранпаспорту РФ фамилия должна полностью соответствовать тому, что написано в
            документе. Для покупки по паспорту РФ — в произвольной форме латинскими буквами.
        </AssistantActionConfirmDescription>
        <AssistantActionConfirmControls
            onConfirm={action('onConfirm')}
            onReject={action('onReject')}
            suggests={['Ivan']}
        />
    </AssistantActionConfirmWrapper>
);

export const SingleSuggestWithoutDescription = () => (
    <AssistantActionConfirmWrapper>
        <AssistantActionConfirmLabel>Номер паспорта РФ</AssistantActionConfirmLabel>
        <AssistantActionConfirmResult>6111 456788</AssistantActionConfirmResult>
        <AssistantActionConfirmControls
            onConfirm={action('onConfirm')}
            onReject={action('onReject')}
            suggests={['6111 456788']}
        />
    </AssistantActionConfirmWrapper>
);

export const MultipleSuggestsWithRejection = () => (
    <AssistantActionConfirmWrapper>
        <AssistantActionConfirmTitle>Выберите имя</AssistantActionConfirmTitle>
        <AssistantActionConfirmDescription>
            Для покупки авиабилета по загранпаспорту РФ фамилия должна полностью соответствовать тому, что написано в
            документе. Для покупки по паспорту РФ — в произвольной форме латинскими буквами.
        </AssistantActionConfirmDescription>
        <AssistantActionConfirmResults
            onConfirm={action('onConfirm')}
            onReject={action('onReject')}
            suggests={['Аnastasiia', 'Аnastasiya']}
        />
    </AssistantActionConfirmWrapper>
);

export const MultipleSuggestsWithoutRejection = () => (
    <AssistantActionConfirmWrapper>
        <AssistantActionConfirmTitle>Выберите имя</AssistantActionConfirmTitle>
        <AssistantActionConfirmDescription>
            Для покупки авиабилета по загранпаспорту РФ фамилия должна полностью соответствовать тому, что написано в
            документе. Для покупки по паспорту РФ — в произвольной форме латинскими буквами.
        </AssistantActionConfirmDescription>
        <AssistantActionConfirmResults
            onConfirm={action('onConfirm')}
            suggests={['Аnastasiia', 'Аnastasiya']}
        />
    </AssistantActionConfirmWrapper>
);
