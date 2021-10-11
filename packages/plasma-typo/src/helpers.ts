import type { CSSObject } from 'styled-components';

export const prepareStandardBreakpointTypo = (typo: CSSObject) =>
    Object.entries(typo).reduce<CSSObject>((acc, [typoKey, typoProps]) => {
        Object.entries(typoProps as CSSObject).forEach(([typoProp, propValue]) => {
            acc[`--plasma-typo-${typoKey}-${typoProp}`] = propValue;
        });

        return acc;
    }, {});

const compatProps = ['font-family', 'font-size', 'font-style', 'font-weight', 'letter-spacing', 'line-height'];

type CompatProps = 'font-family' | 'font-size' | 'font-style' | 'font-weight' | 'letter-spacing' | 'line-height';
type TypoMap = Record<
    string,
    {
        name: string;
    } & Partial<Record<CompatProps, string>>
>;

export const prepareCompatibleTypo = (typoMap: TypoMap) =>
    Object.entries(typoMap).reduce<CSSObject>((acc, [oldKey, { name, ...rest }]) => {
        const oldPrefix = `--plasma-typo-${oldKey}`;
        const newPrefix = `--plasma-typo-${name}`;

        compatProps.forEach((compatProp) => {
            acc[`${oldPrefix}-${compatProp}`] = `var(${newPrefix}-${compatProp})`;
        });

        Object.entries(rest).forEach(([customCompatProp, value]) => {
            acc[`${oldPrefix}-${customCompatProp}`] = value;
        });

        return acc;
    }, {});
