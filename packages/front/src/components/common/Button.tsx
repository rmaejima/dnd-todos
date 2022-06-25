import styled from 'styled-components';

import React from 'react';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.VFC<Props> = ({
  onClick,
  color,
  type,
  disabled,
  children,
  className,
}) => {
  return (
    <StyleButton
      type={type || 'button'}
      disabled={disabled}
      onClick={onClick}
      className={className}
      $bgColor={color}
    >
      {children}
    </StyleButton>
  );
};

const StyleButton = styled.button<{ $bgColor?: string }>`
  background-color: ${(p) => p.$bgColor ?? p.theme.colors.primary[500]};
  border-radius: 6px;

  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: bold;
  transition: 0.1s ${(p) => p.theme.easings.easeOut};

  &:hover {
    opacity: 0.8;
    box-shadow: ${(p) => p.theme.shadows.md};
  }

  &[disabled] {
    background-color: ${(p) => p.theme.colors.gray[500]};
    opacity: 0.5;
    cursor: default;
  }
`;
