export enum ActionKind {
  Next = 'Next',
  Previous = 'Previous',
  Reset = 'Reset',
  UpdateOrder = 'UpdateOrder',
  AnimationComplete = 'AnimationComplete',
}

export type State = {
  activeSlideIndex: number;
  slideDirection: ActionKind;
  order: number[];
  animating: boolean;
};

export type Action = {
  type: ActionKind;
  payload: {
    numItems: number;
    activeSlideIndex?: number;
  };
};
