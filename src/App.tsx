import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './config/Router.tsx';
import {
  PaginatedUserListProvider,
} from './context/PaginatedUserListContext.tsx';

function App(): React.JSX.Element {
  return (
    <PaginatedUserListProvider>
      <RouterProvider router={router} />
    </PaginatedUserListProvider>
  );
}

export default App;
