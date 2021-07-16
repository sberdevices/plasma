import { Theme } from '../types';

export const SET_THEME = 'APP/SET_THEME';
export const OPEN_PANEL = 'APP/SHOW_PANEL';
export const CLOSE_PANEL = 'APP/CLOSE_PANEL';

export type AppAction =
    | {
          type: typeof SET_THEME;
          payload: { theme: Theme };
      }
    | {
          type: typeof OPEN_PANEL;
      }
    | {
          type: typeof CLOSE_PANEL;
      };

export const setTheme = (theme: Theme): AppAction => ({ type: SET_THEME, payload: { theme } });
export const openPanel = (): AppAction => ({ type: OPEN_PANEL });
export const closePanel = (): AppAction => ({ type: CLOSE_PANEL });
