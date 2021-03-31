import React from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../AppStateContext';
import { popStateAction, pushStateAction, setPositionAction, setStateAction, setStepAction } from '../store/actions';
import { CurrentHistory, SetPositionPayload, SetStatePayload, SetStepPayload } from '../store/reducer';

export function useAppState() {
    const { state, dispatch } = useContext(AppStateContext);

    const actions = React.useMemo(() => ({
        popState: () => dispatch(popStateAction),
        pushState: (data: CurrentHistory) => dispatch(pushStateAction(data)),
        setState: (data: SetStatePayload) => dispatch(setStateAction(data)),
        setPosition: (position: SetPositionPayload) => dispatch(setPositionAction(position)),
        setStep: (step: SetStepPayload) => dispatch(setStepAction(step)),
    }), [dispatch]);

    return {
        state,
        actions,
    };
}
