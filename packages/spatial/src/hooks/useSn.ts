import { useContext } from 'react';
import spatialContext from '../../src/spatialContext';
import SpatialNavigation from '../../src/spts';

function useSn(): SpatialNavigation {
    return useContext(spatialContext);
}

export default useSn;
