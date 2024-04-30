import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from '../type/user.ts';
import { PaginatedList } from '../type/paginatedList.ts';

interface UserContextProps {
  paginatedUserList: PaginatedList<User> | undefined;
  setPaginatedUserList: Dispatch<SetStateAction<PaginatedList<User> | undefined>>;
  logout: () => void;
}

const PaginatedUserListContext = createContext<UserContextProps | undefined>(undefined);

function PaginatedUserListProvider({ children }: { children: React.ReactNode }) {
  const [paginatedUserList, setPaginatedUserList] = useState<PaginatedList<User>| undefined>(undefined);

  const logout = () => {
    setPaginatedUserList([]);
    localStorage.removeItem('access_token');
  };

  return (
    <PaginatedUserListContext.Provider
      value={{
        paginatedUserList,
        setPaginatedUserList,
        logout,
      }}
    >
      {children}
    </PaginatedUserListContext.Provider>
  );
}

const usePaginatedUserListContext = () => {
  const context = useContext(PaginatedUserListContext);
  if (!context) {
    throw new Error(
      "useUserContext doit être utilisé à l'intérieur de UserProvider",
    );
  }
  return context;
};

export { PaginatedUserListContext, usePaginatedUserListContext, PaginatedUserListProvider };
