import { SIDENAV_WIDTH, SideNav } from './SideNav';
import styled from 'styled-components';

import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export const SafeArea: React.VFC<Props> = ({ children }) => {
  return (
    <Container>
      <SideNav />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.gray[50]};

  margin-left: ${SIDENAV_WIDTH};
  padding: 1rem 2rem;
`;
