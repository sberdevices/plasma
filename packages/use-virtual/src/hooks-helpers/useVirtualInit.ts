import { useMemo, useReducer } from 'react';

import { VisibleRange, VirtualDynamicProps, VirtualProps, VirtualPropsKeyboard } from '../types';

type State = {
    range: VisibleRange;
    currentIndex: number;
    isScrolling: boolean;
    /**
     * lastUpdateSource нужен для вызова scrollToIndex.
     * scrollToIndex вызываем только в случае обновления
     * currentIndex с клавиатуры.
     */
    lastUpdateSource: 'init' | 'scroll' | 'keyboard';
    /**
     * isScrollingToIndex - запоминаем,
     * что был вызван scrollToIndex.
     * Чтобы узнать надо пересчитывать currentIndex или нет.
     * lastUpdateSource подошел бы, но не для SmoothScroll.
     */
    isScrollingToIndex: boolean;
};

type SetIndexParams = {
    itemCount: number;
};

type SetIndexRangeParams = SetIndexParams & {
    align?: 'center' | 'end';
};

type Action =
    | {
          type: 'up index';
          payload: {
              params: SetIndexParams;
          };
      }
    | {
          type: 'up index and range';
          payload: {
              params: SetIndexRangeParams;
          };
      }
    | {
          type: 'down index';
          payload: {
              params: SetIndexParams;
          };
      }
    | {
          type: 'down index and range';
          payload: {
              params: SetIndexRangeParams;
          };
      }
    | {
          type: 'set range';
          payload: {
              getRange: (v: VisibleRange) => VisibleRange;
          };
      }
    | {
          type: 'set range and isScrolling true';
          payload: {
              getRange: (v: VisibleRange) => VisibleRange;
          };
      }
    | {
          type: 'set isScrolling false';
      }
    | {
          type: 'set current index after scrolling';
          payload: number;
      }
    | {
          type: 'set isScrollingToIndex true';
          payload: number | undefined;
      };

const getSafeCurrent = (current: number, size: number) => {
    if (current < 0) {
        return 0;
    }

    if (current > size - 1) {
        return size - 1;
    }

    return current;
};

const getOffset = (limit: number, align: 'center' | 'end') => {
    switch (align) {
        case 'center':
            return Math.floor(limit / 2);
        default:
            return 0;
    }
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        // вызывается только на scroll event
        case 'set range and isScrolling true':
        case 'set range': {
            return {
                ...state,
                isScrolling: action.type === 'set range and isScrolling true',
                range: action.payload.getRange(state.range),
                lastUpdateSource: 'scroll' as const,
            };
        }
        case 'set isScrolling false': {
            return {
                ...state,
                isScrolling: false,
                lastUpdateSource: 'scroll' as const,
            };
        }
        case 'up index':
        case 'down index': {
            const { itemCount } = action.payload.params;
            const currentIndex = getSafeCurrent(
                action.type === 'up index' ? state.currentIndex + 1 : state.currentIndex - 1,
                itemCount,
            );

            return {
                ...state,
                currentIndex,
                lastUpdateSource: 'keyboard' as const,
            };
        }
        // используем только в useKeyboard хуках
        case 'up index and range':
        case 'down index and range': {
            const { itemCount, align = 'center' } = action.payload.params;
            const limit = state.range.end - state.range.start;
            const offset = getOffset(limit, align);
            const currentIndex = getSafeCurrent(
                action.type === 'up index and range' ? state.currentIndex + 1 : state.currentIndex - 1,
                itemCount,
            );

            let { start } = state.range;
            const isLatest = currentIndex >= itemCount - 1 - offset;
            const currentIsOkWithStart = currentIndex >= start;
            const endToGo = state.range.end - offset - 1;
            const currentIsOkWithEnd = currentIndex <= endToGo;

            if (isLatest) {
                start = itemCount - limit;
            } else if (!currentIsOkWithStart) {
                start = currentIndex;
            } else if (!currentIsOkWithEnd) {
                start = currentIndex - offset;
            }

            return {
                ...state,
                range: {
                    start,
                    end: start + limit,
                },
                currentIndex,
                lastUpdateSource: 'keyboard' as const,
            };
        }
        case 'set current index after scrolling': {
            const newCurrentIndex = action.payload;

            if (newCurrentIndex === state.currentIndex) {
                return state;
            }

            return {
                ...state,
                currentIndex: state.isScrollingToIndex ? state.currentIndex : newCurrentIndex,
                isScrollingToIndex: false,
            };
        }
        case 'set isScrollingToIndex true':
            return {
                ...state,
                isScrollingToIndex: true,
                currentIndex: action.payload ?? state.currentIndex,
            };
        default:
            throw new Error('useVirualInit reducer');
    }
};

export function useVirualInit({
    horizontal = false,
    initialCurrentIndex = 0,
    initialRange,
}: VirtualProps | VirtualPropsKeyboard | VirtualDynamicProps) {
    // нужно только для scroll хуков
    const sizeKey = horizontal ? 'clientWidth' : 'clientHeight';
    // нужно только для scroll хуков
    const scrollKey = horizontal ? 'scrollLeft' : 'scrollTop';

    const [state, dispatch] = useReducer(reducer, {
        range: initialRange || {
            start: 0,
            end: 0,
        },
        currentIndex: initialCurrentIndex,
        isScrolling: false,
        lastUpdateSource: 'init',
        isScrollingToIndex: false,
    });

    const {
        upIndex,
        downIndex,
        upIndexAndRange,
        downIndexAndRange,
        setRange,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
        setCurrentIndexAfterScrolling,
        setIsScrollingToIndexTrue,
    } = useMemo(
        () => ({
            upIndex: (params: SetIndexParams) =>
                dispatch({
                    type: 'up index',
                    payload: { params },
                }),
            downIndex: (params: SetIndexParams) =>
                dispatch({
                    type: 'down index',
                    payload: { params },
                }),
            upIndexAndRange: (params: SetIndexRangeParams) =>
                dispatch({
                    type: 'up index and range',
                    payload: { params },
                }),
            downIndexAndRange: (params: SetIndexRangeParams) =>
                dispatch({
                    type: 'down index and range',
                    payload: { params },
                }),
            setRange: (getRange: (v: VisibleRange) => VisibleRange) =>
                dispatch({
                    type: 'set range',
                    payload: { getRange },
                }),
            setRangeAndIsScrollingTrue: (getRange: (v: VisibleRange) => VisibleRange) =>
                dispatch({
                    type: 'set range and isScrolling true',
                    payload: { getRange },
                }),
            setIsScrollingFalse: () => {
                dispatch({
                    type: 'set isScrolling false',
                });
            },
            setCurrentIndexAfterScrolling: (currentIndex: number) => {
                dispatch({
                    type: 'set current index after scrolling',
                    payload: currentIndex,
                });
            },
            setIsScrollingToIndexTrue: (currentIndex?: number) => {
                dispatch({
                    type: 'set isScrollingToIndex true',
                    payload: currentIndex,
                });
            },
        }),
        [],
    );

    return {
        sizeKey,
        scrollKey,
        range: state.range,
        setRange,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
        upIndex,
        downIndex,
        upIndexAndRange,
        downIndexAndRange,
        currentIndex: state.currentIndex,
        isScrolling: state.isScrolling,
        lastUpdateSource: state.lastUpdateSource,
        setCurrentIndexAfterScrolling,
        setIsScrollingToIndexTrue,
    } as const;
}

export type UseVirualInit = ReturnType<typeof useVirualInit>;
