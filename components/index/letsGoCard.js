import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Grid } from '@mui/material';

export default function LetsGoCard(props) {
  return (
    <Card>
      <Typography gutterBottom variant="h6" color="primary.main" sx={{ mt: 1 }}>
        WELCOME TO CLASHMANIA!
      </Typography>
      <Grid container>
        <Grid item container xs={6} style={{transform: 'scaleX(-1)'}} justifyContent='left'>
          <Image
            height="140"
            width="140"
            src="/images/characters/0 Viking/Amazed.png"
          />
        </Grid>
        <Grid item container xs={6} justifyContent='left'>
          <Image
            height="140"
            width="140"
            src="/images/characters/2 Troll/Amazed.png"
          />
        </Grid>
      </Grid>


      <CardContent>
        <Typography gutterBottom variant="h6" color="primary.main">
          {props.title}
        </Typography>
        <Typography variant="body2" color="primary.main">
          {props.body}
        </Typography>
        <Link href='/characters'><Button variant='outlined' sx={{ mt: 1 }}>Lets Go!</Button></Link>
      </CardContent>
    </Card>
  );
}