import React, { ComponentType, forwardRef } from 'react';
import { isStyledComponent, StyledComponent } from 'styled-components';
import { isReactComponent } from '../utils/isReactComponent';

export interface FocusableProps {
    /**
     *
     * @param {MouseEvent} event Native HTML MouseEvent
     */
    handleClick?(event: MouseEvent): void;
    /**
     *
     * @param {(KeyboardEvent|MouseEvent)} event Native HTML KeyboardEvent or MouseEvent
     * this param depends on fact that you provide handleClick callback or not.
     * If handleClick is provided handleEnterPress will accept KeyboardEvent.
     * If handleClick is NOT provided handleEnterPress will accept MouseEvent.
     */
    handleEnterPress?(event: KeyboardEvent | MouseEvent): void;
    /**
     *
     * @param {KeyboardEvent} event Native HTML KeyboardEvent
     */
    handleEscapePress?(event: KeyboardEvent): void;

    /**
     *
     * @param {KeyboardEvent} event Native HTML KeyboardEvent
     */
    handleLeftPress?(event: KeyboardEvent): void;

    /**
     *
     * @param {KeyboardEvent} event Native HTML KeyboardEvent
     */
    handleRightPress?(event: KeyboardEvent): void;

    /**
     *
     * @param {KeyboardEvent} event Native HTML KeyboardEvent
     */
    handleUpPress?(event: KeyboardEvent): void;

    /**
     *
     * @param {KeyboardEvent} event Native HTML KeyboardEvent
     */
    handleDownPress?(event: KeyboardEvent): void;
}

/**
 * Props that Base Component must accept to be extended
 *
 * onClick and onKeyDown are basic React event handlers.
 *
 * data-focusable and tabIndex needed to make element focusable by a browser.
 */
export interface BaseComponentProps {
    onClick?(event?: React.MouseEvent<HTMLElement | SVGElement>): void;
    onKeyDown?(event?: React.KeyboardEvent<HTMLElement | SVGElement>): void;
    focusable: boolean;
    tabIndex: number;
}

function handleEnterOrEscapeDown<P extends BaseComponentProps>(
    props: React.PropsWithChildren<P & FocusableProps>,
    event: React.KeyboardEvent<HTMLElement>,
): void {
    const {
        handleEnterPress,
        handleEscapePress,
        handleLeftPress,
        handleRightPress,
        handleUpPress,
        handleDownPress,
        onKeyDown,
    } = props;

    if (onKeyDown) {
        onKeyDown(event);
    }
    if (event.nativeEvent.key === 'Enter') {
        handleEnterPress?.(event.nativeEvent);
        event.preventDefault();
    } else if (event.nativeEvent.key === 'Escape') {
        handleEscapePress?.(event.nativeEvent);
        event.preventDefault();
    } else if (event.nativeEvent.key === 'ArrowLeft') {
        handleLeftPress?.(event.nativeEvent);
        event.preventDefault();
    } else if (event.nativeEvent.key === 'ArrowRight') {
        handleRightPress?.(event.nativeEvent);
        event.preventDefault();
    } else if (event.nativeEvent.key === 'ArrowUp') {
        handleUpPress?.(event.nativeEvent);
        event.preventDefault();
    } else if (event.nativeEvent.key === 'ArrowDown') {
        handleDownPress?.(event.nativeEvent);
        event.preventDefault();
    }
}

function handleClickOrTap<P extends BaseComponentProps>(
    props: React.PropsWithChildren<P & FocusableProps>,
    event: React.MouseEvent<HTMLElement>,
): void {
    const { handleClick, handleEnterPress } = props;
    if (typeof handleClick === 'undefined') {
        handleEnterPress?.(event.nativeEvent);
    } else {
        handleClick(event.nativeEvent);
    }
}

/**
 * @param {ComponentType<P>} BaseComponent
 * Base component must be a React Component
 * that accepts onClick or onKeyDown event as its props.
 *
 * @returns {ComponentType<P & FocusableProps>}
 * returns extendedComponent that now accept handleClick, handleEnterPress, handleEscapePress
 * callbacks, data-focusable=true tabIndex={-1} to make HTML element focusable,
 * and also every prop that BaseComponent accepts before extension.
 * You can pass only handleEnterPress prop and extendedComponent
 * will call handleEnterPress callback on mouse click as well as on enter press
 *
 * @example
 *
 * // use with styled component
 * const ExtendedComponent = withFocusable(BaseComponent);
 *
 * // later in JSX
 * <div>
 *  <ExtendedComponent handleEnterPress={callback} >
 *    <div/>
 *  </ExtendedComponent>
 * </div>
 *
 * // or with custom component
 *
 * const BaseComponent: FC<BaseComponentProps> = ({ focusable, tabIndex, onKeyDown }) => (
 *   <>
 *     <span>span</span>
 *     <div data-focusable={focusable} tabIndex={tabIndex} onKeyDown={onKeyDown}>
 *       now is focusable
 *     </div>
 *   </>
 * );
 *
 * const Focusable = withFocusable(BaseComponent);
 */
function withFocusable<P extends BaseComponentProps>(
    BaseComponent: ComponentType<P>
): ComponentType<P & FocusableProps>; // BUG: accepts component without BaseComponentProps props

function withFocusable<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<unknown>,
    T extends object,
    O extends object = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    A extends keyof any = never
>(BaseComponent: StyledComponent<C, T, O, A>): StyledComponent<C, T, O & FocusableProps, A>;

function withFocusable<
    P extends BaseComponentProps,
    C extends keyof JSX.IntrinsicElements | React.ComponentType<unknown>,
    T extends object,
    O extends object = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    A extends keyof any = never
>(
    BaseComponent: ComponentType<P> | StyledComponent<C, T, O, A>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & FocusableProps> & React.RefAttributes<unknown>> {
    const extendedComponent = forwardRef((props: P & FocusableProps, ref) => {
        const onKeyDown = handleEnterOrEscapeDown.bind(null, props);

        const onClick = handleClickOrTap.bind(null, props);

        if (isStyledComponent(BaseComponent)) {
            return <BaseComponent ref={ref} tabIndex={-1} data-focusable {...props} onClick={onClick} onKeyDown={onKeyDown} />;
        }

        if (isReactComponent<typeof props>(BaseComponent)) {
            return <BaseComponent ref={ref} focusable tabIndex={-1} {...props} onClick={onClick} onKeyDown={onKeyDown} />;
        }
        throw Error('BaseComponent in not a StyledComponent nor ReactComponent');
    });

    extendedComponent.displayName = `WithFocusable_${BaseComponent.displayName}`;

    return extendedComponent;
}

export { withFocusable };

export default withFocusable;
