import React from 'react';
import {
  Box, Button, Card, Collapse, Typography,
} from '@mui/material';
import client from '../client/client.ts';
import { useAlertListContext } from '../context/PaginatedAlertListContext.tsx';
import { Alert } from '../type/alert.ts';

interface AlertCardProps {
  currentAlert: Alert;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: 'auto',
  width: 600,
  marginBottom: 1,
  border: '1px solid black',
};

function AlertCard({ currentAlert }: AlertCardProps): React.JSX.Element {
  const { alertList, setAlertList } = useAlertListContext();
  const [alertExpanded, setAlertExpanded] = React.useState(false);

  const handleExpandAlertClick = () => {
    setAlertExpanded(!alertExpanded);
  };

  const handleDeleteAlertClick = () => {
    client.deleteAlert(currentAlert._id).then((response) => {
      if (response?.ok) {
        setAlertList(alertList.filter(
          (alert: Alert) => currentAlert._id !== alert._id,
        ));
      }
    });
  };

  return (
    <Box sx={style}>
      <Card onClick={handleExpandAlertClick}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', flex: 1, margin: '1rem',
        }}
        >
          <Typography>
            {currentAlert.description}
          </Typography>
        </div>

        <Collapse in={alertExpanded} timeout="auto" unmountOnExit>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            textAlign: 'start',
            marginLeft: '0.5rem',
          }}
          >
            <div style={{ marginTop: '0.5rem' }}>
              <img src={currentAlert.photo} alt="alert photo" />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="warning" onClick={handleDeleteAlertClick}>Supprimer</Button>
          </div>
        </Collapse>
      </Card>
    </Box>
  );
}

export default AlertCard;
