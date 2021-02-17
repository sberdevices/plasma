export const logger = <T>(title: string, data: T): void => {
    if (process.env.NODE_ENV === 'development') {
        const label = `%c${title}`;

        /* eslint-disable no-console */
        console.groupCollapsed(label, 'color: #2AC673; font-weight: 700;');
        console.log(data);
        console.groupEnd();
        /* eslint-enable no-console */
    }
};
