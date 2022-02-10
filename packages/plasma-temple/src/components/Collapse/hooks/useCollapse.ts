import React from 'react';

export const useCollapse = (defaultHeight = 0) => {
    const collapseRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState(defaultHeight);

    const [expanded, setExpanded] = React.useState(false);

    const toggle = React.useCallback(() => {
        setExpanded((prevState) => !prevState);
    }, []);

    React.useEffect(() => {
        const container = collapseRef.current;

        if (container) {
            const childrenHeight = Array.from(container.children).reduce(
                (acc, child) => acc + (child as HTMLElement).offsetHeight,
                0,
            );

            setHeight(childrenHeight);

            if (childrenHeight <= defaultHeight) {
                setExpanded(true);
            }
        }
    }, [expanded, defaultHeight]);

    return {
        collapseRef,
        expanded,
        height: expanded ? height : defaultHeight,
        contentHeight: height,
        toggle,
    };
};
