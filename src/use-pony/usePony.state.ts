import { Action, ActionKind, State } from './usePony.interface';
import { getOrder } from './utils/get-flex-order';

export const initialState: State = {
  activeSlideIndex: 0,
  slideDirection: ActionKind.Reset,
  order: [],
  animating: false,
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
        animating: true,
      };
    case ActionKind.Next:
      const isLastIndex = prevState.activeSlideIndex === payload.numItems - 1;
      return {
        ...prevState,
        slideDirection: ActionKind.Next,
        activeSlideIndex: isLastIndex ? 0 : prevState.activeSlideIndex + 1,
        animating: true,
      };
    case ActionKind.UpdateOrder:
      return {
        ...prevState,
        order: (Array.apply(null, Array(payload?.numItems)).map((_, i) => getOrder({
          index: i,
          activeSlideIndex: payload?.activeSlideIndex || prevState.activeSlideIndex,
          numItems: payload?.numItems,
        }))),
      };
    case ActionKind.AnimationComplete:
      return {
        ...prevState,
        animating: false,
      };
    default:
      return prevState;
  }
};
