/**
 * Gets the flex order for a slide.
 * @param index - the index of the slide
 * @param activeSlideIndex - the current/visible slide index
 * @param numItems - number of slides in carousel
 * @returns the flex order for a carousel item
 */
export declare const getOrder: ({ index, activeSlideIndex, numItems, }: Record<'index' | 'activeSlideIndex' | 'numItems', number>) => number;
