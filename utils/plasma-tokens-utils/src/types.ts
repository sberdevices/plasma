import * as CSS from 'csstype';

export type CSSProperties = CSS.Properties<string | number>;

export type ThemeCSSObject = {
    ':root': Record<string, CSSProperties>;
};

export type TokenType = string | CSSProperties | Array<string | number> | Record<string, string>;

export interface TokenData<T = {}> {
    value: T;
    comment?: string;
}

export type TColor = string;

export interface TokenGroup<T = {}> {
    [key: string]: TokenData<T>;
}

export interface DesignLanguage {
    colors: Record<string, any>;
    typography: Record<string, any>;
}

export enum BaseColorsList {
    white = '',
    whitePrimary = '',
    whiteSecondary = '',
    whiteTertiary = '',

    black = '',
    blackPrimary = '',
    blackSecondary = '',
    blackTertiary = '',

    transparent = '',
}

export enum ThemeColorsList {
    text = 'Базовый цвет текста, совпадает с primary',
    primary = 'Первичный цвет текста',
    secondary = 'Вторичный цвет текста',
    tertiary = 'Третичный цвет текста',

    white = '',
    whitePrimary = 'Основной, не зависит от темы',
    whiteSecondary = 'Второстепенный, не зависит от темы',
    whiteTertiary = 'Третичный, не зависит от темы',

    black = '',
    blackPrimary = 'Основной чёрный, не зависит от темы',
    blackSecondary = 'Второстепенный чёрный, не зависит от темы',
    blackTertiary = 'Третичный чёрный, не зависит от темы',

    background = 'Базовый цвет фона, совпадает с backgroundPrimary',
    backgroundPrimary = 'Первичный цвет фона',
    backgroundSecondary = 'Вторичный цвет фона',
    backgroundTertiary = 'Третичный цвет текста',

    accent = 'Акцентный цвет призыва к действию',
    success = 'Обозначение успешного сценария',
    warning = 'Цвет предупреждения',
    critical = 'Цвет ошибки',

    overlay = 'Цвет фона паранжи',

    gradient = 'Градиент для заливки основного фона',

    surfaceLiquid01 = 'Цвет подложки 1',
    surfaceLiquid02 = 'Цвет подложки 2',
    surfaceLiquid03 = 'Цвет подложки 3',
    surfaceCard = 'Цвет подложки карточек',

    buttonPrimary = 'Первичный цвет контролов',
    buttonSecondary = 'Вторичный цвет контролов',

    buttonAccent = 'Акцентный цвет у контролов',
    buttonSuccess = 'Кнопка для успешного сценария',
    buttonWarning = 'Цвет предупреждения у контролов',
    buttonCritical = 'Цвет ошибки у контролов',
    buttonChecked = 'Цвет зажатого контрола',
    buttonFocused = 'Цвет рамки фокуса у контрола',
}

export type BaseColors = TokenGroup<TColor> & Record<keyof typeof BaseColorsList, TokenData<TColor>>;

export type ThemeColors = BaseColors & Record<keyof typeof ThemeColorsList, TokenData<TColor>>;

export interface TypographStyle {
    color?: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: string | number;
    fontStyle?: string;
    lineHeight?: string;
    letterSpacing: string | number;
    textAlign?: CSS.Properties['textAlign'];
    textDecoration?: string;
    textTransform?: CSS.Properties['textTransform'];
}

export type TypoStyles<T extends string> = { [key in T]: CSSProperties };

export type TypoSystem<TK extends string> = {
    fontSizes: string[];
    fonts: Record<string, string>;
    fontWeights: Record<string, number>;
    lineHeights: string[];
    letterSpacings: string[];

    text: TypoStyles<TK>;
    styles?: { [key: string]: CSSProperties };
};
