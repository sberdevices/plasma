import type { FC } from 'react';
import styled from 'styled-components';
import { Switch, SwitchProps } from '@sberdevices/plasma-b2c';
import { IconSleep } from '@sberdevices/plasma-icons';
import { accent, tertiary } from '@sberdevices/plasma-tokens-b2c';

type ThemeSwitcherProps = SwitchProps;

const StyledRoot = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ checked, ...rest }) => (
    <StyledRoot>
        <IconSleep size="xs" color={checked ? accent : tertiary} />
        <Switch checked={checked} {...rest} />
    </StyledRoot>
);
