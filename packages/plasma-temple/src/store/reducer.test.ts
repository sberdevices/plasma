import { Screen } from '../types';
import { last } from '../utils/last';

import { reducer, AppState } from './reducer';
import * as actions from './actions';

describe('Testing reducer', () => {
    let state: AppState = { history: [], theme: 'sber' };

    const dispatch = (action) => {
        state = reducer(state, action);

        return action;
    };

    it('pushState action', () => {
        dispatch(
            actions.pushStateAction({
                type: Screen.gallery,
                data: [],
                step: 0,
                position: 0,
            }),
        );

        expect(state.history.length).toEqual(1);
        expect(last(state.history).type).toEqual(Screen.gallery);
    });

    it('setStep action', () => {
        dispatch(
            actions.setStepAction({
                step: 10,
            }),
        );

        expect(state.history.length).toEqual(1);
        expect(last(state.history).step).toEqual(10);
    });

    it('setPosition action', () => {
        dispatch(
            actions.setPositionAction({
                position: 10,
            }),
        );

        expect(state.history.length).toEqual(1);
        expect(last(state.history).position).toEqual(10);
    });

    it('pushState action again', () => {
        dispatch(
            actions.pushStateAction({
                type: Screen.entity,
                data: {
                    background: {
                        src: '',
                    },
                    entities: [],
                    entitiesTitle: '',
                    itemShowButtonText: 'Button',
                    description: [{ title: "", content: "" }],
                    id: '',
                    title: '',
                },
                step: 0,
                position: 0,
            }),
        );

        expect(state.history.length).toEqual(2);
        expect(last(state.history).type).toEqual(Screen.entity);
    });

    it('popState action', () => {
        dispatch(actions.popStateAction);

        expect(state.history.length).toEqual(1);
        expect(last(state.history).type).toEqual(Screen.gallery);
    });

    it('setState action', () => {
        dispatch(
            actions.setStateAction({
                data: [
                    {
                        id: '',
                        title: '',
                        items: [],
                    },
                ],
                step: 1,
                position: 1,
            }),
        );

        expect(state.history.length).toEqual(1);
        expect(last(state.history).step).toEqual(1);
        expect(last(state.history).position).toEqual(1);
        expect((last(state.history).data as Array<any>).length).toEqual(1);
    });
});
