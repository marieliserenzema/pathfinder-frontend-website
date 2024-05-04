import React from 'react';
import {
  Box, Button, Card, Collapse, Typography,
} from '@mui/material';
import client from '../client/client.ts';
import { Hike } from '../type/hike.ts';
import { usePaginatedHikeListContext } from '../context/PaginatedHikeListContext.tsx';

interface HikeCardProps {
  currentHike: Hike;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Centrer verticalement
  overflowY: 'auto',
  width: 600,
  marginBottom: 1,
  border: '1px solid black',
};

function HikeCard({ currentHike }: HikeCardProps): React.JSX.Element {
  const { paginatedHikeList, setPaginatedHikeList } = usePaginatedHikeListContext();
  const [hikeExpanded, setHikeExpanded] = React.useState(false);

  const handleExpandUserClick = () => {
    setHikeExpanded(!hikeExpanded);
  };

  const handleDeleteUserClick = () => {
    client.deleteHike(currentHike._id).then((response) => {
      if (response?.ok && paginatedHikeList) {
        paginatedHikeList.items = paginatedHikeList.items.filter(
          (hike: Hike) => currentHike._id !== hike._id,
        );
        setPaginatedHikeList(paginatedHikeList);
      }
    });
  };

  return (
    <Box sx={style}>
      <Card onClick={handleExpandUserClick}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', flex: 1, margin: '1rem',
        }}
        >
          <Typography>
            {currentHike.properties.name}
          </Typography>
        </div>

        <Collapse in={hikeExpanded} timeout="auto" unmountOnExit>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            textAlign: 'start',
            marginLeft: '0.5rem',
          }}
          >
            <div>
              {currentHike.properties.description}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              {'De '}
              {currentHike.properties.from}
              {' à '}
              {currentHike.properties.to}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              {'Distance: '}
              {currentHike.properties.distance}
              km
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="warning" onClick={handleDeleteUserClick}>Supprimer</Button>
          </div>
        </Collapse>
      </Card>
    </Box>
  );
}

export default HikeCard;
