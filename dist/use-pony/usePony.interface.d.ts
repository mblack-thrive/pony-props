export declare enum ActionKind {
    Next = "Next",
    Previous = "Previous",
    Reset = "Reset",
    UpdateOrder = "UpdateOrder"
}
export declare type State = {
    activeSlideIndex: number;
    slideDirection: ActionKind;
    order: number[];
};
export declare type Action = {
    type: ActionKind;
    payload: {
        numItems: number;
        activeSlideIndex?: number;
    };
};
