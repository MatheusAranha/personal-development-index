// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { getAllGames } from '../fake-api';

import { Header } from 'store/ui-shared';

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.gamesLayout} >
          {getAllGames().map((x) => (
            <Card key={x.id} className={styles.gameCard}>
              <CardActionArea>
                <CardMedia
                  className={styles.gameCardMedia}
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {x.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {x.description}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component="p" className={styles.gameRating}>
                    <strong>Rating:</strong> {x.rating}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
