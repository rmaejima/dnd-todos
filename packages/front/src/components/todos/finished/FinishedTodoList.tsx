import { TodoCard } from '../TodoCard';
import styled from 'styled-components';

import React from 'react';

import { useAllTodos } from 'utils/apis/todo';

export const FinishedTodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos({
    finished: true,
  });
  return (
    <>
      {error && 'エラーが発生しました'}
      {isLoading && '読み込み中です'}

      <CardListContainer>
        {todos && todos.length !== 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <TodoCard
                todo={todo}
                cardType="FINISHED"
                onCompleteUpdate={refetchAllTodos}
              />
            </li>
          ))
        ) : (
          <EmptyMessage>完了したタスクがありません</EmptyMessage>
        )}
      </CardListContainer>
    </>
  );
};

const CardListContainer = styled.ul`
  list-style: none;
  > li:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const EmptyMessage = styled.p`
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`;
