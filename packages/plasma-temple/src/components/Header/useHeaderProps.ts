import React from 'react';

import { AppStateContext } from '../PlasmaApp/AppStateContext';
import { AssistantContext } from '../PlasmaApp/AssistantContext';

import { HeaderProps, NewHeaderProps, OldHeaderProps } from './types';

const isOldHeaderProps = (props: HeaderProps): props is OldHeaderProps =>
    'subtitle' in props || 'back' in props || 'minimize' in props;

const hasOldSubtitleProps = (props: HeaderProps): props is OldHeaderProps => 'subtitle' in props;

const omitProps = <T extends HeaderProps, K extends keyof T>(props: T, keys: K[]): Omit<T, K> => {
    const copy = { ...props };

    for (const k of keys) {
        delete copy[k];
    }

    return copy;
};

export const useNewHeaderProps = (props: HeaderProps): NewHeaderProps => {
    const {
        state: { history },
        popScreen,
    } = React.useContext(AppStateContext);

    const assistant = React.useContext(AssistantContext);
    const instanse = assistant.getAssistant();
    const historyLen = history.length;

    const subtitle = hasOldSubtitleProps(props) ? props.subtitle : props.subTitle;

    const onArrowClick = React.useCallback(
        (event) => {
            if (!isOldHeaderProps(props)) {
                if (props.onArrowClick) {
                    props.onArrowClick(event);
                    return;
                }
            }

            if (isOldHeaderProps(props)) {
                if (props.onBackClick) {
                    props.onBackClick(event);
                    return;
                }

                if (props.onMinimizeClick) {
                    props.onMinimizeClick(event);
                    return;
                }
            }

            if (historyLen > 1) {
                popScreen();
            } else {
                instanse.close();
            }
        },
        [historyLen, instanse],
    );

    const arrow = React.useMemo(() => {
        if (!isOldHeaderProps(props)) {
            if (props.arrow) {
                return props.arrow;
            }

            return historyLen > 1 ? 'back' : 'minimize';
        }

        return props.back ? 'back' : 'minimize';
    }, [props]);

    if (isOldHeaderProps(props)) {
        return {
            ...omitProps(props, ['minimize', 'back', 'onMinimizeClick', 'onBackClick', 'subtitle']),
            subTitle: subtitle,
            arrow,
            onArrowClick,
        } as NewHeaderProps;
    }

    return {
        ...props,
        arrow,
        onArrowClick,
    };
};

export const useHeaderProps = (props: OldHeaderProps): OldHeaderProps => {
    const { minimize, back } = props;

    const {
        state: { history },
        popScreen,
    } = React.useContext(AppStateContext);

    if (back !== undefined || minimize !== undefined) {
        return props;
    }

    if (history.length === 1) {
        return {
            ...props,
            minimize: true,
            onMinimizeClick: popScreen,
        } as HeaderProps;
    }

    return {
        ...props,
        back: true,
        onBackClick: popScreen,
    } as HeaderProps;
};
