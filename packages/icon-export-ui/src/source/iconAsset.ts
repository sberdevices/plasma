import { camelize, compose, removeLineBreak } from '../utils';

const getSvgContent = (source: string) => (/<svg(.*?)>(.*?)<\/svg>/gm.exec(source) || [])[2];

const getViewBox = (source: string) => (/viewBox="(.*?)"/gm.exec(source) || [])[1];

const removeFillOpacity = (source: string) => source.replace(/fill-opacity="(.*?)"/gm, '');

const setFillCurrentColor = (source: string) => source.replace(/fill="(.*?)"/gm, 'fill="currentColor"');

/**
 * Здесь генерируется svg компонент иконки.
 */
const getAssert = (name: string, source: string) => {
    const viewBox = getViewBox(source);
    const svgContent = compose(
        removeLineBreak,
        getSvgContent,
        setFillCurrentColor,
        removeFillOpacity,
        camelize,
    )(source);

    return `import React from 'react';

import { IconProps } from '../IconRoot';

export const ${name}: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        ${svgContent}
    </svg>
);`;
};

/**
 * Функция генерации файла `/Icon.assets/<Name>.tsx`. Здесь экспортируется иконка из figma
 * и возвращается svg компонент иконки.
 */
export default async (selection: SceneNode, iconName: string) => {
    const svgSource = await selection.exportAsync({
        format: 'SVG',
    });
    const svgResult = String.fromCharCode.apply(null, Array.from(svgSource));

    return getAssert(iconName, svgResult);
};
