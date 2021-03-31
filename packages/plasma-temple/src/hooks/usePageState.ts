import { last } from '../utils/last';
import { useAppState } from './useAppState';


export function usePageState() {
    const { state, actions } = useAppState();

    return {
        state: last(state.history),
        actions,
    };
}
