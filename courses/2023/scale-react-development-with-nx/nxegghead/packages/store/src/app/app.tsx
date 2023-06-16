// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';

import { getAllGames } from '../fake-api';

import { Header } from 'store/ui-shared';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import { formatRating } from 'store/utils-formatters';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { StoreFeatureGameDetail } from 'store/feature-game-detail';

export function App() {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    data: any[],
    loadingState: 'success' | 'error' | 'loading'
  }>({
    data: [],
    loadingState: 'success'
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading'
    });
    fetch('/api/games')
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
      })
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.gamesLayout}>
          {state.loadingState === 'loading' ? 'Loading...' : state.loadingState === 'error' ? '<div>Error retrieving data</div>' : ( state.data.map((x) => (
            <Card key={x.id} className={styles.gameCard}
              onClick={() => navigate(`/game/${x.id}`)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.gameCardMedia}
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={styles.gameRating}
                  >
                    <strong>Rating:</strong> {formatRating(x.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )))}
        </div>
      </div>

      <Routes>
        <Route
            path="/game/:id"
            element={<StoreFeatureGameDetail />}
          />
      </Routes>
    </>
  );
}

export default App;
