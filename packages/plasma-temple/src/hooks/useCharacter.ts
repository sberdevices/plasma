import { CharacterId } from '@sberdevices/assistant-client';
import React from 'react';

import { AppStateContext } from '../components/PlasmaApp/AppStateContext';

export function useCharacter(): CharacterId {
    const {
        state: {
            ui: { character },
        },
    } = React.useContext(AppStateContext);

    return character;
}
