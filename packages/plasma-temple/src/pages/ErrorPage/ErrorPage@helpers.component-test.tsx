import React from 'react';
import { Button, detectDevice } from '@sberdevices/plasma-ui';

import { wrapComponent, startApp } from '../../testHelpers/testRenderHelpers';

import { ErrorPage, ErrorPageProps } from './ErrorPage';

interface State {
    errorPage: null;
}

const buttonProps = () => {
    const props = {
        size: 'm',
        stretch: false,
    };

    switch (detectDevice()) {
        case 'mobile':
            props.stretch = true;
            break;
        case 'sberPortal':
            props.size = 's';
            break;
        default:
    }

    return props;
};

export function renderButtons<T extends React.Ref<HTMLButtonElement>>(ref?: T) {
    return (
        <>
            <Button
                view="primary"
                ref={ref}
                text="Назад"
                data-cy="go-back-btn"
                {...buttonProps()}
                style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
            />
            <Button view="warning" text="Закрыть" data-cy="close-btn" {...buttonProps()} />
        </>
    );
}

export function initErrorPageTest(props: ErrorPageProps) {
    return startApp<keyof State, State>([
        {
            name: 'errorPage',
            component: wrapComponent(ErrorPage, props),
        },
    ]);
}
