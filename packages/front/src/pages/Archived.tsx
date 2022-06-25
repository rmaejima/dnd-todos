import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { PageTitle } from 'components/common/PageTitle';
import { SafeArea } from 'components/common/SafeArea';
import { ArchivedTodoList } from 'components/todos/archived/ArchivedTodoList';

export const Archived: React.VFC = () => {
  return (
    <SafeArea>
      <PageTitle>
        <FaRegCalendarAlt />
        <h1>ゴミ箱</h1>
      </PageTitle>
      <ArchivedTodoList />
    </SafeArea>
  );
};
