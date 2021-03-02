import { InterpolationFunction } from 'styled-components';

export const blurs = {
    small: '27px',
    medium: '37px',
    large: '50px',
};

export interface BlurProps {
    /**
     * Степень размытия фона
     */
    blur?: keyof typeof blurs;
}

export const applyBlur: InterpolationFunction<BlurProps> = ({ blur }) =>
    blur && `backdrop-filter: blur(${blurs[blur]});`;
