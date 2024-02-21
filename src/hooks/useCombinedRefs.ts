import {
  type Ref,
  type MutableRefObject,
  type RefCallback,
  useRef,
  useEffect,
} from "react";

import { setRef } from "./utils";

/**
 * A hook you can use when you want to combine multiple refs into one.
 * @param refs An array of refs
 * @returns a mutable ref object
 */
export const useCombinedRefs = <T>(
  ...refs: Array<Ref<T> | RefCallback<T> | undefined>
): MutableRefObject<T | undefined> => {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      setRef(ref, targetRef.current!);
    });
  }, [refs]);

  return targetRef;
};
