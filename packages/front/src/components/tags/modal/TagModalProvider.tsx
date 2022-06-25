import styled from 'styled-components';

import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { useModal } from 'react-hooks-use-modal';

import { TextField } from 'components/common/TextField';

import { stringNotEmpty } from 'utils/hooks/useValidation';
import { colors } from 'utils/theme';

import { Tag, TagCreateRequest, TagUpdateRequest } from 'types/tag';

interface Props {
  title: string;
  onSubmit: (
    payload: TagCreateRequest | TagUpdateRequest,
    tagId?: number,
  ) => void;
  defaultValue?: Tag;
  generateSubmitButton: (
    isValid: boolean,
    onCancel: () => void,
  ) => React.ReactNode;
  children: React.ReactNode;
}

export const TagModalProvider: React.VFC<Props> = ({
  title,
  onSubmit,
  defaultValue,
  generateSubmitButton,
  children,
}) => {
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [color, setColor] = useColor(
    'hex',
    defaultValue ? defaultValue.color : colors.primary[500],
  );
  const [titleValue, setTitleValue] = useState<string>(
    defaultValue ? defaultValue.title : '',
  );

  const resetStates = () => {
    if (!defaultValue) setTitleValue('');
  };

  const onClickSubmit = () => {
    close();
    const payload = {
      title: titleValue,
      color: color.hex,
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
          <form onSubmit={onClickSubmit}>
            <Label>タイトル</Label>
            <StyledTextField
              value={titleValue}
              placeholder="タスク"
              onChange={setTitleValue}
              rules={[stringNotEmpty()]}
            />
            <Label>カラー</Label>
            <PaletteContainer>
              <ColorPicker
                width={456}
                height={228}
                color={color}
                onChange={setColor}
                hideHSV
                dark
              />
            </PaletteContainer>
            <Label>プレビュー</Label>
            {titleValue.length !== 0 ? (
              <Preview $bgColor={color.hex}>{titleValue}</Preview>
            ) : (
              <Label style={{ fontWeight: 'normal' }}>
                タイトルを入力してください
              </Label>
            )}
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

const PaletteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Preview = styled.div<{ $bgColor: string }>`
  display: inline-block;
  background-color: ${(p) => p.$bgColor};
  border-radius: 0.75rem;

  margin-bottom: 1rem;
  padding: 0.25rem 1rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
`;

const ActionSectionContainer = styled.div`
  display: flex;
  justify-content: end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
