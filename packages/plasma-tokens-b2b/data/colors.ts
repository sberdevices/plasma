import { general } from '@sberdevices/plasma-colors';
import { lightenColor } from '@sberdevices/plasma-tokens-utils';

export const colors = {
    light: {
        buttonPrimaryHover: lightenColor(general.electricBlue['600'], 3),
        buttonPrimaryActive: lightenColor(general.electricBlue['600'], -3),

        buttonSuccessHover: '#3eaa4d',
        buttonSuccessActive: '#1d9233',

        buttonWarningHover: lightenColor(general.orange['500'], 3),
        buttonWarningActive: lightenColor(general.orange['500'], -3),

        buttonCriticalHover: lightenColor(general.red['600'], 3),
        buttonCriticalActive: lightenColor(general.red['600'], -3),

        buttonCheckedHover: lightenColor(general.gray['1000'], 6),
        buttonCheckedActive: general.gray['1000'],

        link: general.electricBlue['600'],
        linkHover: lightenColor(general.electricBlue['600'], 7),
        linkActive: lightenColor(general.electricBlue['600'], -8),

        linkVisited: general.electricBlue['700'],
        linkVisitedHover: lightenColor(general.electricBlue['700'], 7),
        linkVisitedActive: lightenColor(general.electricBlue['700'], -8),

        skeletonGradient: `linear-gradient(
            90deg,
            rgba(8, 8, 8, 0.09) 0%,
            rgba(8, 8, 8, 0.08) 6.25%,
            rgba(8, 8, 8, 0.05) 12.5%,
            rgba(8, 8, 8, 0.01) 25%,
            rgba(8, 8, 8, 0.05) 37.5%,
            rgba(8, 8, 8, 0.08) 43.75%,
            rgba(8, 8, 8, 0.09) 50%,
            rgba(8, 8, 8, 0.08) 56.25%,
            rgba(8, 8, 8, 0.05) 62.5%,
            rgba(8, 8, 8, 0.01) 75%,
            rgba(8, 8, 8, 0.05) 87.5%,
            rgba(8, 8, 8, 0.08) 93.75%,
            rgba(8, 8, 8, 0.09) 100%
        )`,
        skeletonGradientLighter: `linear-gradient(
            90deg,
            rgba(8, 8, 8, 0.36) 0%,
            rgba(8, 8, 8, 0.32) 6.25%,
            rgba(8, 8, 8, 0.20) 12.5%,
            rgba(8, 8, 8, 0.04) 25%,
            rgba(8, 8, 8, 0.20) 37.5%,
            rgba(8, 8, 8, 0.32) 43.75%,
            rgba(8, 8, 8, 0.36) 50%,
            rgba(8, 8, 8, 0.08) 56.25%,
            rgba(8, 8, 8, 0.20) 62.5%,
            rgba(8, 8, 8, 0.04) 75%,
            rgba(8, 8, 8, 0.20) 87.5%,
            rgba(8, 8, 8, 0.32) 93.75%,
            rgba(8, 8, 8, 0.36) 100%
        )`,
    },
    dark: {
        buttonPrimaryHover: lightenColor(general.electricBlue['500'], 3),
        buttonPrimaryActive: lightenColor(general.electricBlue['500'], -3),

        buttonSuccessHover: '#3eaa4d',
        buttonSuccessActive: '#1d9233',

        buttonWarningHover: lightenColor(general.orange['600'], 3),
        buttonWarningActive: lightenColor(general.orange['600'], -3),

        buttonCriticalHover: lightenColor(general.red['500'], 3),
        buttonCriticalActive: lightenColor(general.red['500'], -3),

        buttonCheckedHover: '#FFFFFF',
        buttonCheckedActive: lightenColor('#FFFFFF', -6),

        link: general.electricBlue['500'],
        linkHover: lightenColor(general.electricBlue['500'], 7),
        linkActive: lightenColor(general.electricBlue['500'], -8),

        linkVisited: general.electricBlue['400'],
        linkVisitedHover: lightenColor(general.electricBlue['400'], 7),
        linkVisitedActive: lightenColor(general.electricBlue['400'], -8),

        skeletonGradient: `linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.09) 0%,
            rgba(255, 255, 255, 0.08) 6.25%,
            rgba(255, 255, 255, 0.05) 12.5%,
            rgba(255, 255, 255, 0.01) 25%,
            rgba(255, 255, 255, 0.05) 37.5%,
            rgba(255, 255, 255, 0.08) 43.75%,
            rgba(255, 255, 255, 0.09) 50%,
            rgba(255, 255, 255, 0.08) 56.25%,
            rgba(255, 255, 255, 0.05) 62.5%,
            rgba(255, 255, 255, 0.01) 75%,
            rgba(255, 255, 255, 0.05) 87.5%,
            rgba(255, 255, 255, 0.08) 93.75%,
            rgba(255, 255, 255, 0.09) 100%
        )`,
        skeletonGradientLighter: `linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.36) 0%,
            rgba(255, 255, 255, 0.32) 6.25%,
            rgba(255, 255, 255, 0.20) 12.5%,
            rgba(255, 255, 255, 0.04) 25%,
            rgba(255, 255, 255, 0.20) 37.5%,
            rgba(255, 255, 255, 0.32) 43.75%,
            rgba(255, 255, 255, 0.36) 50%,
            rgba(255, 255, 255, 0.08) 56.25%,
            rgba(255, 255, 255, 0.20) 62.5%,
            rgba(255, 255, 255, 0.04) 75%,
            rgba(255, 255, 255, 0.20) 87.5%,
            rgba(255, 255, 255, 0.32) 93.75%,
            rgba(255, 255, 255, 0.36) 100%
        )`,
    },
};
