export type PlasmaSaturation = 1000 | 950 | 900 | 850 | 800 | 700 | 600 | 500 | 400 | 300 | 250 | 200 | 150 | 100;
export type PlasmaColor = Record</* sat */ PlasmaSaturation, /* hex */ string>;
export type PlasmaPalette = Record</* hue */ string, PlasmaColor>;
