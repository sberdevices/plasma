import React from 'react';
import { renderHook } from '@testing-library/react-hooks/dom';
import { createAssistant, createAssistantHostMock } from '@sberdevices/assistant-client';
import { useVoiceNavigation, useVoiceNavigationWithSpatNav } from './useVoiceNavigation';
import { AssistantInstance, Axis, Direction } from '../types';
import { AssistantContext } from '../components/PlasmaApp/AssistantContext';

describe('useVoiceNavigationHook', () => {
    let assistantMock: AssistantInstance;
    let assistantHostMock: ReturnType<typeof createAssistantHostMock>;

    const sendNavigationCommand = (command: Direction) => {
        return assistantHostMock.receiveCommand({
            type: 'navigation',
            navigation: { command },
        });
    };

    const setIndex = jest.fn();
    const wrapper: React.FC = ({ children }) => (
        <AssistantContext.Provider value={{ assistant: assistantMock, setAssistantState: () => {} }}>
            {children}
        </AssistantContext.Provider>
    );

    beforeEach(() => {
        assistantMock = createAssistant({ getState: () => ({}) });
        assistantHostMock = createAssistantHostMock({ context: window });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when voice navigation is disabled', () => {
        it('then should do nothing', (done) => {
            renderHook(
                () =>
                    useVoiceNavigation({
                        index: 0,
                        setIndex,
                        maxIndex: 10,
                        stepSize: 1,
                        axis: 'y',
                        disabled: true,
                    }),
                { wrapper },
            );

            assistantHostMock.onReady(async () => {
                await sendNavigationCommand('DOWN');
                expect(setIndex).toBeCalledTimes(0);
                done();
            });
        });
    });

    describe('when assistant command is not a navigation command', () => {
        it('then should do nothing', (done) => {
            renderHook(
                () =>
                    useVoiceNavigation({
                        index: 0,
                        setIndex,
                        maxIndex: 10,
                        stepSize: 1,
                        axis: 'y',
                    }),
                { wrapper },
            );

            assistantHostMock.onReady(async () => {
                await assistantHostMock.receiveCommand({
                    type: 'smart_app_data',
                    action: { type: 'NAVIGATE', direction: 'DOWN' },
                });

                expect(setIndex).toBeCalledTimes(0);
                done();
            });
        });
    });

    describe('when axis is X', () => {
        const axis: Axis = 'x';

        describe('and direction is right', () => {
            const direction = 'RIGHT';

            it('then should increase index on value of stepSize if index is less than max index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 1,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(6);
                    done();
                });
            });

            it('then should increase index but not more than max index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 9,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(10);
                    done();
                });
            });
        });

        describe('and direction is left', () => {
            const direction = 'LEFT';

            it('then should decrease index on value of stepSize if index is more than min index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 10,
                            setIndex,
                            minIndex: 0,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(5);
                    done();
                });
            });

            it('then should decrease index, but not more than min index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 3,
                            setIndex,
                            minIndex: 0,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(0);
                    done();
                });
            });
        });

        describe('and direction is forward', () => {
            const direction = 'FORWARD';

            it('then should increase index on value of stepSize if axis is main', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 1,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 2,
                            axis,
                            main: true,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(3);
                    done();
                });
            });

            it('then should do nothing if axis is not main', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 1,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 2,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledTimes(0);
                    done();
                });
            });
        });

        describe('and direction is down', () => {
            it('then should do nothing', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 0,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand('DOWN');
                    expect(setIndex).toBeCalledTimes(0);
                    done();
                });
            });
        });
    });

    describe('when axis is Y', () => {
        const axis: Axis = 'y';

        describe('and direction is down', () => {
            const direction = 'DOWN';

            it('then should increase index on value of stepSize if index is less than max index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 1,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(6);
                    done();
                });
            });

            it('then should increase index but not more than max index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 9,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(10);
                    done();
                });
            });
        });

        describe('and direction is up', () => {
            const direction = 'UP';

            it('then should decrease index on value of stepSize if index is more than min index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 10,
                            setIndex,
                            minIndex: 0,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(5);
                    done();
                });
            });

            it('then should decrease index, but not more than min index', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 3,
                            setIndex,
                            minIndex: 0,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(0);
                    done();
                });
            });
        });

        describe('and direction is forward', () => {
            const direction = 'FORWARD';

            it('then should increase index on value of stepSize if axis is main', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 1,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 2,
                            axis,
                            main: true,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledWith(3);
                    done();
                });
            });

            it('then should do nothing if axis is not main', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 1,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 2,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(setIndex).toBeCalledTimes(0);
                    done();
                });
            });
        });

        describe('and direction is right', () => {
            it('then should do nothing', (done) => {
                renderHook(
                    () =>
                        useVoiceNavigation({
                            index: 0,
                            setIndex,
                            maxIndex: 10,
                            stepSize: 5,
                            axis,
                        }),
                    { wrapper },
                );

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand('RIGHT');
                    expect(setIndex).toBeCalledTimes(0);
                    done();
                });
            });
        });
    });
});

