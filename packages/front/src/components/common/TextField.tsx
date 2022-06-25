import styled from 'styled-components';

import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import { ValidateRule, useValidation } from 'utils/hooks/useValidation';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  autoFocus?: boolean;
  className?: string;
  rules?: ValidateRule<string>[];
}

export const TextField: React.VFC<Props> = ({
  value,
  onChange,
  placeholder,
  id,
  autoFocus,
  className,
  rules = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [didBlur, setDidBlur] = useState(false);
  const { errorMessage, validate } = useValidation(value, rules);
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const showErrorMessage = didBlur && errorMessage?.length !== 0;

  return (
    <Container className={className}>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          setDidBlur(true);
          validate();
        }}
        ref={inputRef}
      />
      {placeholder != null && !isFocused && !value && (
        <Placeholder>{placeholder}</Placeholder>
      )}
      {showErrorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: block;

  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.gray[100]};

  color: ${(p) => p.theme.colors.text.base};
  transition: 0.1s ${(p) => p.theme.easings.easeOut};

  &:focus {
    background: #fff;
    border-color: ${(p) => p.theme.colors.primary[500]};
  }
`;

const Placeholder = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 0.75rem;
  pointer-events: none;

  color: ${(p) => p.theme.colors.text.light};
`;

const ErrorMessage = styled.p`
  max-width: 100%;
  background: #fff;

  margin-top: 0.25rem;
  padding-left: 0.75rem;
  color: ${(p) => p.theme.colors.error[600]};
  font-size: 0.75rem;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;
