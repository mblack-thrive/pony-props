import { CSSProperties } from 'react';
import { ActionKind } from './usePony.interface';
export declare const usePony: ({ numItems, initialActiveSlideIndex, isAnnouncerVisible, reduceMotion, transitionDuration, onInit, onAfterChange, }: {
    numItems: number;
    initialActiveSlideIndex?: number | undefined;
    isAnnouncerVisible?: boolean | undefined;
    reduceMotion?: boolean | undefined;
    transitionDuration?: number | undefined;
    onInit?(): void;
    onAfterChange?(activeIndex: number): void;
}) => {
    getSectionProps: () => {
        ref: import("react").RefObject<HTMLDivElement>;
        as: string;
        'aria-labelledby': string;
    };
    getHeadingProps: () => {
        ref: import("react").RefObject<HTMLHeadingElement>;
        id: string;
    };
    getCarouselWrapperProps: () => {
        ref: import("react").RefObject<HTMLDivElement>;
        style: {
            width: string;
            overflow: string;
        };
    };
    getCarouselProps: () => {
        ref: import("react").RefObject<HTMLUListElement>;
        style: {
            display: string;
        };
    };
    getCarouselItemProps: (index: number) => {
        ref: import("react").RefObject<HTMLLIElement>;
        id: string;
        'aria-label': string;
        'aria-current': boolean;
        style: {
            order: number;
            display: string;
            flex: string;
            flexBasis: string;
            transition: string;
        };
    };
    getButtonProps: (direction: ActionKind.Previous | ActionKind.Next) => {
        ref: import("react").RefObject<HTMLButtonElement>;
        'aria-label': string;
        onClick: () => void;
    };
    getAnnouncerProps: () => {
        ref: import("react").RefObject<HTMLDivElement>;
        'aria-live': "polite" | "off" | "assertive" | undefined;
        'aria-atomic': boolean | "true" | "false" | undefined;
        style: CSSProperties;
    };
    state: {
        currentSwipeDirection: ActionKind.Next | ActionKind.Previous | null;
        activeSlideIndex: number;
        slideDirection: ActionKind;
        order: number[];
        animating: boolean;
    };
};
