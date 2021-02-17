import React from "react";

export const LazyPage: React.FC = ({ children }) => (
    <React.Suspense fallback={() => "Loading ..."}>{children}</React.Suspense>
);
