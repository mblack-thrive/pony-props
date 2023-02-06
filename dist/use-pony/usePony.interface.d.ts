export declare enum ActionKind {
    Next = "Next",
    Previous = "Previous",
    Reset = "Reset"
}
export declare type State = {
    activeSlideIndex: number;
    slideDirection: ActionKind;
};
export declare type Action = {
    type: ActionKind;
    payload: {
        numItems: number;
    };
};
