import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import {
    background,
    blackSecondary,
    buttonAccent,
    buttonChecked,
    buttonCritical,
    buttonSecondary,
    buttonWarning,
    text,
    transparent,
    white,
} from '@sberdevices/plasma-core/tokens';
import { convertRoundnessMatrix } from '@sberdevices/plasma-core/utils';

import { ActionButton } from './ActionButton';

describe('ActionButton component', () => {
    it('renders button html element', () => {
        const button = renderer.create(<ActionButton />).root;
        expect(button.findByType('button')).toBeTruthy();
    });

    it('renders child', () => {
        const text = 'sample text';
        const button = renderer.create(
            <ActionButton>
                <div>{text}</div>
            </ActionButton>,
        ).root;
        expect(button.findByType('div').children.includes(text)).toBeTruthy();
    });

    it('applies size styles', () => {
        const sizeStyles = {
            s: { height: '1.75rem' },
            m: { height: '2rem' },
            l: { height: '2.25rem' },
        };
        Object.entries(sizeStyles).forEach(([size, style]) => {
            const button = renderer.create(<ActionButton size={size as 'm'} />).toJSON();
            expect(button).toHaveStyleRule('height', style.height);
        });
    });

    it('applies view styles', () => {
        const viewStyles = {
            primary: { backgroundColor: buttonAccent, color: white },
            secondary: { backgroundColor: buttonSecondary, color: text },
            warning: { backgroundColor: buttonWarning, color: white },
            critical: { backgroundColor: buttonCritical, color: white },
            checked: { backgroundColor: buttonChecked, color: background },
            overlay: { backgroundColor: blackSecondary, color: white },
            clear: { backgroundColor: transparent, color: text },
        };
        Object.entries(viewStyles).forEach(([view, styles]) => {
            const button = renderer.create(<ActionButton view={view as 'primary'} />).toJSON();
            expect(button).toHaveStyleRule('background-color', styles.backgroundColor);
            expect(button).toHaveStyleRule('color', styles.color);
        });
    });

    it('applies pin styles', () => {
        const pinStyles = {
            'square-square': { height: '0.5625rem' },
            'square-clear': { height: '0.5625rem' },
            'clear-square': { height: '0.5625rem' },
            'clear-clear': { height: '0.5625rem' },
            'clear-circle': { height: '1rem' },
            'circle-clear': { height: '1rem' },
            'circle-circle': { height: '1rem' },
        };

        Object.entries(pinStyles).forEach(([pin, style]) => {
            const button = renderer.create(<ActionButton pin={pin as 'square-square'} />).toJSON();
            const borderRadius = convertRoundnessMatrix(pin as 'square-square', style.height, style.height);
            expect(button).toHaveStyleRule('border-radius', borderRadius);
        });
    });

    it('applies disabled styles', () => {
        const button = renderer.create(<ActionButton disabled />).toJSON();
        expect(button).toHaveStyleRule('opacity', '0.4');
        expect(button).toHaveStyleRule('cursor', 'not-allowed');
    });
});
