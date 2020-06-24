import 'styled-components';

import { UITheme } from './theme';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends UITheme {}
}
