import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './store-feature-game-detail.module.scss';

import { formatRating } from 'store/utils-formatters';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

export const StoreFeatureGameDetail = () => {
  const { id } = useParams<{id: string}>();
  const [state, setState] = useState<{
    data: any,
    loadingState: 'success' | 'error' | 'loading'
  }>({
    data: {},
    loadingState: 'success'
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading'
    })
    const gameId = id;
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success'
        })
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error'
        })
      });
  }, [id]);

  return (
    <div className="container">
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error fetching data</div>
      ) : state.data == null ? (
        ''
      ) : (
        <Card>
          <CardActionArea>
            <CardMedia
              className={styles.gameCardMedia}
              image={state.data.image}
              title={state.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data.name}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                className='game-rating'
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )} 
    </div>
  );
};

export default StoreFeatureGameDetail;
