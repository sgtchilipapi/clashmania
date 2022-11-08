import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Grid } from '@mui/material';

export default function LoadingBackdrop(props) {
    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoading}
            >
                <Grid container>
                    <Grid item xs={12} align='center' justify='center'>
                        <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign='center' backgroundColor='primary.main'>{props.loadingText}</Typography>
                    </Grid>
                </Grid>


            </Backdrop>
        </div>
    );
}