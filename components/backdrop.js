import * as React from 'react';
import { Typography, Grid, Box, CircularProgress, Backdrop } from '@mui/material';

export default function LoadingBackdrop(props) {
    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoading}
            >
                <Box sx={{backgroundColor:'primary.main'}}>
                    <Grid container sx={{p:2}}>
                        <Grid item xs={12} align='center' justify='center'>
                            <CircularProgress color="inherit" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" textAlign='center' backgroundColor='primary.main'>{props.loadingText}</Typography>
                        </Grid>
                    </Grid>
                </Box>


            </Backdrop>
        </div>
    );
}