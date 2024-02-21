import { type MutableRefObject } from 'react';

export const setRef = <T>(
  ref:
    | MutableRefObject<T | null>
    | ((instance: T | null) => void),
  value: T | null
) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};