describe('useVoiceNavigationWithSpatNav', () => {
    let assistantMock: AssistantInstance;
    let assistantHostMock: ReturnType<typeof createAssistantHostMock>;

    const sendNavigationCommand = (command: Direction) => {
        return assistantHostMock.receiveCommand({
            type: 'navigation',
            navigation: { command },
        });
    };

    const wrapper: React.FC = ({ children }) => (
        <AssistantContext.Provider value={{ assistant: assistantMock, setAssistantState: () => {} }}>
            {children}
        </AssistantContext.Provider>
    );

    const navigateMock = jest.fn();
    Object.defineProperty(window, 'navigate', { value: navigateMock });

    beforeEach(() => {
        assistantMock = createAssistant({ getState: () => ({}) });
        assistantHostMock = createAssistantHostMock({ context: window });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when assistant command is not a navigation command', () => {
        it('then should do nothing', (done) => {
            renderHook(() => useVoiceNavigationWithSpatNav({ axis: 'y' }), { wrapper });

            assistantHostMock.onReady(async () => {
                await assistantHostMock.receiveCommand({
                    type: 'smart_app_data',
                    action: { type: 'NAVIGATE', direction: 'DOWN' },
                });

                expect(navigateMock).toBeCalledTimes(0);
                done();
            });
        });
    });

    describe('when axis is Y', () => {
        const axis: Axis = 'y';

        describe.each<[Direction, string]>([
            ['DOWN', 'down'],
            ['UP', 'up'],
        ])('and direction is %s', (direction, expected) => {
            it(`then should navigate ${expected}`, (done) => {
                renderHook(() => useVoiceNavigationWithSpatNav({ axis }), { wrapper });

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(navigateMock).toBeCalledWith(expected);
                    done();
                });
            });
        });

        describe.each<Direction>(['LEFT', 'RIGHT'])('and direction is %s', (direction) => {
            it('then should not navigate', (done) => {
                renderHook(() => useVoiceNavigationWithSpatNav({ axis }), { wrapper });

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(navigateMock).toBeCalledTimes(0);
                    done();
                });
            });
        });

        describe('and direction is forward', () => {
            const direction: Direction = 'FORWARD';

            describe('and axis is main', () => {
                const main = true;

                it('then should navigate down', (done) => {
                    renderHook(() => useVoiceNavigationWithSpatNav({ axis, main }), { wrapper });

                    assistantHostMock.onReady(async () => {
                        await sendNavigationCommand(direction);
                        expect(navigateMock).toBeCalledWith('down');
                        done();
                    });
                });
            });

            describe('and axis is not main', () => {
                it('then should not navigate', (done) => {
                    renderHook(() => useVoiceNavigationWithSpatNav({ axis }), { wrapper });

                    assistantHostMock.onReady(async () => {
                        await sendNavigationCommand(direction);
                        expect(navigateMock).toBeCalledTimes(0);
                        done();
                    });
                });
            });
        });
    });

    describe('when axis is X', () => {
        const axis: Axis = 'x';

        describe.each<[Direction, string]>([
            ['LEFT', 'left'],
            ['RIGHT', 'right'],
        ])('and direction is %s', (direction, expected) => {
            it(`then should navigate ${expected}`, (done) => {
                renderHook(() => useVoiceNavigationWithSpatNav({ axis }), { wrapper });

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(navigateMock).toBeCalledWith(expected);
                    done();
                });
            });
        });

        describe.each<Direction>(['UP', 'DOWN'])('and direction is %s', (direction) => {
            it('then should not navigate', (done) => {
                renderHook(() => useVoiceNavigationWithSpatNav({ axis }), { wrapper });

                assistantHostMock.onReady(async () => {
                    await sendNavigationCommand(direction);
                    expect(navigateMock).toBeCalledTimes(0);
                    done();
                });
            });
        });

        describe('and direction is forward', () => {
            const direction: Direction = 'FORWARD';

            describe('and axis is main', () => {
                const main = true;

                it('then should navigate right', (done) => {
                    renderHook(() => useVoiceNavigationWithSpatNav({ axis, main }), { wrapper });

                    assistantHostMock.onReady(async () => {
                        await sendNavigationCommand(direction);
                        expect(navigateMock).toBeCalledWith('right');
                        done();
                    });
                });
            });

            describe('and axis is not main', () => {
                it('then should not navigate', (done) => {
                    renderHook(() => useVoiceNavigationWithSpatNav({ axis }), { wrapper });

                    assistantHostMock.onReady(async () => {
                        await sendNavigationCommand(direction);
                        expect(navigateMock).toBeCalledTimes(0);
                        done();
                    });
                });
            });
        });
    });
});
