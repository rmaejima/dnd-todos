import styled from 'styled-components';

import React from 'react';
import { useModal } from 'react-hooks-use-modal';

interface Props {
  title: string;
  message: string;
  generateActionButton: (onCancel: () => void) => React.ReactNode;
  children: React.ReactNode;
}

export const AlertDialogProvider: React.VFC<Props> = ({
  title,
  message,
  generateActionButton,
  children,
}) => {
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  return (
    <>
      <OpenBox onClick={open}>{children}</OpenBox>
      <Modal>
        <ModalContainer>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ActionSectionContainer>
            {generateActionButton(close)}
          </ActionSectionContainer>
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

const ModalMessage = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const ActionSectionContainer = styled.div`
  display: flex;
  justify-content: end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
