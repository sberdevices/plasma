interface EventsMap {
    [event: string]: any;
}

interface DefaultEvents extends EventsMap {
    [event: string]: (...args: any) => void;
}

export const createNanoEvents = <Events extends EventsMap = DefaultEvents>() => {
    let events: Partial<{ [E in keyof Events]: Events[E][] }> = {};

    const emit = <K extends keyof Events>(event: K, ...args: Parameters<Events[K]>) => {
        for (const listener of events[event]! || []) {
            listener(...args);
        }
    };

    const on = <K extends keyof Events>(event: K, cb: Events[K]): (() => void) => {
        (events[event] = events[event]! || []).push(cb);
        return () => {
            events[event] = events[event]!.filter((i) => i !== cb);
        };
    };

    const once = <K extends keyof Events>(event: K, cb: Events[K]): (() => void) => {
        // eslint-disable-next-line
        // @ts-ignore И вот тут я сдался
        const off = on(event, (...args: Parameters<Events[K]>) => {
            cb(...args);
            off();
        });

        return off;
    };

    const clear = () => {
        events = {};
    };

    return {
        events,
        emit,
        on,
        once,
        clear,
    };
};
