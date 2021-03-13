import { isSberPortal } from '@sberdevices/ui/utils';
import { useContext, useEffect } from 'react';
import { AssistantContext } from '../assistant';
import { AppStateActions } from '../store/reducer';
import { Axis, Direction } from '../types';

const defaultStepSize = isSberPortal() ? 3 : 4;

interface UseGalleryVoiceNavigationProps {
    index: number;
    setIndex: (value: number) => void;
    axis: Axis;
    maxIndex: number;
    minIndex?: number;
    stepSize?: number;
    disabled?: boolean;
    main?: boolean;
}

export const useVoiceNavigation = ({
    index,
    setIndex,
    minIndex = 0,
    maxIndex,
    stepSize = defaultStepSize,
    disabled,
    axis,
    main,
}: UseGalleryVoiceNavigationProps) => {
    const assistant = useContext(AssistantContext);

    useEffect(() => {
        const removeListener = assistant?.on(
            'data',
            (command) => {
                if (disabled || command.type !== AppStateActions.navigation) {
                    return;
                }

                const direction = command.navigation.command;

                const isNext = axis === Axis.X ? direction === Direction.RIGHT : direction === Direction.DOWN;
                const isPrevious = axis === Axis.X ? direction === Direction.LEFT : direction === Direction.UP;

                if (isNext || main && direction === Direction.FORWARD) {
                    setIndex(maxIndex ? Math.min(maxIndex, index + stepSize) : index + stepSize);
                } else if (isPrevious) {
                    setIndex(Math.max(minIndex, index - stepSize));
                }
            },
        );

        return removeListener;
    }, [assistant, axis, disabled, index, maxIndex, minIndex, setIndex, stepSize]);
};

export const useVoiceNavigationWithSpatNav = ({ axis, main }: { axis: Axis, main?: boolean }) => {
    const assistant = useContext(AssistantContext);

    useEffect(() => {
        const removeListener = assistant?.on(
            'data',
            (command) => {
                if (command.type !== AppStateActions.navigation) {
                    return;
                }

                const direction = command.navigation.command;

                if (axis === Axis.X) {
                    switch(direction) {
                        case Direction.LEFT:
                            window.navigate('left');
                            break;
                        case Direction.RIGHT:
                            window.navigate('right');
                            break;
                        case Direction.FORWARD: {
                            if (main) {
                                window.navigate('right');
                            }
                            break;
                        }
                        default:
                            return;
                    }
                } else {
                    switch(direction) {
                        case Direction.DOWN:
                            window.navigate('down');
                            break;
                        case Direction.UP:
                            window.navigate('up');
                            break;
                        case Direction.FORWARD: {
                            if (main) {
                                window.navigate('down');
                            }
                            break;
                        }
                        default:
                            return;
                    }
                }
            },
        );

        return removeListener;
    }, [assistant]);
};
