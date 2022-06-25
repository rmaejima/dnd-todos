import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';

import { TextField } from 'components/common/TextField';
import { TagTip } from 'components/tags/TagTip';

import { useAllTags } from 'utils/apis/tag';
import { stringNotEmpty } from 'utils/hooks/useValidation';

import { TagSummary } from 'types/tag';
import { Todo, TodoCreateRequest, TodoUpdateRequest } from 'types/todo';

interface Props {
  title: string;
  onSubmit: (
    payload: TodoCreateRequest | TodoUpdateRequest,
    todoId?: number,
  ) => void;
  defaultValue?: Todo;
  generateSubmitButton: (
    isValid: boolean,
    onCancel: () => void,
  ) => React.ReactNode;
  children: React.ReactNode;
}

export const TodoModalProvider: React.VFC<Props> = ({
  title,
  onSubmit,
  defaultValue,
  generateSubmitButton,
  children,
}) => {
  const { tags, isLoading, error, refetchAllTags } = useAllTags();
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [titleValue, setTitleValue] = useState<string>(
    defaultValue ? defaultValue.title : '',
  );
  const [tagSelection, setTagSelection] = useState<TagSummary[]>([]);
  const [tagValue, setTagValue] = useState<TagSummary[]>(
    defaultValue ? defaultValue.tags : [],
  );

  useEffect(() => {
    if (!tags) {
      return;
    }
    const usedTagIds = tagValue.map((tag) => tag.id);
    setTagSelection(tags.filter((tag) => !usedTagIds.includes(tag.id)));
  }, [tags]);

  const onClickTagSelectionTip = (tag: TagSummary) => {
    setTagValue([...tagValue, tag]);
    setTagSelection(
      tagSelection.filter((selection) => selection.id !== tag.id),
    );
  };

  const onClickTagValueTip = (tag: TagSummary) => {
    setTagSelection([tag, ...tagSelection]);
    setTagValue(tagValue.filter((t) => t.id !== tag.id));
  };

  const resetStates = () => {
    if (defaultValue) {
      return;
    }
    setTitleValue('');
    refetchAllTags();
    if (tags) {
      setTagSelection(tags);
    }
    setTagValue([]);
  };

  const onSubmitClick = () => {
    close();
    const payload = {
      title: titleValue,
      tags: tagValue.map((tag) => {
        return {
          id: tag.id,
        };
      }),
    };
    onSubmit(payload, defaultValue?.id);
    resetStates();
  };

  return (
    <>
      <OpenBox onClick={open}>{children}</OpenBox>
      <Modal>
        <ModalContainer>
          <ModalTitle>{title}</ModalTitle>
          <form onSubmit={onSubmitClick}>
            <Label>タイトル</Label>
            <StyledTextField
              value={titleValue}
              placeholder="Reactの勉強"
              onChange={setTitleValue}
              rules={[stringNotEmpty()]}
            />
            <Label>選択タグ</Label>
            {error && <p>エラーが発生しました</p>}
            {isLoading && <p>読み込み中です</p>}
            <TipListContainer>
              {tagValue &&
                tagValue.map((tag) => (
                  <TagTip
                    key={tag.id}
                    tag={tag}
                    onClick={() => onClickTagValueTip(tag)}
                  />
                ))}
            </TipListContainer>
            <Label>タグリスト</Label>
            {error && <p>エラーが発生しました</p>}
            {isLoading && <p>読み込み中です</p>}
            <TipListContainer>
              {tagSelection &&
                tagSelection.map((tag) => (
                  <TagTip
                    key={tag.id}
                    tag={tag}
                    onClick={() => onClickTagSelectionTip(tag)}
                  />
                ))}
            </TipListContainer>
            <ActionSectionContainer>
              {generateSubmitButton(titleValue.length !== 0, close)}
            </ActionSectionContainer>
          </form>
        </ModalContainer>
      </Modal>
    </>
  );
};

const OpenBox = styled.div`
  display: inline-block;
`;

const ModalContainer = styled.div`
  width: 35rem;
  background-color: #fff;
  border-radius: 1rem;

  padding: 1.5rem;
`;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;

  color: ${(p) => p.theme.colors.text.base};
  font-size: 0.75rem;
  font-weight: bold;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const TipListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;

  > div {
    margin: 0.25rem;
  }
`;

const ActionSectionContainer = styled.div`
  display: flex;
  justify-content: end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
