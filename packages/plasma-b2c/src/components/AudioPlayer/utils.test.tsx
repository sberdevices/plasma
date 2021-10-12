import { renderHook } from '@testing-library/react-hooks/dom';

import { formatSecondsToMintues, useAudioPlayer } from './utils';

describe('AudioPlayer utils', () => {
    describe('formatSecondsToMintues', () => {
        it('Should return empty array', () => {
            expect(formatSecondsToMintues(0)).toBe('00:00');
        });

        it('Should return new array without element by number id', () => {
            expect(formatSecondsToMintues(120)).toBe('02:00');
        });

        it('Should return new array without element by string id', () => {
            expect(formatSecondsToMintues(321)).toBe('05:21');
        });
    });

    // ToDo: improve test
    describe('useAudioPlayer', () => {
        it('Should call play', () => {
            const refAudio = {
                current: ({
                    play: jest.fn(),
                    pause: jest.fn(),
                } as unknown) as HTMLAudioElement,
            };

            const isPlaying = true;

            renderHook(() => useAudioPlayer('mock-url', isPlaying, refAudio));

            expect(refAudio.current.pause).toBeCalledTimes(0);
            expect(refAudio.current.play).toBeCalledTimes(1);
        });

        it('Should call pause', () => {
            const refAudio = {
                current: ({
                    play: jest.fn(),
                    pause: jest.fn(),
                } as unknown) as HTMLAudioElement,
            };

            const isPlaying = false;

            renderHook(() => useAudioPlayer('mock-url', isPlaying, refAudio));

            expect(refAudio.current.pause).toBeCalledTimes(1);
            expect(refAudio.current.play).toBeCalledTimes(0);
        });

        it('Should return false', () => {
            const refAudio = {
                current: undefined,
            };

            const { result: canPlaying } = renderHook(() => useAudioPlayer('mock-url', false, refAudio));

            expect(canPlaying.current).toEqual([false]);
        });
    });
});
