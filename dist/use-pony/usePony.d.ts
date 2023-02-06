import { CSSProperties } from 'react';
import { ActionKind } from './usePony.interface';
export declare const usePony: ({ numItems, isAnnouncerVisible, }: {
    numItems: number;
    isAnnouncerVisible?: boolean | undefined;
}) => {
    getSectionProps: () => {
        ref: import("react").RefObject<HTMLDivElement>;
        as: string;
        'aria-labelledby': string;
        'aria-roledescription': string;
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
        'aria-label': string;
        style: {
            display: string;
        };
    };
    getCarouselItemProps: (index: number) => {
        ref: import("react").RefObject<HTMLLIElement>;
        id: string;
        'aria-roledescription': string;
        'aria-label': string;
        'aria-current': boolean;
        'aria-hidden': boolean;
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
    };
};
