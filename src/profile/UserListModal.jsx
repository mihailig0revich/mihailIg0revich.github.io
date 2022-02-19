import { Avatar, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react";
import { NavLink } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

const UserListModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button 
                sx = {props.customStyle} 
                color={'inherit'} 
                onClick={handleOpen}
                disableRipple 
                disableFocusRipple
            >
                {props.children}
            </Button>
            <Dialog 
                open={open} 
                onClose={handleClose}
            >
                <DialogTitle 
                    sx = {{
                        display: 'flex', 
                        width: '400px', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '0', 
                        borderBottom: '1px solid black'
                    }}
                >
                    <Typography 
                        component = {'span'} 
                        sx = {{
                            width: '100%', 
                            textAlign: 'center', 
                            marginLeft: '40px'
                        }}
                    >
                        {props.titleText}
                    </Typography>
                    <IconButton 
                        onClick = {handleClose}>
                        <ClearIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent 
                    sx = {{
                        padding: '0', 
                        overflowY: 'scroll', 
                        height: '300px'
                    }}
                >
                    {
                        props.userList.map((item) => {
                            return (
                                <Box 
                                    key = {item.id}
                                    sx = {{
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between', 
                                        padding: '10px 10px'
                                    }}
                                >
                                    <Box 
                                        sx = {{
                                            display: 'flex', 
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Avatar 
                                            alt="Remy Sharp"
                                            src="/static/images/avatar/1.jpg"
                                            sx={{ 
                                                width: 40, 
                                                height: 40,
                                            }}
                                        />
                                        <NavLink 
                                            style = {{
                                                textDecoration: 'none', 
                                                color: 'black', 
                                                margin: '0 10px'
                                            }} 
                                            to={`/${item.username}/publications`} 
                                            onClick={handleClose}
                                        >
                                            {item.username}
                                        </NavLink>
                                    </Box>
                                    { props.userMatch && <Button variant="outlined" onClick = {() => props.deleteUser(item.username)}>{props.buttonText}</Button>}
                                </Box>
                            )
                        })
                    }
                    <Divider/>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default UserListModal