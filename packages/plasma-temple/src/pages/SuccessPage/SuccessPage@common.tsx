import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import { THROTTLE_WAIT } from '../../hooks/useThrottledCallback';
import { isSberBoxLike } from '../../utils/deviceFamily';
import { StateLayoutProps } from '../../components/StateLayout';
import { UnifiedComponentProps } from '../../registry/types';

import successIcon from './SuccessPage.assets/success.svg';

type PlatformComponents = {
    StateLayout: StateLayoutProps;
};

export interface SuccessPageProps {
    title: string;
    subtitle?: string;
    /** Дополнительный контент, обычно кнопки для выполнения какого-либо действия */
    buttons?: ((focusedRef: React.Ref<HTMLButtonElement>) => React.ReactNode) | React.ReactNode;
    className?: string;
}

const StyledSuccessIcon = styled.div`
    width: 7.875rem;
    height: 7.875rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        width: 5.25rem;
        height: 5.25rem;
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        width: 5.25rem;
        height: 5.25rem;
    `)}

    background-image: url(${successIcon});
    background-size: contain;
    margin: auto;
`;

/** Компонент страницы для отображения состояния успеха */
export const SuccessPageCommon: React.FC<UnifiedComponentProps<SuccessPageProps, PlatformComponents>> = ({
    title,
    subtitle,
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

        return buttons;
    }, [buttons]);

    return (
        <StateLayout
            className={className}
            title={title}
            text={subtitle}
            button={buttonsToRender}
            image={<StyledSuccessIcon />}
        />
    );
};
