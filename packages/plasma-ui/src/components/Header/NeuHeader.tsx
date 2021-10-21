import React, { HTMLAttributes, MouseEventHandler } from 'react';

import { HeaderRoot, HeaderRootProps } from './HeaderRoot';
import { HeaderArrow } from './HeaderArrow';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderTitleWrapper } from './HeaderTitleWrapper';
import { HeaderContent } from './HeaderContent';

interface ArrowProps {
    /**
     * Тип кнопки-стрелки - "назад" или "свернуть".
     */
    arrow: 'back' | 'minimize';
    /**
     * Обработчик клика по кнопке-стрелке.
     */
    onArrowClick?: MouseEventHandler<HTMLButtonElement>;
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
     * Заголовок страницы.
     */
    title: string;
    /**
     * Подзаголовок страницы.
     */
    subTitle?: string;
}
interface NoTitleProps {
    title?: undefined;
    subTitle?: never;
}

export type NeuHeaderProps = HTMLAttributes<HTMLDivElement> &
    ArrowProps &
    (LogoProps | NoLogoProps) &
    (TitleProps | NoTitleProps) &
    Pick<HeaderRootProps, 'gradientColor'>;

/**
 * Сборный компонент для отрисовки шапки страницы.
 * Уже включает в себя все составные части шапки.
 * Компонент реализован для упрощения работы с шапкой при разработке проекта на Typescript.
 * Изменения в свойствах:
 * * Имеет упрощенный интерфейс - свойства `back` и `minimize` заменены на свойство `arrow`;
 * * Обработчики клика по стрелке `onBackClick` и `onMinimizeClick` заменены на обработчик `onArrowClick`;
 * * Свойство `subtitle` переименовано в `subTitle`.
 * `NeuHeader` заменит собой исходный `Header` в будущих версиях.
 */
export const NeuHeader: React.FC<NeuHeaderProps> = ({
    arrow,
    onArrowClick,
    logo,
    logoAlt,
    title,
    subTitle,
    children,
    ...rest
}) => {
    return (
        <HeaderRoot {...rest}>
            <HeaderArrow onClick={onArrowClick} arrow={arrow} />
            {logo && <HeaderLogo src={logo} alt={logoAlt} />}
            {title && (
                <HeaderTitleWrapper>
                    <HeaderTitle>{title}</HeaderTitle>
                    {subTitle && <HeaderSubtitle>{subTitle}</HeaderSubtitle>}
                </HeaderTitleWrapper>
            )}
            {children && <HeaderContent>{children}</HeaderContent>}
        </HeaderRoot>
    );
};
