import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { surfaceLiquid01 } from '@sberdevices/plasma-core';

import { InSpacingDecorator, disableProps } from '../../helpers';
import { Button } from '../Button';
import { Body1 } from '../Typography';

import { Spinner, SpinnerProps } from './Spinner';

const propsToDisable = ['color', 'theme', 'as', 'forwardedAs'];

const sizes = [8, 16, 32, 64, 96, 128];

export default {
    title: 'Content/Spinner',
    decorators: [InSpacingDecorator],
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: sizes,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<SpinnerProps> = (args) => <Spinner {...args} />;

Default.args = {
    size: 32,
};

const StyledWrapper = styled.div<{ loading?: boolean }>`
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        content: '';
        display: none;
        background: ${surfaceLiquid01};
    }

    ${({ loading }) =>
        loading &&
        css`
            &::after {
                display: block;
            }
        `}
`;
const StyledSpinner = styled(Spinner)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
`;

export const Live = () => {
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (loading) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => setLoading(false), 10000);
        }
    }, [loading]);

    return (
        <StyledWrapper loading={loading}>
            <Body1 id="example-live-text" mb="8x">
                При нажатии кнопки приложение будет на 10 секунд переведено в состояние загрузки, отображая при этом
                индикатор Spinner, который не может быть сфокусирован и не доступен для взаимодействия. Через 10 секунд
                кнопку снова станет возможно нажать.
            </Body1>
            <Button
                text={loading ? 'Загрузка' : 'Нажмите'}
                onClick={() => setLoading(true)}
                aria-busy={loading}
                aria-describedby="example-live-text"
                disabled={loading}
            />
            {loading && <StyledSpinner size={32} />}
        </StyledWrapper>
    );
};
