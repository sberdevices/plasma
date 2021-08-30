import React from 'react';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button component', () => {
    it('renders button html element', () => {
        const testText = 'Hello Plasma';

        render(<Button text={testText} />);
        expect(screen.queryByText(testText)).not.toBeNull();
    });
});
