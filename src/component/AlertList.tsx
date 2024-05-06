import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../client/client.ts';
import Navbar from './Navbar.tsx';
import { useAlertListContext } from '../context/AlertListContext.tsx';
import { Alert } from '../type/alert.ts';
import AlertCard from './AlertCard.tsx';

function AlertList(): React.JSX.Element {
  const { alertList, setAlertList } = useAlertListContext();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
    setIsLoading(true);
    client.getAlerts().then((data: Alert[]) => {
      setAlertList(data);
      setIsLoading(false);
    });
  }, [navigate]);

  if (isLoading) {
    return (
      <p>
        loading
      </p>
    );
  }

  return (
    <>
      <Navbar />
      {alertList.length ? (
        <div
          style={{
            overflowX: 'auto',
            width: '100%',
            height: '70vh',
            margin: '0.5rem',
          }}
        >
          {alertList.map((alert) => (
            <AlertCard key={alert._id} currentAlert={alert} />
          ))}
        </div>
      ) : (
        <div>
          <p>Aucune données trouvés</p>
        </div>
      )}
    </>
  );
}

export default AlertList;
