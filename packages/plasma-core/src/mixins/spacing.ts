export const spacing = {
    '0x': '0',
    '1x': '0.125rem',
    '2x': '0.250rem',
    '4x': '0.500rem',
    '5x': '0.625rem',
    '6x': '0.750rem',
    '8x': '1.000rem',
    '10x': '1.25rem',
    '12x': '1.50rem',
    '16x': '2.00rem',
};

const createSpacingFn = (params: string[]) => (multiplier: keyof typeof spacing) => {
    return params.map((param) => `${param}: ${spacing[multiplier]}`).join('');
};

export const m = createSpacingFn(['margin']);
export const mx = createSpacingFn(['margin-left', 'margin-right']);
export const my = createSpacingFn(['margin-top', 'margin-bottom']);
export const ml = createSpacingFn(['margin-left']);
export const mr = createSpacingFn(['margin-right']);
export const mt = createSpacingFn(['margin-top']);
export const mb = createSpacingFn(['margin-bottom']);

export const p = createSpacingFn(['padding']);
export const px = createSpacingFn(['padding-left', 'padding-right']);
export const py = createSpacingFn(['padding-top', 'padding-bottom']);
export const pl = createSpacingFn(['padding-left']);
export const pr = createSpacingFn(['padding-right']);
export const pt = createSpacingFn(['padding-top']);
export const pb = createSpacingFn(['padding-bottom']);
