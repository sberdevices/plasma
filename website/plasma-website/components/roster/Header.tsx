import { useContext, useCallback } from 'react';
import type { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Container, Image, BodyM } from '@sberdevices/plasma-b2c';
import { background, text } from '@sberdevices/plasma-tokens-b2c';

import { Context, setTheme } from '../../store';
import { Badge } from '../Badge';
import logo from '../../public/plasma-logo.png';

import { FlatButton } from './FlatButton';
import { ThemeSwitcher } from './ThemeSwitcher';

const basePath = process.env.BASE_PATH || '';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: never;
}

const StyledRoot = styled.header`
    background: ${background};
    box-shadow: -1px 0 1px rgb(0 0 0 / 5%), -4px 0 14px rgb(0 0 0 / 8%);
`;
const StyledInner = styled.div`
    display: flex;
    align-items: center;
    height: 3.75rem;
`;
const StyledImageWrapper = styled.a`
    display: flex;
    align-items: center;
    margin-right: 1.25rem;
    text-decoration: none;
    color: ${text};
    user-select: no-select;
`;
const StyledImage = styled(Image)`
    margin-right: 0.5rem;
`;

const activeMenuItemId = 'icons';
const menu = [
    { id: 'icons', text: 'Icons', href: `${basePath}/icons` },
    { id: 'colors', text: 'Colors', href: `${basePath}/colors`, disabled: true, soon: true },
];

export const Header: FC<HeaderProps> = () => {
    const { state, dispatch } = useContext(Context);
    const onThemeSwitcherChange = useCallback((event) => dispatch(setTheme(event.target.checked ? 'dark' : 'light')), [
        dispatch,
    ]);

    return (
        <StyledRoot>
            <Container>
                <StyledInner>
                    {logo && (
                        <StyledImageWrapper href={`${basePath}/`}>
                            <StyledImage
                                src={`${basePath}/plasma-logo.png`}
                                width="32px"
                                height="32px"
                                alt="SberDevices Plasma"
                            />
                            <BodyM bold>Plasma</BodyM>
                        </StyledImageWrapper>
                    )}
                    {menu.map((item) => (
                        <FlatButton
                            key={item.id}
                            text={item.text}
                            href={!item.disabled ? item.href : undefined}
                            $disabled={item.disabled}
                            isActive={item.id === activeMenuItemId}
                            contentRight={item.soon && <Badge text="Soon" size="s" />}
                        />
                    ))}
                    <ThemeSwitcher value="theme" checked={state.theme === 'dark'} onChange={onThemeSwitcherChange} />
                </StyledInner>
            </Container>
        </StyledRoot>
    );
};
