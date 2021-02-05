import { useContext } from 'react';
import { useMount } from 'react-use';

import { spatialContext } from '../spatialContext';

function useFocusable(defaultSectionId: string): void {
    const sn = useContext(spatialContext);
    useMount(() => {
        sn.init(defaultSectionId);
        sn.focus(defaultSectionId);
    });
}

export { useFocusable };

export default useFocusable;
