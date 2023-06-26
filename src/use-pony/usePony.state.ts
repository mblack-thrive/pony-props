import { Action, ActionKind, State } from './usePony.interface';
import { getOrder } from './utils/get-flex-order';

export const initialState: State = {
  activeSlideIndex: 0,
  slideDirection: ActionKind.Reset,
  order: [],
};

export const reducer = (prevState: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.Reset:
      return initialState;
    case ActionKind.Previous:
      const isFirstIndex = prevState.activeSlideIndex === 0;
      return {
        ...prevState,
        slideDirection: ActionKind.Previous,
        activeSlideIndex: isFirstIndex
          ? payload?.numItems - 1
          : prevState.activeSlideIndex - 1,
      };
    case ActionKind.Next:
      const isLastIndex = prevState.activeSlideIndex === payload.numItems - 1;
      return {
        ...prevState,
        slideDirection: ActionKind.Next,
        activeSlideIndex: isLastIndex ? 0 : prevState.activeSlideIndex + 1,
      };
    case ActionKind.UpdateOrder:
      return {
        ...prevState,
        order: (new Array(payload?.numItems).map((e, i) => getOrder({
          index: i,
          activeSlideIndex: payload?.activeSlideIndex || prevState.activeSlideIndex,
          numItems: payload?.numItems,
        }))),
      };
    default:
      return prevState;
  }
};
