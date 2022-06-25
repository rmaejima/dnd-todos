import { TagTip } from '../tags/TagTip';
import { TodoModalProvider } from './modal/TodoModalProvider';
import styled from 'styled-components';

import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaUndoAlt } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDebounce } from 'react-use';

import { AlertDialogProvider } from 'components/common/AlertDialogProvider';
import { Button } from 'components/common/Button';
import { IconButton } from 'components/common/IconButton';

import {
  archiveTodo,
  deleteTodo,
  finishTodo,
  undoTodo,
  updateTodo,
} from 'utils/apis/todo';
import { formatDateToString } from 'utils/date';
import { colors } from 'utils/theme';

import { Todo, TodoUpdateRequest } from 'types/todo';

const DEBOUNCE_TIME = 600; // ms

type CardType = 'NORMAL' | 'FINISHED' | 'ARCHIVED';

interface Props {
  todo: Todo;
  cardType?: CardType;
  onCompleteUpdate: () => void;
}

export const TodoCard: React.VFC<Props> = ({
  todo,
  cardType = 'NORMAL',
  onCompleteUpdate,
}) => {
  const [checked, setChecked] = useState(false);
  const [removed, setRemoved] = useState(false);

  useDebounce(
    async () => {
      if (checked === true) {
        await finishTodo(todo.id);
        onCompleteUpdate();
      }
    },
    DEBOUNCE_TIME,
    [checked],
  );

  const toggleCheck = () => {
    setChecked(!checked);
  };

  const onClickArchiveButton = async () => {
    setRemoved(true);
    await archiveTodo(todo.id);
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_TIME));
    onCompleteUpdate();
    toast.info(`「${todo.title}」をアーカイブしました`);
  };

  const onClickUndoButton = async () => {
    setRemoved(true);
    await undoTodo(todo.id);
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_TIME));
    onCompleteUpdate();
    toast.info(`「${todo.title}」をTODOにもどしました`);
  };

  const onClickDeleteButton = async () => {
    setRemoved(true);
    await deleteTodo(todo.id);
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_TIME));
    onCompleteUpdate();
    toast.info(`「${todo.title}」を完全に削除しました`);
  };

  const onSubmit = async (
    payload: TodoUpdateRequest,
    todoId: number | undefined,
  ) => {
    if (!todoId) {
      return;
    }
    await updateTodo(todoId, payload);
    onCompleteUpdate();
  };

  return (
    <Container $checked={checked} $cardType={cardType} $removed={removed}>
      <TopSectionContainer>
        <TitleSectionConrainer>
          {cardType === 'NORMAL' && (
            <CheckBox
              type="checkbox"
              checked={checked}
              onChange={toggleCheck}
            ></CheckBox>
          )}
          <Title>{todo.title}</Title>
        </TitleSectionConrainer>
        {cardType === 'NORMAL' ? (
          <div>
            <TodoModalProvider
              title="TODO編集"
              defaultValue={todo}
              onSubmit={onSubmit}
              generateSubmitButton={(
                isValid: boolean,
                onCancel: () => void,
              ) => (
                <>
                  <Button color={colors.error[500]} onClick={onCancel}>
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={!isValid}>
                    更新
                  </Button>
                </>
              )}
            >
              <IconButton size={48}>
                <FaEdit />
              </IconButton>
            </TodoModalProvider>
            <IconButton size={48} onClick={onClickArchiveButton}>
              <FaTrashAlt />
            </IconButton>
          </div>
        ) : cardType === 'ARCHIVED' ? (
          <div>
            <IconButton size={48} onClick={onClickUndoButton}>
              <FaUndoAlt />
            </IconButton>
            <AlertDialogProvider
              title="タスクを完全に削除します"
              message="一度削除されたタスクは元に戻すことができません。削除しますか？"
              generateActionButton={(onCancel: () => void) => (
                <>
                  <Button color={colors.gray[500]} onClick={onCancel}>
                    キャンセル
                  </Button>
                  <Button
                    color={colors.error[500]}
                    onClick={onClickDeleteButton}
                  >
                    削除
                  </Button>
                </>
              )}
            >
              <IconButton size={48}>
                <FaTrashAlt />
              </IconButton>
            </AlertDialogProvider>
          </div>
        ) : (
          cardType === 'FINISHED' && (
            <IconButton size={48} onClick={onClickUndoButton}>
              <FaUndoAlt />
            </IconButton>
          )
        )}
      </TopSectionContainer>
      <BottomSectionContainer>
        <TagSection>
          {todo.tags.map((tag) => (
            <TagTip key={tag.id} tag={tag} />
          ))}
        </TagSection>
        <PeriodSection>
          <FaHistory />
          <p>{formatDateToString(todo.updatedAt)}</p>
        </PeriodSection>
      </BottomSectionContainer>
    </Container>
  );
};

const Container = styled.div<{
  $checked: boolean;
  $cardType: CardType;
  $removed: boolean;
}>`
  width: 100%;
  background-color: ${(p) =>
    p.$cardType !== 'NORMAL'
      ? p.theme.colors.gray[100]
      : p.$checked
      ? p.theme.colors.primary[50]
      : '#fff'};
  border-radius: 6px;
  box-shadow: ${(p) => p.theme.shadows.md};
  transition: 0.5s ${(p) => p.theme.easings.easeOut};

  padding: 1rem;

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  /* 0.2s - 0.6s */
  animation: ${(p) =>
    (p.$checked || p.$removed) &&
    'fadeout 0.4s ease-in-out 0.2s 1 normal forwards;'};
`;

const TopSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const TitleSectionConrainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const Title = styled.h1`
  max-width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`;

const BottomSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const TagSection = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin: 0.25rem;
  }
`;

const PeriodSection = styled.div`
  display: flex;
  align-items: center;

  color: ${(p) => p.theme.colors.text.light};
  font-size: 14px;

  > p {
    margin-left: 0.25rem;
  }
`;
