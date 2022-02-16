
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import {Avatar, List, ListItem, ListItemAvatar } from '@mui/material';
import { NavLink } from 'react-router-dom';


const NotificationModal = (props) => {

    const handleNotificationOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };
    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };  
    const [notificationanchorEl, setNotificationAnchorEl] = React.useState(null);
    const isNotificationOpen = Boolean(notificationanchorEl);
    const NotificationId = 'primary-notification';  

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick = {handleNotificationOpen}
            >
                {props.children}
            </IconButton>
            <Menu
                id={NotificationId}
                anchorEl={notificationanchorEl}
                open={isNotificationOpen}
                onClose={handleNotificationClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                sx = {{
                    maxHeight: '500px',
                }}
            >
                <List sx={{ width: '100%', maxWidth: '500px', minWidth: '300px', bgcolor: 'background.paper', padding: '0px 0px', }}>
                    {
                        props.notificationsData.map((item) => {
                            return (
                                <React.Fragment key = {item.id}>
                                    <ListItem sx = {{
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box>
                                        <ListItemAvatar sx={{ display: 'inline-block'}}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <Typography
                                            sx={{ display: 'inline-block'}}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            <NavLink 
                                                style = {{
                                                    textDecoration: 'none', 
                                                    color: 'black', 
                                                    marginRight: '10px'
                                                }} 
                                                to={`/${item.username}/publications`}
                                            >
                                                <b>{item.username}</b>
                                            </NavLink>
                                            {item.message}
                                        </Typography>
                                    </Box>
                                    <NavLink onClick = {handleNotificationClose} style = {{textDecoration: 'none', color: 'black'}} to={`/post/1`}><img src={item.img}/></NavLink>
                                    
                                    </ListItem>
                                </React.Fragment>
                            )
                        })
                    }
                </List>
            </Menu>
        </Box>
    )
}

export default NotificationModal