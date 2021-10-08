import { prepareCompatibleTypo } from './helpers';

const typoOldMap = {
    display1: { name: 'dspl-l', 'font-weight': '600' },
    display2: { name: 'dspl-m', 'font-weight': '600' },
    display3: { name: 'dspl-s', 'font-weight': '600' },
    headline1: { name: 'h1', 'font-weight': '600' },
    headline2: { name: 'h2', 'font-weight': '600' },
    headline3: { name: 'h3', 'font-weight': '600' },
    headline4: { name: 'h3', 'font-weight': '600' },
    body1: { name: 'body-m', 'font-weight': '400' },
    body2: { name: 'body-m', 'font-weight': '600' },
    body3: { name: 'body-m', 'font-weight': '600' },
    paragraph1: { name: 'text-m', 'font-weight': '400' },
    paragraph2: { name: 'text-m', 'font-weight': '600' },
    footnote1: { name: 'body-s', 'font-weight': '400' },
    footnote2: { name: 'body-s', 'font-weight': '600' },
    button1: { name: 'body-m', 'font-weight': '600' },
    button2: { name: 'body-s', 'font-weight': '600' },
    caption: { name: 'body-xs', 'font-weight': '400' },
};

export const compatible = {
    ':root': prepareCompatibleTypo(typoOldMap),
};
