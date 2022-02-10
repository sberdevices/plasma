/** Матрица радиусов. r - радиус стандартный, h - радиус округлый (вычисляемый из высоты)
 * tl ---- tr
 * |        |
 * |        |
 * bl ---- br
 */
export const pins = {
    'square-square': 'r',
    'square-clear': 'r 0 0 r',
    'clear-square': '0 r r 0',
    'clear-clear': '0',
    'clear-circle': '0 h h 0',
    'circle-clear': 'h 0 0 h',
    'circle-circle': 'h',
};

export type Pin = keyof typeof pins;
export interface PinProps {
    /**
     * Границы компонента
     */
    pin: Pin;
}

/**
 * Преобразовывает матрицу радиусов с указанными размерами.
 * @param {string} matrixKey Ключ матрицы радиусов
 * @param {string} r r-радиус
 * @param {string} h h-радиус
 * @example
 * // Выведет значение для border-radius, равное '1em 0 0 1em'
 * convertPinsMatrix('r 0 0 r', '1em');
 * @example
 * // Выведет значение для border-radius, равное '1em 2em 2em 1em'
 * convertPinsMatrix('r h h r', '1em', '2em');
 */
export const convertRoundnessMatrix = (matrixKey?: Pin, r?: string, h?: string): string | undefined =>
    matrixKey &&
    pins[matrixKey]
        .split(' ')
        .map((char) => {
            switch (char) {
                case 'r':
                    return r;
                case 'h':
                    return h;
                default:
                    return char;
            }
        })
        .join(' ');
