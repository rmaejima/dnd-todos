import styled from 'styled-components';

import React from 'react';

interface Props {
  onClick?: () => void;
  className?: string;
  size?: number; //px
  color?: string;
  bgColor?: string;
  children: React.ReactNode;
}
export const IconButton: React.VFC<Props> = ({
  className,
  onClick,
  size,
  color,
  bgColor,
  children,
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      $size={size}
      $color={color}
      $bgColor={bgColor}
    >
      {children}
    </Button>
  );
};

const Button = styled.button<{
  $size?: number;
  $color?: string;
  $bgColor?: string;
}>`
  width: ${(p) => (p.$size ? `${p.$size}px` : '4rem')};
  height: ${(p) => (p.$size ? `${p.$size}px` : '4rem')};
  background-color: ${(p) => p.$bgColor};
  border-radius: 50%;

  color: ${(p) => p.$color ?? p.theme.colors.text.light};
  font-size: ${(p) => (p.$size ? `${p.$size / 2.5}px` : '1.5rem')};
  transition: 0.1s ${(p) => p.theme.easings.easeOut};

  &:hover {
    opacity: 0.8;
  }
`;
