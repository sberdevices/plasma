import React from 'react';

export const useFocused = <T extends HTMLElement>(ref: React.RefObject<T>): boolean => {
    const [focused, setFocused] = React.useState(false);

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocused(false);
    }, []);

    React.useEffect(() => {
        if (ref.current) {
            const element = ref.current;

            element.addEventListener('focus', onFocus);
            element.addEventListener('blur', onBlur);

            return () => {
                element.removeEventListener('focus', onFocus);
                element.removeEventListener('blur', onBlur);
            };
        }

        return undefined;
    }, [onBlur, onFocus, ref]);

    return focused;
};
