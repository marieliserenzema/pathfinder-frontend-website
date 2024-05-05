import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Alert } from '../type/alert.ts';

interface AlertContextProps {
  alertList: Alert[];
  setAlertList: Dispatch<SetStateAction<Alert[]>>;
  logout: () => void;
}

const AlertListContext = createContext<AlertContextProps | undefined>(undefined);

function AlertListProvider({ children }: { children: React.ReactNode }) {
  const [alertList, setAlertList] = useState<Alert[]>([]);

  const logout = () => {
    setAlertList([]);
    localStorage.removeItem('access_token');
  };

  return (
    <AlertListContext.Provider
      value={{
        alertList,
        setAlertList,
        logout,
      }}
    >
      {children}
    </AlertListContext.Provider>
  );
}

const useAlertListContext = () => {
  const context = useContext(AlertListContext);
  if (!context) {
    throw new Error(
      "useUserContext doit être utilisé à l'intérieur de UserProvider",
    );
  }
  return context;
};

export { AlertListContext, useAlertListContext, AlertListProvider };
