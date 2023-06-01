'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

(function (ActionKind) {
  ActionKind["Next"] = "Next";
  ActionKind["Previous"] = "Previous";
  ActionKind["Reset"] = "Reset";
})(exports.ActionKind || (exports.ActionKind = {}));

var initialState = {
  activeSlideIndex: 0,
  slideDirection: exports.ActionKind.Reset
};
var reducer = function reducer(prevState, action) {
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case exports.ActionKind.Reset:
      return initialState;

    case exports.ActionKind.Previous:
      var isFirstIndex = prevState.activeSlideIndex === 0;
      return _extends({}, prevState, {
        slideDirection: exports.ActionKind.Previous,
        activeSlideIndex: isFirstIndex ? (payload == null ? void 0 : payload.numItems) - 1 : prevState.activeSlideIndex - 1
      });

    case exports.ActionKind.Next:
      var isLastIndex = prevState.activeSlideIndex === payload.numItems - 1;
      return _extends({}, prevState, {
        slideDirection: exports.ActionKind.Next,
        activeSlideIndex: isLastIndex ? 0 : prevState.activeSlideIndex + 1
      });

    default:
      return prevState;
  }
};

/**
 * Gets the flex order for a slide.
 * @param index - the index of the slide
 * @param activeSlideIndex - the current/visible slide index
 * @param numItems - number of slides in carousel
 * @returns the flex order for a carousel item
 */
var getOrder = function getOrder(_ref) {
  var index = _ref.index,
      activeSlideIndex = _ref.activeSlideIndex,
      numItems = _ref.numItems;
  return index - activeSlideIndex < 0 ? numItems - Math.abs(index - activeSlideIndex) : index - activeSlideIndex;
};

