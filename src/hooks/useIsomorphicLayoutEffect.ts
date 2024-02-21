import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
} from 'react';

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * This hook allows you for scheduling a layout effect with a fallback to a regular effect
 * for environments where layout effects should not be used (such as server-side rendering)
 * @param callback Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change
 */
export function useIsomorphicLayoutEffect(
  callback: EffectCallback,
  deps: DependencyList
) {
  if (canUseDOM) return useLayoutEffect(callback, deps);
  return useEffect(callback, deps);
}
