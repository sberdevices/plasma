import { general } from '@sberdevices/plasma-colors';
import { lightenColor, alphenColor } from '@sberdevices/plasma-tokens-utils';

export const colors = {
    light: {
        buttonPrimaryHover: '#447ff9',
        buttonPrimaryActive: '#2868e0',

        buttonSuccessHover: '#379740',
        buttonSuccessActive: '#157e26',

        buttonWarningHover: '#f76d2f',
        buttonWarningActive: '#de550a',

        buttonCriticalHover: '#f53b46',
        buttonCriticalActive: '#dc1b2b',

        inputErrorBackground: alphenColor(general.red['600'], -0.88),

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
        buttonPrimaryHover: '#538efe',
        buttonPrimaryActive: '#3a75e5',

        buttonSuccessHover: '#3eaa4d',
        buttonSuccessActive: '#1d9233',

        buttonWarningHover: '#f76d2f',
        buttonWarningActive: '#de550a',

        buttonCriticalHover: '#ff4757',
        buttonCriticalActive: '#e82a3e',

        inputErrorBackground: alphenColor(general.red['500'], -0.88),

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
