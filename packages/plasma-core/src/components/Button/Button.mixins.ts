import { css } from 'styled-components';

import { addFocus } from '../../mixins';
import { convertRoundnessMatrix } from '../../utils';

import type { StyledButtonProps, ButtonSizes, ButtonTypography } from './Button.types';

/**
 * Создание специализированного миксина со своими размерами и типографикой.
 * @param {Record<string, object>} sizes
 * @param {Record<string, object>} typos
 */
export const getButtonSizesMixin = (sizes: ButtonSizes, typos: ButtonTypography) => ({
    size,
    pin,
    outlined,
    focused,
    $isContentLeft: isContentLeft,
    $isContentRight: isContentRight,
    shiftLeft,
    shiftRight,
    square,
    stretch,
}: StyledButtonProps) => {
    let { paddingX } = sizes[size];

    if (square) {
        paddingX = sizes[size].paddingY;
    } else if (stretch) {
        paddingX = sizes[size].paddingXResizable;
    } else if (isContentLeft || isContentRight) {
        paddingX = sizes[size].paddingXContent;
    }

    return css`
        height: ${sizes[size].height};
        padding: ${sizes[size].paddingY} ${paddingX};
        border-radius: ${convertRoundnessMatrix(pin, sizes[size].squareRadius, sizes[size].circleRadius)};

        ${stretch && 'width: 100%;'}
        ${square && ` width: ${sizes[size].height};`}
        ${shiftLeft && `margin-left: -${paddingX};`}
        ${shiftRight && `margin-right: -${paddingX};`}
        ${typos[size]}

        ${addFocus({
            focused,
            outlined,
            outlineRadius: convertRoundnessMatrix(pin, sizes[size].sOutlineRadius, sizes[size].cOutlineRadius),
        })}
    `;
};
