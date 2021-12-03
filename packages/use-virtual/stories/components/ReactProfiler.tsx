import React, { Profiler } from 'react';

// id, // the "id" prop of the Profiler tree that has just committed
// phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
// actualDuration, // time spent rendering the committed update
// baseDuration, // estimated time to render the entire subtree without memoization
// startTime, // when React began rendering this update
// commitTime, // when React committed this update
// interactions, // the Set of interactions belonging to this update)
const rows = ['id', 'phase', 'actualDuration', 'baseDuration', 'startTime', 'commitTime', 'interactions'];
function onRenderCallback(...args: any[]) {
    const table: any = {};
    for (let i = 0; i < args.length; i++) {
        const value = args[i];
        const key = rows[i];
        table[key] = value;
    }
    console.table(table);
}

export const ReactProfiler = ({ id, children }: { id: string; children: React.ReactNode }) => {
    return (
        <Profiler id={id} onRender={onRenderCallback}>
            {children}
        </Profiler>
    );
};
