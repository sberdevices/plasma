import type { Name as ColorName } from '../components/ThemeColors';

type Theme<T extends string> = Record<T, string>;
type ThemeContainer = {
    ':root': Theme<string>;
};

const extractCanvasColors = (theme: Theme<string>, suffix: string) =>
    Object.entries(theme)
        .filter(([key]) => key.match(/^--/))
        .reduce((acc, [key, value]) => {
            let name = key.replace('--plasma-colors-', '');
            switch (name) {
                case 'accent':
                    name = `accent${suffix}`;
                    break;
                case 'voicePhraseGradient':
                    name = `voicePhraseGradient${suffix}`;
                    break;
                case 'buttonAccent':
                    name = `buttonAccent${suffix}`;
                    break;
                case 'gradient':
                    name = `gradient${suffix}`;
                    break;
                default:
                    break;
            }
            return { ...acc, [name]: value };
        }, {});

/**
 * Преобразует темы в одну, дополнив ее соответствующими акцетентными цветами из каждой.
 * @param {object} darkThemes Объект с темными темами
 * @param {object} lightThemes Объект со светлыми темами
 */
export const extractCanvasThemeColors = (
    darkThemes: Record<string, ThemeContainer>,
    lightThemes: Record<string, ThemeContainer>,
): { dark: Theme<string>; light: Theme<string> } => ({
    dark: Object.entries(darkThemes).reduce(
        (acc, [name, theme]) => ({ ...acc, ...extractCanvasColors(theme[':root'], name) }),
        {} as Theme<ColorName>,
    ),
    light: Object.entries(lightThemes).reduce(
        (acc, [name, theme]) => ({ ...acc, ...extractCanvasColors(theme[':root'], name) }),
        {} as Theme<ColorName>,
    ),
});

const extractWebColors = (theme: Record<string, string>): Record<string, string> =>
    Object.entries(theme)
        .filter(([key]) => key.match(/^--/))
        .reduce((acc, [key, value]) => ({ ...acc, [key.replace('--plasma-colors-', '')]: value }), {});

export const extractWebThemeColors = (light: ThemeContainer, dark: ThemeContainer) => {
    return {
        light: extractWebColors(light[':root']),
        dark: extractWebColors(dark[':root']),
    };
};
