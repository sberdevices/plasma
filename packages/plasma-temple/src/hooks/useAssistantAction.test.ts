import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { AssistantInstance, OnStart } from '../types';

import { useAssistantAction, useOnDataHandler } from './useAssistantAction';

describe.skip('useAssistantAction', () => {
    let assistant: React.MutableRefObject<AssistantInstance>;
    let renderHookResults: ReturnType<typeof renderHook>;
    const config = {
        initPhrase: 'Привет!',
        nativePanel: {
            defaultText: 'Привет!',
        },
    };

    const onStartHandler: OnStart = jest.fn(() => { });


    beforeEach(() => {
        const { result } = renderHook(() => React.useRef<AssistantInstance>(null));

        assistant = result.current;
        renderHookResults = renderHook(() => useAssistantAction(result.current, { ...config, getState: () => ({}) }, onStartHandler));
    });

    it('onStart is call', (done) => {
        // TODO: write correct test
        act(() => {});

        done();
    });
});