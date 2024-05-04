import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './config/Router.tsx';
import {
  PaginatedUserListProvider,
} from './context/PaginatedUserListContext.tsx';
import { PaginatedHikeListProvider } from './context/PaginatedHikeListContext.tsx';

function App(): React.JSX.Element {
  return (
    <PaginatedUserListProvider>
      <PaginatedHikeListProvider>
        <RouterProvider router={router} />
      </PaginatedHikeListProvider>
    </PaginatedUserListProvider>
  );
}

export default App;
