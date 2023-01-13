import styled from 'styled-components';
import { PlaygroundPreview as BasePreview } from '@sberdevices/plasma-docs-ui';
import { light as b2bLight, dark as b2bDark } from '@sberdevices/plasma-tokens-b2b/themes';
import { light as b2cLight, dark as b2cDark } from '@sberdevices/plasma-tokens-b2c/themes';

const themes = {
    b2b: {
        light: b2bLight[':root'],
        dark: b2bDark[':root'],
    },
    b2c: {
        light: b2cLight[':root'],
        dark: b2cDark[':root'],
    },
};

export const PlaygroundPreview = styled(BasePreview)<{ theme?: 'light' | 'dark'; pckg?: 'b2b' | 'b2c' }>`
    ${({ theme = 'light', pckg = 'b2b' }) => themes[pckg][theme]}
`;
