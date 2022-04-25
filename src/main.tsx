import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Portal from './portal';
import Console from './console';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/console" element={<Console />} />
        <Route path="/" element={<Portal />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
