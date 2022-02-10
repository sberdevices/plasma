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
        paddingX = sizes[size].paddingStretchX;
    } else if (isContentLeft || isContentRight) {
        paddingX = sizes[size].paddingContentX;
    }

    return css`
        height: ${sizes[size].height};
        padding: ${sizes[size].paddingY} ${paddingX};
        border-radius: ${convertRoundnessMatrix(pin, sizes[size].radius, sizes[size].radiusCircle)};

        ${stretch && 'width: 100%;'}
        ${square && ` width: ${sizes[size].height};`}
        ${shiftLeft && `margin-left: calc(-1 * ${paddingX});`}
        ${shiftRight && `margin-right: calc(-1 * ${paddingX});`}
        ${typos[size]}

        ${addFocus({
            focused,
            outlined,
            outlineRadius: convertRoundnessMatrix(
                pin,
                `calc(${sizes[size].radius} + var(--plasma-outline-size))`,
                `calc(${sizes[size].radiusCircle} + var(--plasma-outline-size))`,
            ),
        })}
    `;
};
