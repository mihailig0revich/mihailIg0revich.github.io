import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Divider, IconButton } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const ModalMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onLogout = () => {
        handleMenuClose()
        props.logoutThunk();
    }

    const menuId = 'primary-search-account-menu';
    return (
        <Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx = {props.customStyle}
            >
                {props.children}
            </IconButton>
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem 
                    component = {Link}
                    to={`/${props.username}/publications`} 
                    style = {{textDecoration: 'none',color: 'black'}} 
                    onClick={handleMenuClose}
                >
                    <AccountCircle sx = {{marginRight: '10px'}}/> Профиль
                </MenuItem>

                <MenuItem 
                    onClick={handleMenuClose}
                    component = {Link}
                    to= {`/${props.username}/saved`} 
                    style = {{textDecoration: 'none',color: 'black'}} 
                >
                    <BookmarkBorderIcon sx = {{marginRight: '10px'}}/> Сохнаненное
                </MenuItem>

                <MenuItem 
                    onClick={handleMenuClose}
                    component = {Link}
                    to="/accounts/edit" 
                    style = {{textDecoration: 'none',color: 'black'}}
                >
                    <SettingsIcon sx = {{marginRight: '10px'}}/> Настройки
                </MenuItem>

                <Divider />
                
                <NavLink style = {{
                    textDecoration: 'none',
                    color: 'black'
                }} to="/">
                    <MenuItem onClick={onLogout}>Выйти</MenuItem>
                </NavLink>
            </Menu>
        </Box>
    )
}

export default ModalMenu