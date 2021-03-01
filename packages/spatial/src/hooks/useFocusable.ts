import { useContext, useEffect } from 'react';

import { spatialContext } from '../spatialContext';

function useFocusable(defaultSectionId: string): void {
    const sn = useContext(spatialContext);
    useEffect(() => {
        sn.init(defaultSectionId);
        sn.focus(defaultSectionId);
    }, []);
}

export { useFocusable };

export default useFocusable;
