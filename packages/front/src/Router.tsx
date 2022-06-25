import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Archived } from 'pages/Archived';
import { Finished } from 'pages/Finished';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import { Tags } from 'pages/Tags';

export const Router: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/finished" element={<Finished />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
