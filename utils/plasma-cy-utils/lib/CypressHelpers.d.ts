import React from 'react';
import { mount as cyMount } from '@cypress/react';
export declare type PackageName = 'plasma-ui' | 'plasma-web' | 'plasma-b2c';
export declare const getComponent: (componentName: string) => any;
interface CYTDec {
    noSSR?: boolean;
}
export declare const CypressTestDecorator: React.FC<CYTDec>;
export declare const PadMe: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const SpaceMe: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const withNoAnimation: <P extends {}>(Comp: React.FC<P>) => React.FC<P>;
export declare const mount: typeof cyMount;
export {};
//# sourceMappingURL=CypressHelpers.d.ts.map