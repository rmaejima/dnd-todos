import styled from 'styled-components';

import React from 'react';

import { validateColorCode } from 'utils/color';

import { TagSummary } from 'types/tag';

interface Props {
  tag: TagSummary;
  onClick?: () => void;
}

export const TagTip: React.VFC<Props> = ({ tag, onClick }) => {
  return (
    <Container onClick={onClick} $bgColor={validateColorCode(tag.color)}>
      <Text>{tag.title}</Text>
    </Container>
  );
};

const Container = styled.div<{ $bgColor: string }>`
  display: inline-block;
  background-color: ${(p) => p.$bgColor};
  border-radius: 0.75rem;
  padding: 0.25rem 1rem;

  text-align: center;
`;

const Text = styled.p`
  max-width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
`;
