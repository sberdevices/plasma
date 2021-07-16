import { FC, HTMLAttributes } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Container } from '@sberdevices/plasma-web';
import { background } from '@sberdevices/plasma-tokens-web';

import { Theme } from '../store/types';
import logo from '../public/plasma-logo.png';

import { FlatButton } from './FlatButton';
import { ThemeSwitcher } from './ThemeSwitcher';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    theme?: Theme;
    setTheme?: Function;
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
const StyledImageWrapper = styled.div`
    margin-right: 1.25rem;
`;

const menu = [
    { id: 'icons', text: 'Icons', href: '/' },
    { id: 'colors', text: 'Colors', href: '/colors', disabled: true },
];

export const Header: FC<HeaderProps> = ({ theme, setTheme }) => {
    const activeMenuItemId = 'icons';

    return (
        <StyledRoot>
            <Container>
                <StyledInner>
                    {logo && (
                        <StyledImageWrapper>
                            <Image src={logo} />
                        </StyledImageWrapper>
                    )}
                    {menu.map((item) => (
                        <FlatButton
                            key={item.id}
                            text={item.text}
                            href={!item.disabled ? item.href : undefined}
                            $disabled={item.disabled}
                            isActive={item.id === activeMenuItemId}
                        />
                    ))}
                    <ThemeSwitcher
                        value="theme"
                        checked={theme === 'dark'}
                        onChange={(event) => setTheme?.(event.target.checked ? 'dark' : 'light')}
                    />
                </StyledInner>
            </Container>
        </StyledRoot>
    );
};
