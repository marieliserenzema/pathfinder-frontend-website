import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { PaginatedList } from '../type/paginatedList.ts';
import { Hike } from '../type/hike.ts';

interface UserContextProps {
  paginatedHikeList: PaginatedList<Hike> | undefined;
  setPaginatedHikeList: Dispatch<SetStateAction<PaginatedList<Hike> | undefined>>;
  logout: () => void;
}

const PaginatedHikeListContext = createContext<UserContextProps | undefined>(undefined);

function PaginatedHikeListProvider({ children }: { children: React.ReactNode }) {
  const [paginatedHikeList, setPaginatedHikeList] = useState<PaginatedList<Hike>| undefined>(undefined);

  const logout = () => {
    setPaginatedHikeList([]);
    localStorage.removeItem('access_token');
  };

  return (
    <PaginatedHikeListContext.Provider
      value={{
        paginatedHikeList,
        setPaginatedHikeList,
        logout,
      }}
    >
      {children}
    </PaginatedHikeListContext.Provider>
  );
}

const usePaginatedHikeListContext = () => {
  const context = useContext(PaginatedHikeListContext);
  if (!context) {
    throw new Error(
      "useUserContext doit être utilisé à l'intérieur de UserProvider",
    );
  }
  return context;
};

export { PaginatedHikeListContext, usePaginatedHikeListContext, PaginatedHikeListProvider };
