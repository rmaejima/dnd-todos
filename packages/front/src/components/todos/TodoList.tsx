import { TodoModalProvider } from './modal/TodoModalProvider';
import styled from 'styled-components';

import React, { useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';
import { useDebounce } from 'react-use';

import { Button } from 'components/common/Button';
import { IconButton } from 'components/common/IconButton';
import { TodoCard } from 'components/todos/TodoCard';

import { changeTodoOrder, createTodo, useAllTodos } from 'utils/apis/todo';
import { colors } from 'utils/theme';

import { Todo, TodoChangeOrderRequest, TodoCreateRequest } from 'types/todo';

const DEBOUNCE_TIME = 300; // ms

export const TodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos();
  const [draggableItems, setDraggableItems] = useState<Todo[]>();
  const orderList = useMemo(() => {
    return todos?.map((todo) => todo.order);
  }, [todos]);

  useEffect(() => {
    if (todos) {
      setDraggableItems(todos);
    }
  }, [todos]);

  useDebounce(
    async () => {
      if (draggableItems == undefined) {
        return;
      }
      const payload: TodoChangeOrderRequest = {
        todos: draggableItems.map((item) => {
          return {
            id: item.id,
            order: item.order,
          };
        }),
      };
      await changeTodoOrder(payload);
    },
    DEBOUNCE_TIME,
    [draggableItems],
  );

  const handleOnDragEnd = (result: DropResult) => {
    if (!(draggableItems && result.destination && orderList)) {
      return;
    }
    // 入れ替わった順番に更新する
    const items = Array.from(draggableItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.map((item, index) => {
      item.order = orderList[index];
    });
    setDraggableItems(items);
  };

  const onSubmit = async (payload: TodoCreateRequest) => {
    await createTodo(payload);
    refetchAllTodos();
  };

  return (
    <>
      {error && 'エラーが発生しました'}
      {isLoading && '読み込み中です'}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        {draggableItems && draggableItems.length !== 0 ? (
          <Droppable key="droppable" droppableId="droppable">
            {(provided) => (
              <CardListContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppableArea"
              >
                {draggableItems.map((todo, index) => (
                  <Draggable
                    index={index}
                    key={todo.id}
                    draggableId={todo.id.toString()}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <TodoCard
                          todo={todo}
                          onCompleteUpdate={refetchAllTodos}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CardListContainer>
            )}
          </Droppable>
        ) : (
          <EmptyMessage>タスクがありません</EmptyMessage>
        )}
      </DragDropContext>

      <TodoModalProvider
        title="新しいTODO"
        onSubmit={onSubmit}
        generateSubmitButton={(isValid: boolean, onCancel: () => void) => (
          <>
            <Button color={colors.error[500]} onClick={onCancel}>
              キャンセル
            </Button>
            <Button type="submit" disabled={!isValid}>
              作成
            </Button>
          </>
        )}
      >
        <FloatingActionContaner>
          <IconButton color="#fff" bgColor={colors.primary[500]}>
            <FaPlus />
          </IconButton>
        </FloatingActionContaner>
      </TodoModalProvider>
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

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;
