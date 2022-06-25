import styled from 'styled-components';

import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SIDENAV_WIDTH = '25rem';

export const SideNav: React.VFC = () => {
  return (
    <Container>
      <Title>Dnd Todos</Title>
      <LinkArea>
        <li>
          <StyledLink to="/">
            <LinkBar>
              <FaRegCalendarAlt />
              <p>TODO</p>
            </LinkBar>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/tags">
            <LinkBar>
              <FaTag />
              <p>タグ</p>
            </LinkBar>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/finished">
            <LinkBar>
              <FaRegCalendarCheck />
              <p>履歴</p>
            </LinkBar>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/archived">
            <LinkBar>
              <FaRegTrashAlt />
              <p>ゴミ箱</p>
            </LinkBar>
          </StyledLink>
        </li>
      </LinkArea>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: ${SIDENAV_WIDTH};
  height: 100%;
  box-shadow: ${(p) => p.theme.shadows.lg};

  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
`;

const LinkArea = styled.ul`
  > li {
    list-style: none;
  }

  > li:not(:first-child) {
    margin-top: 1rem;
  }
`;

const LinkBar = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 1rem 2rem;

  color: ${(p) => p.theme.colors.text.light};
  font-size: 1.25rem;
  font-weight: bold;

  transition: 0.3s ${(p) => p.theme.easings.easeOut};
  cursor: pointer;

  > p {
    margin-left: 1rem;
  }

  &:hover {
    opacity: 0.7;
    box-shadow: ${(p) => p.theme.shadows.md};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