var usePony = function usePony(_ref) {
  var numItems = _ref.numItems,
      _ref$initialActiveSli = _ref.initialActiveSlideIndex,
      initialActiveSlideIndex = _ref$initialActiveSli === void 0 ? initialState.activeSlideIndex : _ref$initialActiveSli,
      _ref$isAnnouncerVisib = _ref.isAnnouncerVisible,
      isAnnouncerVisible = _ref$isAnnouncerVisib === void 0 ? false : _ref$isAnnouncerVisib,
      _ref$reduceMotion = _ref.reduceMotion,
      reduceMotion = _ref$reduceMotion === void 0 ? false : _ref$reduceMotion,
      _ref$transitionDurati = _ref.transitionDuration,
      transitionDuration = _ref$transitionDurati === void 0 ? 500 : _ref$transitionDurati,
      onInit = _ref.onInit,
      onAfterChange = _ref.onAfterChange;

  var _useReducer = react.useReducer(reducer, _extends({}, initialState, {
    activeSlideIndex: initialActiveSlideIndex
  })),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var sectionRef = react.useRef(null);
  var headingRef = react.useRef(null);
  var carouselWrapperRef = react.useRef(null);
  var carouselRef = react.useRef(null);
  var carouselItemRef = react.useRef(null);
  var buttonRef = react.useRef(null);
  var announcerRef = react.useRef(null);
  var TRANSITION_DURATION_MS = reduceMotion ? 0 : transitionDuration;

  var _useState = react.useState(null),
      currentSwipeDirection = _useState[0],
      setCurrentSwipeDirection = _useState[1];

  var _useState2 = react.useState(reduceMotion),
      noMotion = _useState2[0],
      setNoMotion = _useState2[1];

  react.useEffect(function () {
    if (onInit) {
      onInit();
    }
  }, []);
  react.useEffect(function () {
    if (!sectionRef.current) {
      throw new Error('please apply getSectionProps() to your <section>');
    }

    if (!headingRef.current) {
      throw new Error('please apply getHeadingProps() to your <h{1,2,3}>');
    }

    if (!carouselWrapperRef.current) {
      throw new Error('please apply getCarouselWrapperProps() to your <div>');
    }

    if (!carouselRef.current) {
      throw new Error('please apply getCarouselProps() to your <ul>');
    }

    if (!carouselItemRef.current) {
      throw new Error('please apply getCarouselItemProps() to your <li>');
    }

    if (!buttonRef.current) {
      throw new Error('please apply getButtonProps() to your <button>');
    }

    if (!announcerRef.current) {
      throw new Error('please apply getAnnouncerProps() to your <div>');
    }
  }, [sectionRef, headingRef, carouselWrapperRef, carouselRef, carouselItemRef, buttonRef, announcerRef]);
  react.useEffect(function () {
    // Listen for swipe direction changes. Apply appropriate translateX transition.
    if (currentSwipeDirection) {
      var _carouselRef$current;

      var transformArray = [{
        transform: 'translateX(-100%)'
      }, {
        transform: 'translateX(0px)'
      }];
      carouselRef == null ? void 0 : (_carouselRef$current = carouselRef.current) == null ? void 0 : _carouselRef$current.animate(currentSwipeDirection === exports.ActionKind.Previous ? transformArray : transformArray.reverse(), {
        easing: 'ease-in',
        duration: TRANSITION_DURATION_MS
      }); // Automatically focus on new active carousel slide for a11y reasons.

      setTimeout(function () {
        var _document$getElementB;

        onAfterChange && onAfterChange(state.activeSlideIndex);
        (_document$getElementB = document.getElementById('arousel-item-active')) == null ? void 0 : _document$getElementB.focus();
      }, TRANSITION_DURATION_MS);
    }
  }, [state.activeSlideIndex, currentSwipeDirection, numItems]);

  var slide = function slide(slideDirection, useNoMotion) {
    setCurrentSwipeDirection(slideDirection);
    setNoMotion(useNoMotion || reduceMotion);
    dispatch({
      type: slideDirection,
      payload: {
        numItems: numItems
      }
    });
  };

  var getSectionProps = function getSectionProps() {
    return {
      ref: sectionRef,
      as: 'section',
      'aria-labelledby': 'carousel-heading',
      'aria-roledescription': 'carousel'
    };
  };

  var getHeadingProps = function getHeadingProps() {
    return {
      ref: headingRef,
      id: 'carousel-heading'
    };
  };

  var getCarouselWrapperProps = function getCarouselWrapperProps() {
    return {
      ref: carouselWrapperRef,
      style: {
        width: '100%',
        overflow: 'hidden'
      }
    };
  };

  var getCarouselProps = function getCarouselProps() {
    return {
      ref: carouselRef,
      'aria-label': 'Slides',
      style: {
        display: 'flex'
      }
    };
  };

  var getCarouselItemProps = function getCarouselItemProps(index) {
    return {
      ref: carouselItemRef,
      id: "carousel-item-" + index + (index === state.activeSlideIndex ? '-active' : ''),
      'aria-roledescription': 'slide',
      'aria-label': index + 1 + " of " + numItems,
      'aria-current': index === state.activeSlideIndex,
      // 'aria-hidden': index !== state.activeSlideIndex,
      style: {
        order: getOrder({
          index: index,
          activeSlideIndex: state.activeSlideIndex,
          numItems: numItems
        }),
        display: 'flex',
        flex: '1 0 100%',
        flexBasis: '100%',
        transition: // Only apply this transition when the current swipe direction is next
        // This ensures the re-ordering of items is smoother.
        currentSwipeDirection === (exports.ActionKind.Next || !(noMotion || reduceMotion)) ? "order " + (TRANSITION_DURATION_MS / 1000 + 0.1) + "s ease-in" : 'none'
      }
    };
  };

  var getButtonProps = function getButtonProps(direction) {
    return {
      ref: buttonRef,
      'aria-label': direction === exports.ActionKind.Previous ? 'Previous' : 'Next',
      onClick: function onClick(noMotion) {
        if (noMotion === void 0) {
          noMotion = false;
        }

        return slide(direction, noMotion);
      }
    };
  };

  var getAnnouncerProps = function getAnnouncerProps() {
    return {
      ref: announcerRef,
      'aria-live': 'polite',
      'aria-atomic': 'true',
      style: isAnnouncerVisible ? {} : {
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: '1px',
        overflow: 'hidden',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px'
      }
    };
  };

  return {
    // prop getters.
    getSectionProps: getSectionProps,
    getHeadingProps: getHeadingProps,
    getCarouselWrapperProps: getCarouselWrapperProps,
    getCarouselProps: getCarouselProps,
    getCarouselItemProps: getCarouselItemProps,
    getButtonProps: getButtonProps,
    getAnnouncerProps: getAnnouncerProps,
    // state.
    state: _extends({}, state, {
      currentSwipeDirection: currentSwipeDirection
    })
  };
};

exports.usePony = usePony;
//# sourceMappingURL=pony-props.cjs.development.js.map
