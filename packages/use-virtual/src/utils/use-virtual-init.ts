import { useMemo, useReducer } from 'react';

import { Range, VirtualDynamicProps, VirtualProps, VirtualPropsKeyboard } from '../types';

type State = {
    range: Range;
    currentIndex: number;
    isScrolling: boolean;
};

type SetIndexParams = {
    itemsLength: number;
};

type SetIndexRangeParams = SetIndexParams & {
    limit?: number;
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
              getRange: (v: Range) => Range;
          };
      }
    | {
          type: 'set range and isScrolling true';
          payload: {
              getRange: (v: Range) => Range;
          };
      }
    | {
          type: 'set isScrolling false';
      };

const getSafeCurrent = (current: number, size: number) => {
    if (current < 0) {
        return size - 1;
    }

    if (current > size - 1) {
        return 0;
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
        case 'set range and isScrolling true':
        case 'set range':
            return {
                ...state,
                isScrolling: action.type === 'set range and isScrolling true',
                range: action.payload.getRange(state.range),
            };
        case 'set isScrolling false': {
            return {
                ...state,
                isScrolling: false,
            };
        }
        case 'up index':
        case 'down index': {
            const { itemsLength } = action.payload.params;
            const currentIndex = getSafeCurrent(
                action.type === 'up index' ? state.currentIndex + 1 : state.currentIndex - 1,
                itemsLength,
            );

            return {
                ...state,
                currentIndex,
            };
        }
        case 'up index and range':
        case 'down index and range': {
            const {
                limit = state.range.end - state.range.start,
                itemsLength,
                align = 'center',
            } = action.payload.params;
            const offset = getOffset(limit, align);
            const currentIndex = getSafeCurrent(
                action.type === 'up index and range' ? state.currentIndex + 1 : state.currentIndex - 1,
                itemsLength,
            );

            let { start } = state.range;
            const isLatest = currentIndex >= itemsLength - 1 - offset;
            const currentIsOkWithStart = currentIndex >= start;
            const endToGo = state.range.end - offset;
            const currentIsOkWithEnd = currentIndex <= endToGo;

            if (isLatest) {
                start = itemsLength - limit;
            } else if (!currentIsOkWithStart) {
                start = currentIndex;
            } else if (!currentIsOkWithEnd) {
                start = currentIndex - offset;
            }

            return {
                ...state,
                range: {
                    start,
                    end: start + limit - 1,
                },
                currentIndex,
            };
        }
        default:
            throw new Error('useVirualInit reducer');
    }
};

export function useVirualInit({
    horizontal = false,
    initialCurrentIndex = 0,
    initialRange,
    ...props
}: VirtualProps | VirtualPropsKeyboard | VirtualDynamicProps) {
    // нужно только для scroll хуков
    const sizeKey = horizontal ? 'clientWidth' : 'clientHeight';
    // нужно только для scroll хуков
    const scrollKey = horizontal ? 'scrollLeft' : 'scrollTop';

    const [state, dispatch] = useReducer(reducer, {
        range: initialRange || {
            start: 0,
            end: 'limit' in props && typeof props.limit === 'number' ? props.limit - 1 : 0,
        },
        currentIndex: initialCurrentIndex,
        isScrolling: false,
    });

    const {
        upIndex,
        downIndex,
        upIndexAndRange,
        downIndexAndRange,
        setRange,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
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
            setRange: (getRange: (v: Range) => Range) =>
                dispatch({
                    type: 'set range',
                    payload: { getRange },
                }),
            setRangeAndIsScrollingTrue: (getRange: (v: Range) => Range) =>
                dispatch({
                    type: 'set range and isScrolling true',
                    payload: { getRange },
                }),
            setIsScrollingFalse: () => {
                dispatch({
                    type: 'set isScrolling false',
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
    } as const;
}

export type UseVirualInit = ReturnType<typeof useVirualInit>;
