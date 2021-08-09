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
    white = 'Основной белый, не зависит от темы',
    whitePrimary = 'Основной белый, не зависит от темы',
    whiteSecondary = 'Второстепенный белый',
    whiteTertiary = 'Третичный белый',

    black = 'Основной чёрный, не зависит от темы',
    blackPrimary = 'Основной чёрный, не зависит от темы',
    blackSecondary = 'Второстепенный чёрный',
    blackTertiary = 'Третичный чёрный',

    transparent = '',

    buttonClear = 'Второстепенная прозрачная',

    buttonBlack = 'Дефолтная чёрная, не зависит от темы',
    buttonBlackSecondary = 'Второстепенная чёрная, не зависит от темы',
    buttonBlackTransparent = 'Чёрная для использования поверх картинок',

    buttonWhite = 'Дефолтная белая, не зависит от темы',
    buttonWhiteSecondary = 'Второстепенная белая, не зависит от темы',
}
export enum ThemeColorsList {
    text = 'Базовый цвет текста, совпадает с primary',
    primary = 'Основной текст в интерфейсе',
    secondary = 'Второстепенный текст',
    tertiary = 'Третичный цвет текста',

    paragraph = 'Сплошной наборный текст',
    inverse = 'Белый в светлой теме / Чёрный в тёмной теме',

    background = 'Основной бэкграунд всех приложений и смартапов',
    backgroundPrimary = 'Первичный цвет фона',
    backgroundSecondary = 'Вторичный цвет фона',
    backgroundTertiary = 'Третичный цвет фона',

    accent = 'Акцентный цвет бренда',
    success = 'Обозначение успешного сценария',
    warning = 'Цвет предупреждения',
    critical = 'Цвет ошибки',

    overlay = 'Цвет фона паранжи',

    gradient = 'Градиент для заливки основного фона',
    gradientDevice = 'Бэкграунд ассистента на девайсах',

    surfaceLiquid01 = 'Полупрозрачные поверхности',
    surfaceLiquid02 = 'Полупрозрачные поверхности',
    surfaceLiquid03 = 'Полупрозрачные поверхности',
    surfaceSolid01 = 'Непрозрачные поверхности',
    surfaceSolid02 = 'Непрозрачные поверхности',
    surfaceSolid03 = 'Непрозрачные поверхности',
    surfaceCard = 'Основной фон для карточек',

    buttonPrimary = 'Первичный цвет контролов',
    buttonSecondary = 'Второстепенная кнопка',

    buttonAccent = 'Акцентный цвет у контролов',
    buttonSuccess = 'Кнопка для успешного сценария',
    buttonWarning = 'Цвет предупреждения у контролов',
    buttonCritical = 'Цвет ошибки у контролов',
    buttonChecked = 'Цвет зажатого контрола',
    buttonFocused = 'Цвет рамки фокуса у контрола',

    speechBubbleSent = 'Цвет фона баблов отправленный сообщений',
    speechBubbleReceived = 'Цвет фона баблов получнных сообщений',

    voicePhraseGradient = 'Градиент подсказок о голосовых запросах',

    skeletonGradient = 'Градиент скелетона',
    skeletonGradientLighter = 'Градиент скелетона для ярких компонентов',
}

export const FullColorsList = { ...BaseColorsList, ...ThemeColorsList };

export type BaseColors = TokenGroup<TColor> & Record<keyof typeof BaseColorsList, TokenData<TColor>>;
export type ThemeColors = TokenGroup<TColor> & Record<keyof typeof ThemeColorsList, TokenData<TColor>>;
export type FullColors = BaseColors & ThemeColors;

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
