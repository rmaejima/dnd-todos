import React from 'react';
import { FaTag } from 'react-icons/fa';

import { PageTitle } from 'components/common/PageTitle';
import { SafeArea } from 'components/common/SafeArea';
import { TagList } from 'components/tags/TagList';

export const Tags: React.VFC = () => {
  return (
    <SafeArea>
      <PageTitle>
        <FaTag />
        <h1>タグ</h1>
      </PageTitle>
      <TagList />
    </SafeArea>
  );
};
