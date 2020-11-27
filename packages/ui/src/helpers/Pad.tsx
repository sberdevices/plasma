import React from 'react';

export const Pad = ({ children }) => (
    <div
        style={{
            padding: '5rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        {children}
    </div>
);
