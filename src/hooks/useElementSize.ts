import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useResizeObserver from "@react-hook/resize-observer";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useElement } from "./useElement";

export type ElementSizeProps<T> = {
  ref?: MutableRefObject<T> | RefObject<T>;
  el?: T;
};

/**
 * A hook for measuring the size of HTML elements including when they change
 * @param props target a React ref created by `useRef()` or an HTML element
 * @returns the size of the HTML element
 */
export const useElementSize = <T extends HTMLElement>(
  props: ElementSizeProps<T>
) => {
  // Remember our element using memoization
  const { el, ref } = useElement(props)

  // The size of the element
  const [size, setSize] = useState<DOMRect>(() => el?.getBoundingClientRect() || new DOMRect());

  // Calculate the size of the element
  const resize = useCallback(() => {
    if (!el) return;
    const size = el.getBoundingClientRect();
    setSize(size);
    return size;
  }, [el]);

  // Resize the element when the element is mounted
  useIsomorphicLayoutEffect(() => {
    resize();
    requestAnimationFrame(resize);
  }, [el]);

  // Resize the element when the window is resized (Optional)
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  // Use ResizeObserver to resize the element when it changes (Parent element changes size, etc.)
  useResizeObserver(el!, (entry) => setSize(entry.contentRect));

  return { size, ref, el, resize };
};
