import React from 'react';
import renderer from 'react-test-renderer';
import _ from 'jest-styled-components';
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

import { Button } from './Button';

describe('Button component', () => {
    it('renders button html element', () => {
        const button = renderer.create(<Button />).root;
        expect(button.findByType('button')).toBeTruthy();
    });

    it('renders passed text in span', () => {
        const buttonText = 'sample text';
        const button = renderer.create(<Button text={buttonText} />).root;
        expect(button.findByType('span').children.includes(buttonText)).toBeTruthy();
    });

    it('applies size styles', () => {
        const sizeStyles = {
            s: { height: '2.5rem' },
            m: { height: '3rem' },
            l: { height: '3.5rem' },
        };
        Object.entries(sizeStyles).forEach(([size, style]) => {
            const button = renderer.create(<Button size={size as 'm'} />).toJSON();
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
            const button = renderer.create(<Button view={view as 'primary'} />).toJSON();
            expect(button).toHaveStyleRule('background-color', styles.backgroundColor);
            expect(button).toHaveStyleRule('color', styles.color);
        });
    });

    it('applies pin styles', () => {
        const pinStyles = [
            'square-square',
            'square-clear',
            'clear-square',
            'clear-clear',
            'clear-circle',
            'circle-clear',
            'circle-circle',
        ];
        pinStyles.forEach((pin) => {
            const button = renderer.create(<Button pin={pin as 'square-square'} />).toJSON();
            const borderRadius = convertRoundnessMatrix(pin as 'square-square', '1rem', '1.75rem');
            expect(button).toHaveStyleRule('border-radius', borderRadius);
        });
    });

    it('applies disabled styles', () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toHaveStyleRule('opacity', '0.4');
        expect(button).toHaveStyleRule('cursor', 'not-allowed');
    });

    it('applies square styles', () => {
        const button = renderer.create(<Button square />).toJSON();
        expect(button).toHaveStyleRule('width', '3.5rem');
    });

    it('applies stretch styles', () => {
        const button = renderer.create(<Button stretch text="text" />).toJSON();
        expect(button).toHaveStyleRule('width', '100%');
    });

    it('does not applies stretch styles when text is empty', () => {
        const button = renderer.create(<Button stretch />).toJSON();
        expect(button).toHaveStyleRule('width', '3.5rem');
    });

    it('passes onClick', (done) => {
        const onClick = () => done();
        const button = renderer.create(<Button onClick={onClick} />).root;
        const buttonElement = button.findByType('button');
        buttonElement.props.onClick();
    });

    it('passes onBlur', (done) => {
        const onBlur = () => done();
        const button = renderer.create(<Button onBlur={onBlur} />).root;
        const buttonElement = button.findByType('button');
        buttonElement.props.onBlur();
    });

    it('passes onFocus', (done) => {
        const onFocus = () => done();
        const button = renderer.create(<Button onFocus={onFocus} />).root;
        const buttonElement = button.findByType('button');
        buttonElement.props.onFocus();
    });
});
