import React from 'react';

import { HeaderProps } from '../Header/types';
import { Insets, ObjectFit } from '../../types';

export interface StateLayoutCommonProps {
    /** Основной текст состояния */
    title: string;
    /** @deprecated работает только c PlasmaApp */
    header?: HeaderProps;
    /** Дополнительный текст состояния */
    text?: string;
    /** Дополнительный контент, обычно кнопки для выполнения какого-либо действия */
    button: React.ReactNode;
    /** Ссылка на картинку используемую в качестве фона */
    background?: string;
    /** Устанавливает свойство object-fit для фона, значение по умолчанию используется `cover` */
    backgroundFit?: ObjectFit;
    /** Устанавливает свойство `width`, значение по умолчанию `100%` */
    backgroundWidth?: string;
    /** Ссылка на картинку состояния */
    image?: string | React.ReactNode;
    className?: string;
    /**
     * Отступы, вокруг контента. В текущей версии используется только в мобильной версии
     * для позиционирования контента передаваемого в пропсе `button`
     */
    insets?: Partial<Insets>;
}
