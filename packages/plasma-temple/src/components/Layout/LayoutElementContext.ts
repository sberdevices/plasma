import React from 'react';

type LayoutElementValue = HTMLDivElement | null;

export const LayoutElementContext = React.createContext<LayoutElementValue>(null);
