import { AssertionError } from "assert";

export const assert = <T>(value: T, errorMessage: string): NonNullable<T> => {
  if (value) return value as NonNullable<T>;
  throw new AssertionError({ message: errorMessage });
};
