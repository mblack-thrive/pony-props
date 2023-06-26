export declare enum ActionKind {
    Next = "Next",
    Previous = "Previous",
    Reset = "Reset",
    UpdateOrder = "UpdateOrder",
    AnimationComplete = "AnimationComplete"
}
export declare type State = {
    activeSlideIndex: number;
    slideDirection: ActionKind;
    order: number[];
    animating: boolean;
};
export declare type Action = {
    type: ActionKind;
    payload: {
        numItems: number;
        activeSlideIndex?: number;
    };
};
