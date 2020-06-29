import React from 'react';

import SliderContext from './SliderContext';

interface SliderItemProps {
    children: React.ReactElement;
}

const SliderItem: React.FC<SliderItemProps> = ({ children }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const ctx = React.useContext(SliderContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ref, ctx]);

    return React.cloneElement(children, { ref, tabIndex: 0 });
};

export default SliderItem;
