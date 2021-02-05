import { useContext } from 'react';

import { spatialContext } from '../spatialContext';
import { SpatialNavigation } from '../spts';

function useSn(): SpatialNavigation {
    return useContext(spatialContext);
}

export { useSn };
