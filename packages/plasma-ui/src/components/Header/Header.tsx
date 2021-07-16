import React from 'react';

import { PickOptional } from '../../types';

import { HeaderRoot } from './HeaderRoot';
import { HeaderMinimize } from './HeaderMinimize';
import { HeaderBack } from './HeaderBack';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderTitleWrapper } from './HeaderTitleWrapper';
import { HeaderContent } from './HeaderContent';

interface MinimizeProps {
    minimize?: true;
    onMinimizeClick?: React.MouseEventHandler<HTMLButtonElement>;
    back?: false;
    onBackClick?: never;
}
interface BackProps {
    /**
     * Показывать кнопку "назад"
     */
    back?: true;
    /**
     * Обработчик клика по кнопке "назад"
     */
    onBackClick?: React.MouseEventHandler<HTMLButtonElement>;
    minimize?: false;
    onMinimizeClick?: false;
}
interface LogoProps {
    /**
     * Путь до картинки с логотипом (src)
     */
    logo: string;
    /**
     * Alt логотипа
     */
    logoAlt?: string;
}
interface NoLogoProps {
    logo?: undefined;
    logoAlt?: never;
}
interface TitleProps {
    /**
     * Заголовок страницы
     */
    title: string;
    /**
     * Подзаголовок страницы
     */
    subtitle?: string;
}
interface NoTitleProps {
    title?: undefined;
    subtitle?: never;
}
type AllProps = PickOptional<MinimizeProps, 'minimize' | 'onMinimizeClick'> &
    PickOptional<BackProps, 'back' | 'onBackClick'> &
    LogoProps &
    TitleProps;

export type HeaderProps = React.HTMLAttributes<HTMLDivElement> &
    (MinimizeProps | BackProps) &
    (LogoProps | NoLogoProps) &
    (TitleProps | NoTitleProps);

/**
 * Шапка страницы.
 */
export const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
    const { minimize, back, logo, logoAlt, title, subtitle, onMinimizeClick, onBackClick, ...rest } = props as AllProps;

    return (
        <HeaderRoot {...rest}>
            {minimize && <HeaderMinimize onClick={onMinimizeClick} />}
            {back && <HeaderBack onClick={onBackClick} />}
            {logo && <HeaderLogo src={logo} alt={logoAlt} />}
            {title && (
                <HeaderTitleWrapper>
                    {title && <HeaderTitle>{title}</HeaderTitle>}
                    {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
                </HeaderTitleWrapper>
            )}
            {children && <HeaderContent>{children}</HeaderContent>}
        </HeaderRoot>
    );
};
