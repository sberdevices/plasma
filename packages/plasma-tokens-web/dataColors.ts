import { general } from '@sberdevices/plasma-colors';
import { lightenColor } from '@sberdevices/plasma-tokens-utils';

export const dataColors = {
    light: {
        link: general.electricBlue['600'],
        linkHover: lightenColor(general.electricBlue['600'], 7),
        linkActive: lightenColor(general.electricBlue['600'], -8),

        linkVisited: general.electricBlue['700'],
        linkVisitedHover: lightenColor(general.electricBlue['700'], 7),
        linkVisitedActive: lightenColor(general.electricBlue['700'], -7),
    },
    dark: {
        link: general.electricBlue['500'],
        linkHover: lightenColor(general.electricBlue['500'], 7),
        linkActive: lightenColor(general.electricBlue['500'], -8),

        linkVisited: general.electricBlue['400'],
        linkVisitedHover: lightenColor(general.electricBlue['400'], 7),
        linkVisitedActive: lightenColor(general.electricBlue['400'], -7),
    },
};
