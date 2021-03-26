/// <reference types="react-scripts" />

declare module '*.svg' {
    export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default ReactComponent;
}

declare module '*.md';
