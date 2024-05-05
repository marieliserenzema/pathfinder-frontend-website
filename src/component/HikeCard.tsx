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
  justifyContent: 'center',
  overflowY: 'auto',
  width: 600,
  marginBottom: 1,
  border: '1px solid black',
};

function HikeCard({ currentHike }: HikeCardProps): React.JSX.Element {
  const { paginatedHikeList, setPaginatedHikeList } = usePaginatedHikeListContext();
  const [hikeExpanded, setHikeExpanded] = React.useState(false);

  const handleExpandHikeClick = () => {
    setHikeExpanded(!hikeExpanded);
  };

  const handleDeleteHikeClick = () => {
    client.deleteHike(currentHike._id).then((response) => {
      if (response?.ok && paginatedHikeList?.items) {
        setPaginatedHikeList((prevState) => ({
          ...prevState,
          items: paginatedHikeList.items.filter(
            (hike: Hike) => currentHike._id !== hike._id,
          ),
        }));
      }
    });
  };

  return (
    <Box sx={style}>
      <Card onClick={handleExpandHikeClick}>
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
            <Button color="warning" onClick={handleDeleteHikeClick}>Supprimer</Button>
          </div>
        </Collapse>
      </Card>
    </Box>
  );
}

export default HikeCard;
