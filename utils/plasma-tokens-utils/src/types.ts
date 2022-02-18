import * as CSS from 'csstype';

import { BaseColorsList, ThemeColorsList, WebColorsList } from './constants';

type DataValue = string | number | DataObject;

/**
 * Объект с произвольным содержанием.
 */
export interface DataObject {
    [x: string]: DataValue;
}

export type CSSProperties = CSS.Properties<string | number>;

/**
 * Объект с корневыми CSSVariables.
 */
export type CSSRootTheme = {
    ':root': CSSProperties;
};

export type TokenType = string | CSSProperties | Array<string | number> | Record<string, string>;

/**
 * Содержимое дата-токена.
 */
export interface TokenData<T = {}> {
    value: T;
    comment?: string;
}

export type TColor = string;

/**
 * Группа дата-токенов.
 */
export interface TokenDataGroup<T = {}> {
    [key: string]: TokenData<T>;
}

export interface DesignLanguage {
    colors: Record<string, any>;
    typography: Record<string, any>;
}

export type BaseColors = TokenDataGroup<TColor> & Record<keyof typeof BaseColorsList, TokenData<TColor>>;
export type ThemeColors = TokenDataGroup<TColor> & Record<keyof typeof ThemeColorsList, TokenData<TColor>>;
export type WebColors = TokenDataGroup<TColor> & Partial<Record<keyof typeof WebColorsList, TokenData<TColor>>>;
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

/**
 * Объект со стилями по их типографическим компонентам.
 */
export type TypoStyles<T extends string> = { [key in T]: CSSProperties };

export type TypoSystem<TK extends string> = {
    /**
     * Все `fontSizes`.
     */
    fontSizes: string[];
    /**
     * Все `fonts`.
     */
    fonts: Record<string, string>;
    /**
     * Все `fontWeights`.
     */
    fontWeights: Record<string, number>;
    /**
     * Все `lineHeights`.
     */
    lineHeights: string[];
    /**
     * Все `letterSpacings`.
     */
    letterSpacings: string[];

    /**
     * Объект со стилями по их типографическим компонентам.
     */
    typoStyles: TypoStyles<TK>;
    /**
     * Алиас typoStyles.
     * ToDo: удалить в v2.0.
     */
    text: TypoStyles<TK>;
    styles?: { [key: string]: CSSProperties };
};

/**
 * Список с дескрипторами создаваемой файловой системы.
 */
export type GeneratedFiles = Array<{
    file: string;
    content: string;
}>;
