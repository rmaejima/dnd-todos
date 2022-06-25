import { TagCard } from './TagCard';
import { TagModalProvider } from './modal/TagModalProvider';
import styled from 'styled-components';

import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from 'components/common/Button';
import { IconButton } from 'components/common/IconButton';

import { createTag, deleteTag, updateTag, useAllTags } from 'utils/apis/tag';
import { colors } from 'utils/theme';

import { TagCreateRequest, TagSummary, TagUpdateRequest } from 'types/tag';

export const TagList: React.VFC = () => {
  const { tags, isLoading, error, refetchAllTags } = useAllTags();

  const onCreationSubmit = async (payload: TagCreateRequest) => {
    await createTag(payload);
    refetchAllTags();
  };

  const onUpdationSubmit = async (
    payload: TagUpdateRequest,
    tagId: number | undefined,
  ) => {
    if (!tagId) {
      return;
    }
    await updateTag(tagId, payload);
    refetchAllTags();
  };

  const onClickDeleteButton = async (tag: TagSummary) => {
    await deleteTag(tag.id);
    toast.info(`「${tag.title}」タグを削除しました`);
    refetchAllTags();
  };

  return (
    <>
      {error && <p>エラーが発生しました</p>}
      {isLoading && <p>読み込み中です</p>}

      {tags && (
        <Container>
          {tags.map((tag) => (
            <TagModalProvider
              key={tag.id}
              title="タグ編集"
              defaultValue={tag}
              onSubmit={onUpdationSubmit}
              generateSubmitButton={(
                isValid: boolean,
                onCancel: () => void,
              ) => (
                <>
                  <StyledButton
                    color={colors.error[500]}
                    onClick={() => onClickDeleteButton(tag)}
                  >
                    タグを削除
                  </StyledButton>
                  <Button color={colors.gray[500]} onClick={onCancel}>
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={!isValid}>
                    更新
                  </Button>
                </>
              )}
            >
              <TagCard tag={tag} />
            </TagModalProvider>
          ))}
        </Container>
      )}

      <TagModalProvider
        title="新しいタグ"
        onSubmit={onCreationSubmit}
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
      </TagModalProvider>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;

const StyledButton = styled(Button)`
  margin-right: auto;
`;
