import { ComponentType, ComponentClass, FunctionComponent, Component } from 'react';

// TODO: think about memoization
export function isClassComponent<P>(component: unknown): component is ComponentClass<P> {
    return typeof component === 'function' && component.prototype && component.prototype instanceof Component;
}

export function isFunctionComponent<P>(component: unknown): component is FunctionComponent<P> {
    return typeof component === 'function' && !isClassComponent(component);
}

export function isReactComponent<P>(component: unknown): component is ComponentType<P> {
    return isClassComponent(component) || isFunctionComponent(component);
}
