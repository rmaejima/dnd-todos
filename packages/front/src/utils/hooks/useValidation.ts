import { useCallback, useEffect, useState } from 'react';

export type ValidateRule<T> = (value: T) => boolean | string;

interface ReturnValue {
  isValid: boolean;
  errorMessage?: string;
  validate: () => void;
}

const VALID = false;

const checkRules = <T>(value: T, rules: ValidateRule<T>[]): false | string => {
  for (const rule of rules) {
    const res = rule(value);
    if (res !== true) {
      return res;
    }
  }
  return VALID;
};

export const useValidation = <T>(
  value: T,
  rules: ValidateRule<T>[],
): ReturnValue => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const validate = useCallback(() => {
    const res = checkRules(value, rules);
    setIsValid(!res);
    setErrorMessage(res === VALID ? undefined : res);
  }, [rules, value]);

  useEffect(() => {
    validate();
  }, [validate]);

  return { isValid, errorMessage, validate };
};

/**
 * Rules
 **/
export const stringNotEmpty: <T extends string>() => ValidateRule<T> =
  () => (val) =>
    !!val || '入力してください';
