import SpatialNavigation from '../src/spts';

const sp = new SpatialNavigation();

if (process.env.NODE_ENV === 'development') {
    Object.defineProperty(window, 'sp', {
        value: sp,
    });
}

export default sp;
