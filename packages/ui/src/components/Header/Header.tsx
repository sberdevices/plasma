import React from 'react';

import { HeaderRoot } from './HeaderRoot';
import { HeaderBack } from './HeaderBack';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderTitleWrapper } from './HeaderTitleWrapper';
import { HeaderContent } from './HeaderContent';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Показать кнопку "назад"
     */
    back?: boolean;
    /**
     * Путь до картинки с логотипом (src)
     */
    logo?: string;
    /**
     * Alt логотипа
     */
    logoAlt?: string;
    /**
     * Заголовок страницы
     */
    title?: string;
    /**
     * Подзаголовок страницы
     */
    subtitle?: string;
    /**
     * Обработчик клика по кнопке "назад"
     */
    onBackClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Шапка страницы.
 */
export const Header: React.FC<HeaderProps> = ({
    back,
    logo,
    logoAlt,
    title,
    subtitle,
    children,
    onBackClick,
    ...rest
}) => (
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
