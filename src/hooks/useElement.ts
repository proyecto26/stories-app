import { MutableRefObject, RefObject, useEffect, useMemo } from "react";

import { useCombinedRefs } from "./useCombinedRefs";

export type ElementProps<T> = {
  ref?: MutableRefObject<T> | RefObject<T>;
  el?: T;
};

/**
 * A hook for getting the HTML element using refs or React state
 * @param props target a React ref created by `useRef()` or an HTML element
 * @returns the element
 */
export const useElement = <T extends HTMLElement>(props: ElementProps<T>) => {
  // get the Element using refs
  const ref = useCombinedRefs<T>(props.ref);
  // or get the element using React state
  const el = useMemo(() => props?.el || ref?.current, [ref, props.el]);

  // Update the ref when the element changes (When getting the element using React state)
  useEffect(() => {
    if (props?.el && ref) {
      ref.current = props?.el;
    }
  }, [ref, props?.el]);

  return {
    el,
    ref,
  };
};
