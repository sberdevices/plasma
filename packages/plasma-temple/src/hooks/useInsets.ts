import { useContext } from 'react';
import { AppStateContext } from '../components/PlasmaApp/AppStateContext';

export function useInsets() {
    const {
        state: {
            ui: { insets },
        },
    } = useContext(AppStateContext);

    return insets;
}
