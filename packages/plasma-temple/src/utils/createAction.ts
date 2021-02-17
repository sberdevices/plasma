export type ActionTypes<T> = T extends { [key: string]: infer U } ? U : never;

export interface EmptyAction<T extends string> {
    type: T;
}

export interface Action<T extends string, P> {
    type: T;
    payload: P;
}

function inferLiteral<T extends string>(arg: T): T {
    return arg;
}

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
    return {
        type: inferLiteral(type),
        payload,
    };
}

export function createEmptyAction<T extends string>(type: T): EmptyAction<T> {
    return {
        type: inferLiteral(type),
    };
}
