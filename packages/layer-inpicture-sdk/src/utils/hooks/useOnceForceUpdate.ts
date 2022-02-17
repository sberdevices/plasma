import { useState } from 'preact/compat';

export const useOnceForceUpdate = () => {
    const [_, setValue] = useState(false);

    return () => setValue(true);
};
