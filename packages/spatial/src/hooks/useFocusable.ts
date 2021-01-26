import { useContext } from 'react';
import spatialContext from '../../src//spatialContext';
import { useMount } from 'react-use';

function useFocusable(defaultSectionId: string): void {
    const sn = useContext(spatialContext);
    useMount(() => {
        sn.init(defaultSectionId);
        sn.focus(defaultSectionId);
    });
}

export { useFocusable };

export default useFocusable;
