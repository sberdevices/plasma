import { general } from '@sberdevices/plasma-colors';
import Color from 'color';

// Осветлить на x процентных пунктов
const lightenBy = (hex: string, value: number) => {
    const hsl = Color(hex).hsl();
    return hsl.lightness(hsl.lightness() + value).hex();
};

// Затемнить на x процентных пунктов
const darkenBy = (hex: string, value: number) => {
    const hsl = Color(hex).hsl();
    return hsl.lightness(hsl.lightness() - value).hex();
};

export const dataColors = {
    light: {
        accent: general.electricBlue['600'],
        focus: general.electricBlue['600'],

        buttonAccent: general.electricBlue['600'],
        buttonSuccess: general.green['600'],
        buttonWarning: general.orange['500'],
        buttonCritical: general.red['600'],

        statusSuccess: general.green['600'],
        statusWarning: general.orange['600'],
        statusCritical: general.red['600'],

        link: general.electricBlue['600'],
        linkHover: lightenBy(general.electricBlue['600'], 7),
        linkActive: darkenBy(general.electricBlue['600'], 8),

        linkVisited: general.electricBlue['700'],
        linkVisitedHover: lightenBy(general.electricBlue['700'], 7),
        linkVisitedActive: lightenBy(general.electricBlue['700'], 7),
    },
    dark: {
        accent: general.electricBlue['400'],
        focus: general.electricBlue['500'],

        buttonAccent: general.electricBlue['500'],
        buttonSuccess: general.green['500'],
        buttonWarning: general.orange['500'],
        buttonCritical: general.red['500'],

        statusSuccess: general.green['400'],
        statusWarning: general.orange['400'],
        statusCritical: general.red['400'],

        link: general.electricBlue['500'],
        linkHover: lightenBy(general.electricBlue['500'], 7),
        linkActive: darkenBy(general.electricBlue['500'], 8),

        linkVisited: general.electricBlue['400'],
        linkVisitedHover: lightenBy(general.electricBlue['400'], 7),
        linkVisitedActive: lightenBy(general.electricBlue['400'], 7),
    },
};
