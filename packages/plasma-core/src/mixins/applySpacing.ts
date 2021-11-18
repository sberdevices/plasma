import type { InterpolationFunction } from 'styled-components';

const baseSpacing = {
    0: '0',
    2: '0.125rem',
    4: '0.25rem',
    8: '0.5rem',
    10: '0.625rem',
    12: '0.75rem',
    16: '1rem',
    18: '1.125rem',
    20: '1.25rem',
    24: '1.5rem',
    32: '2rem',
};

export const spacing = {
    ...baseSpacing,
    '0x': baseSpacing[0],
    '1x': baseSpacing[2],
    '2x': baseSpacing[4],
    '4x': baseSpacing[8],
    '5x': baseSpacing[10],
    '6x': baseSpacing[12],
    '8x': baseSpacing[16],
    '9x': baseSpacing[18],
    '10x': baseSpacing[20],
    '12x': baseSpacing[24],
    '16x': baseSpacing[32],
};

type Spacing = keyof typeof spacing;

const createSpacingFn = (params: string[]) => (value: Spacing) => {
    return params.reduce((acc, cur) => ({ ...acc, [cur]: spacing[value] }), {});
};

const m = createSpacingFn(['margin']);
const mt = createSpacingFn(['marginTop']);
const mr = createSpacingFn(['marginRight']);
const ml = createSpacingFn(['marginLeft']);
const mb = createSpacingFn(['marginBottom']);
const mx = createSpacingFn(['marginLeft', 'marginRight']);
const my = createSpacingFn(['marginTop', 'marginBottom']);

const p = createSpacingFn(['padding']);
const pt = createSpacingFn(['paddingTop']);
const pr = createSpacingFn(['paddingRight']);
const pl = createSpacingFn(['paddingLeft']);
const pb = createSpacingFn(['paddingBottom']);
const px = createSpacingFn(['paddingLeft', 'paddingRight']);
const py = createSpacingFn(['paddingTop', 'paddingBottom']);

const spacingFns = { m, mt, mr, ml, mb, mx, my, p, pt, pr, pl, pb, px, py };
const spacingFnsList = Object.entries(spacingFns);

type SpacingFn = keyof typeof spacingFns;

export interface SpacingProps {
    m?: Spacing;
    mt?: Spacing;
    mr?: Spacing;
    mb?: Spacing;
    ml?: Spacing;
    mx?: Spacing;
    my?: Spacing;
    p?: Spacing;
    pt?: Spacing;
    pr?: Spacing;
    pb?: Spacing;
    pl?: Spacing;
    px?: Spacing;
    py?: Spacing;
}

/**
 * Миксин для добавления пропсов стандартных отступов в компонент.
 */
export const applySpacing: InterpolationFunction<SpacingProps> = (props) =>
    spacingFnsList.reduce((styles, [fnName, fn]) => {
        if (fnName in props) {
            return { ...styles, ...fn(props[fnName as SpacingFn] as Spacing) };
        }
        return styles;
    }, {});
