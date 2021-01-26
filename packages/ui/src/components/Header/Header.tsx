import React from 'react';

import { HeaderRoot } from './HeaderRoot';
import { HeaderBack } from './HeaderBack';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderTitleWrapper } from './HeaderTitleWrapper';
import { HeaderContent } from './HeaderContent';

interface BackProps {
    /**
     * Показывать кнопку "назад"
     */
    back: true;
    /**
     * Обработчик клика по кнопке "назад"
     */
    onBackClick?: React.MouseEventHandler<HTMLButtonElement>;
}
interface NoBackProps {
    back?: false;
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
}

export type HeaderProps = React.HTMLAttributes<HTMLDivElement> &
    (BackProps | NoBackProps) &
    (LogoProps | NoLogoProps) &
    (TitleProps | NoTitleProps);

/**
 * Шапка страницы.
 */
export const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
    const { back, logo, logoAlt, title, subtitle, onBackClick, ...rest } = props as BackProps & LogoProps & TitleProps;

    return (
        <HeaderRoot {...rest}>
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
