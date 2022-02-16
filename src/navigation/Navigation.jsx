import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import { CssBaseline, Grid, useScrollTrigger } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { connect } from 'react-redux';
import { logoutThunk } from '../redux/auth-reducer';
import { AuthContext } from '../context/authContext'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalMenu from './ModalMenu';
import NotificationModal from './NotificationModal';
import SearchInput from './SearchInputComponent';

const notificationsData = [
    {
        id: '1',
        username: 'Antonette',
        message: "I'll be in your",
        img: 'https://via.placeholder.com/40/197d29',
    },
    {
        id: '2',
        username: 'Antonette',
        message: "I'll be in your",
        img: 'https://via.placeholder.com/40/197d29',
    },
    {
        id: '3',
        username: 'Antonette',
        message: "I'll be in your",
        img: 'https://via.placeholder.com/40/197d29',
    },
]

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function PrimarySearchAppBar(props) {    

    const isAuth = React.useContext(AuthContext);    

    return (
        <React.Fragment>
            <CssBaseline />
                <ElevationScroll {...props}>
                    <AppBar>
                        <Toolbar sx={{ mr: 1 }}>
                            <Grid
                                alignItems="center"
                                justifyContent="center"
                                container
                                direction="row"
                            >
                                {isAuth.isAuth ?
                                    <Grid
                                        alignItems="center"
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        sx = {{
                                            maxWidth: '800px'
                                        }}
                                    >
                                        <NavLink style = {{
                                            textDecoration: 'none',
                                            color: 'white'
                                        }} to="/">
                                            <Button color="inherit">
                                                <Typography
                                                    variant="h6"
                                                    noWrap
                                                    component="div"
                                                >
                                                    My Album
                                                </Typography>
                                            </Button>
                                        </NavLink>
                                        
                                        <SearchInput/>

                                        <div>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Box sx={{ display: 'flex' }}>
                                                <NavLink style = {{
                                                    textDecoration: 'none',
                                                    color: 'white'
                                                }} to="/">
                                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                                        <HomeIcon />
                                                    </IconButton>
                                                </NavLink>
                                                <NavLink style = {{
                                                    textDecoration: 'none',
                                                    color: 'white'
                                                }} to="/create">
                                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                                        <AddBoxIcon />
                                                    </IconButton>
                                                </NavLink>

                                                <NotificationModal
                                                    notificationsData = {notificationsData}
                                                >
                                                    <Badge badgeContent={notificationsData.length} color="error">
                                                    <NotificationsIcon />
                                                    </Badge>
                                                </NotificationModal>
                                                
                                                <ModalMenu
                                                    logoutThunk = {props.logoutThunk}
                                                    username = {props.username}
                                                >
                                                    <AccountCircle />
                                                </ModalMenu>
                                            </Box>
                                        </div>
                                    </Grid>
                                    :
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ display: { xs: 'none', sm: 'block' } }}
                                    >
                                        MY ALBUM
                                    </Typography>
                                }
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
            <Toolbar />
        </React.Fragment>  
    );
}

const mapStateToProps = (state) => {
    return {
        username: state.authReducer.user.username
    }
}

export default connect(mapStateToProps, {logoutThunk})(PrimarySearchAppBar)