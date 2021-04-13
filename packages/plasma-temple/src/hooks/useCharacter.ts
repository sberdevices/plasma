import { useContext } from 'react';
import { AppStateContext } from '../components/PlasmaApp/AppStateContext';

export function useCharacter() {
    const {
        state: {
            ui: { character },
        },
    } = useContext(AppStateContext);

    return character;
}
