import type { TypoStyles, CSSProperties, DataObject } from '../types';

const filterFontStyles = (styles: CSSProperties) =>
    Object.entries(styles).reduce((stylesAcc, [key, prop]) => {
        if (
            key === 'fontFamily' ||
            key === 'fontSize' ||
            key === 'fontStyle' ||
            key === 'fontWeight' ||
            key === 'letterSpacing' ||
            key === 'lineHeight'
        ) {
            stylesAcc[key] = prop;
        }

        return stylesAcc;
    }, {} as CSSProperties);

/**
 * Из объекта со стилями типографических констант создаст объект
 * переменных, пригодный для транформации в объект темы.
 */
export const filterTypoStyles = <TK extends string>(typoStyles: TypoStyles<TK>) =>
    Object.entries(typoStyles).reduce((textAcc, [text, styles]) => {
        textAcc[text] = filterFontStyles(styles as CSSProperties) as string | number;
        return textAcc;
    }, {} as DataObject);
