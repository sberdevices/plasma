import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import { THROTTLE_WAIT } from '../../hooks/useThrottledCallback';
import { HeaderProps } from '../../components/Header/types';
import { isSberBoxLike } from '../../utils/deviceFamily';
import { UnifiedComponentProps } from '../../registry/types';
import { StateLayoutProps } from '../../components';

import iconWarn from './ErrorPage.assets/warning-circle.svg';

type PlatformComponents = {
    StateLayout: StateLayoutProps;
};

export interface ErrorPageProps {
    /** @deprecated работает только с PlasmaApp */
    header?: HeaderProps;
    /** Основной и дополнительный текст об ошибке */
    error: {
        status: string;
        message?: string;
    };
    /** Дополнительный контент, обычно кнопки для выполнения какого-либо действия */
    buttons?: ((focusedRef: React.Ref<HTMLButtonElement>) => React.ReactNode) | React.ReactNode;
    className?: string;
}

const StyledWarningIcon = styled.div`
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

    background-image: url(${iconWarn});
    background-size: contain;
`;

/** Компонент страницы для отображения состояния ошибки */
export const ErrorPageCommon: React.FC<UnifiedComponentProps<ErrorPageProps, PlatformComponents>> = ({
    header,
    error,
    buttons,
    className,
    platformComponents: { StateLayout },
}) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useFocusOnMount<HTMLButtonElement>(buttonRef, {
        delay: THROTTLE_WAIT,
        prevent: !isSberBoxLike(),
    });

    const buttonsToRender = React.useMemo<React.ReactNode>(() => {
        if (typeof buttons === 'function') {
            return buttons(buttonRef);
        }

        if (React.isValidElement(buttons)) {
            return buttons;
        }

        return null;
    }, [buttons]);

    return (
        <StateLayout
            className={className}
            header={header}
            title={error.status}
            text={error.message}
            button={buttonsToRender}
            image={<StyledWarningIcon />}
        />
    );
};
