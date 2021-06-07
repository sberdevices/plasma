import { general } from '@sberdevices/plasma-colors';

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
    },
};
