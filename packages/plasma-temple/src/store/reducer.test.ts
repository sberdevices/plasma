import { AppState, reducer } from './reducer';
import { changeActiveScreenState, popHistory, pushHistory, setCharacter, setInsets } from './actions';

describe('Testing reducer', () => {
    const initialState: AppState = {
        history: [],
        ui: { character: 'sber', insets: { top: 0, bottom: 0, left: 0, right: 0 } },
    };

    it('character action', () => {
        const character = 'joy';
        const action = setCharacter({ character });
        const newState = reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            ui: {
                ...initialState.ui,
                character,
            },
        });
    });

    it('insets action', () => {
        const insets = { top: 10, bottom: 20, left: 30, right: 40 };
        const action = setInsets({ insets });
        const newState = reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            ui: {
                ...initialState.ui,
                insets,
            },
        });
    });

    it('pushHistory action', () => {
        const history = { name: 'name', data: 'data' };
        const action = pushHistory({ history });
        const newState = reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            history: [history],
        });
    });

    it('popHistory action', () => {
        const state = { ...initialState, history: [{ name: 'name', data: 'data' }] };
        const action = popHistory();
        const newState = reducer(state, action);

        expect(newState).toEqual({
            ...initialState,
            history: [],
        });
    });

    it('changeActiveScreenState action', () => {
        const newDataState = 'newDataState';
        const history = { name: 'name', data: 'data' };
        const state = { ...initialState, history: [history] };
        const action = changeActiveScreenState({ data: newDataState });
        const newState = reducer(state, action);

        expect(newState).toEqual({
            ...initialState,
            history: [{ ...history, data: newDataState }],
        });
    });
});
