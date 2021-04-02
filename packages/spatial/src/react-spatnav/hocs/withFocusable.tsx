/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, createElement, forwardRef } from 'react';
import { isStyledComponent, StyledComponent } from 'styled-components';
import { isReactComponent } from '../../react-spatnav';

export interface SpatnavElementProps {
    /**
     * Обработка кликов и тапов.
     *
     * @param event Нативный HTML MouseEvent
     */
    handleClick?(event: MouseEvent): void;

    /**
     * Обработка нажатия на кнопку Enter.
     *
     * @param event Нативный HTML KeyboardEvent.
     */
    handleEnterPress?(event: KeyboardEvent): void;

    /**
     * Обработка нажатия на кнопку Enter и кликов одновременно.
     *
     * @param event Нативный HTML KeyboardEvent или MouseEvent.
     */
    handleEnterOrClick?(event: KeyboardEvent | MouseEvent): void;

    /**
     * Обработка стрелочки влево.
     *
     * @param event Нативный HTML KeyboardEvent
     */
    handleLeftPress?(event: KeyboardEvent): void;

    /**
     * Обработка стрелочки вправо.
     *
     * @param event Нативный HTML KeyboardEvent
     */
    handleRightPress?(event: KeyboardEvent): void;

    /**
     * Обработка стрелочки вверх.
     *
     * @param event Нативный HTML KeyboardEvent
     */
    handleUpPress?(event: KeyboardEvent): void;

    /**
     * Обработка стрелочки вниз.
     *
     * @param event Нативный HTML KeyboardEvent
     */
    handleDownPress?(event: KeyboardEvent): void;
}

/**
 * Необходимые пропсы расширяемого компонента.
 *
 * @example
 * ```typescript
 * import React, { FC } from 'react';
 * import { withFocusable } from '@sberdevices/spatial';
 *
 * interface MyFancyButtonProps {
 *      color: string;
 *      text: string;
 * }
 *
 * const MyFancyButton: FC<MyFancyButtonProps & BaseComponentProps> = (props) => {
 *      return (
 *          <div
 *              style={{borderColor: props.color}}
 *              data-focusable={props.focusable}
 *              tabIndex={props.tabIndex}
 *              onClick={props.onClick}>
 *              onKeyDown={props.onKeyDown}
 *          >
 *              {props.text}
 *          </div>
 *      )
 * }
 *
 * export const FocusableFancyButton = withFocusable(MyFancyButton);
 * ```
 */
export interface BaseComponentProps {
    focusable: boolean;
    tabIndex?: number;
    onClick?(event?: React.MouseEvent<HTMLElement | SVGElement>): void;
    onKeyDown?(event?: React.KeyboardEvent<HTMLElement | SVGElement>): void;
}

function handleNavigationKeys<P extends BaseComponentProps>(
    props: React.PropsWithChildren<P & SpatnavElementProps>,
    event: React.KeyboardEvent<HTMLElement>,
): void {
    props.onKeyDown?.(event);

    const code = event.nativeEvent.code || event.nativeEvent.key;

    switch (code) {
        case 'ArrowDown':
            props.handleDownPress?.(event.nativeEvent);
            break;
        case 'ArrowLeft':
            props.handleLeftPress?.(event.nativeEvent);
            break;
        case 'ArrowRight':
            props.handleRightPress?.(event.nativeEvent);
            break;
        case 'ArrowUp':
            props.handleUpPress?.(event.nativeEvent);
            break;
        case 'Enter':
            props.handleEnterOrClick?.(event.nativeEvent);
            props.handleEnterPress?.(event.nativeEvent);
            break;
        default:
            break;
    }
}

function handleClickOrTap<P extends BaseComponentProps>(
    props: React.PropsWithChildren<P & SpatnavElementProps>,
    event: React.MouseEvent<HTMLElement>,
): void {
    props.onClick?.(event);

    props.handleClick?.(event.nativeEvent);
    props.handleEnterOrClick?.(event.nativeEvent);
}

/**
 * Расширяет ваши компоненты с помощью пропсов необходимых для работы Spatial Navigation.
 *
 *
 * @param BaseComponent React компонент, который принимает и прокидывает дальше данные из BaseComponentProps.
 *
 * @returns расширенный компонент, который теперь принимает также и SpatnavElementProps.
 *
 * @example
 * ```typescript
 * import React, { FC } from 'react';
 * import { withFocusable } from '@sberdevices/spatial';
 *
 * interface MyFancyButtonProps {
 *      color: string;
 *      text: string;
 * }
 *
 * const MyFancyButton: FC<MyFancyButtonProps & BaseComponentProps> = (props) => {
 *      return (
 *          <div
 *              style={{borderColor: props.color}}
 *              data-focusable={props.focusable}
 *              tabIndex={props.tabIndex}
 *              onClick={props.onClick}>
 *              onKeyDown={props.onKeyDown}
 *          >
 *              {props.text}
 *          </div>
 *      )
 * }
 *
 * export const FocusableFancyButton = withFocusable(MyFancyButton);
 * ```
 */
function withFocusable<P extends BaseComponentProps>(
    BaseComponent: ComponentType<P>,
): ComponentType<P & SpatnavElementProps>;

/**
 * Расширяет styled-component с помощью пропсов необходимых для работы Spatial Navigation.
 *
 * @param BaseComponent любой styled-component.
 *
 * @returns расширенный styled-component, который теперь принимает также и SpatnavElementProps.
 *
 * @example
 * ```typescript
 * import React, { FC } from 'react';
 * import styled from 'styled-components';
 * import { withFocusable } from '@sberdevices/spatial';
 *
 * interface MyStyledButtonProps {
 *      color: string;
 * }
 *
 * const StyledButton = styled.div<MyStyledButtonProps>`
 *      background-color: ${(props) => props.color};
 * `;
 *
 * export const FocusableStyledButton = withFocusable(StyledButton);
 * ```
 */
function withFocusable<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<unknown>,
    T extends Record<string, unknown>,
    O extends Record<string, unknown>,
    A extends keyof any = never
>(BaseComponent: StyledComponent<C, T, O, A>): StyledComponent<C, T, O & SpatnavElementProps, A>;

function withFocusable<
    P extends BaseComponentProps,
    C extends keyof JSX.IntrinsicElements | React.ComponentType<unknown>,
    T extends Record<string, unknown>,
    O extends Record<string, unknown>,
    A extends keyof any = never
>(
    BaseComponent: ComponentType<P> | StyledComponent<C, T, O, A>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & SpatnavElementProps> & React.RefAttributes<unknown>> {
    const extendedComponent = forwardRef((props: P & SpatnavElementProps, ref) => {
        const { tabIndex, focusable, ...restProps } = props;

        const onKeyDown = handleNavigationKeys.bind(null, props);

        const onClick = handleClickOrTap.bind(null, props);

        if (isStyledComponent(BaseComponent)) {
            return createElement(BaseComponent, {
                ref,
                'data-focusable': true,
                tabIndex: tabIndex ?? -1,
                ...restProps,
                onClick,
                onKeyDown,
            });
        }

        if (isReactComponent<typeof restProps>(BaseComponent)) {
            return createElement(BaseComponent, {
                ref,
                focusable,
                tabIndex: tabIndex ?? -1,
                ...restProps,
                onClick,
                onKeyDown,
            });
        }
        throw Error('BaseComponent in not a StyledComponent nor ReactComponent');
    });

    extendedComponent.displayName = `WithFocusable_${BaseComponent.displayName}`;

    return extendedComponent;
}

export { withFocusable };
