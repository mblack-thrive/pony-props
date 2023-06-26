export enum ActionKind {
  Next = 'Next',
  Previous = 'Previous',
  Reset = 'Reset',
  UpdateOrder = 'UpdateOrder',
}

export type State = {
  activeSlideIndex: number;
  slideDirection: ActionKind;
  order: number[];
};

export type Action = {
  type: ActionKind;
  payload: {
    numItems: number;
    activeSlideIndex?: number;
  };
};
