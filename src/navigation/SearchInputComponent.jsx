import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useForm from '../customHooks/useFrom';
import { useHistory } from 'react-router-dom';

const initialPostValues = {
    searchUser: ''
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: '10%',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
}));

const SearchInputComponent = () => {
    const {
        values,
        handleInputChange,
    } = useForm(initialPostValues);

    let history = useHistory()

    const handleSearchUser = () => {
        
        history.push(`/${values.searchUser}/publications`); 
        values.searchUser = ''
    }
    return (
        <Search sx = {{
            justify: 'center'
        }}>
            <IconButton onClick ={handleSearchUser} sx ={{color: 'inherit'}}>
                <SearchIcon />
            </IconButton>
            <StyledInputBase
                name = "searchUser"
                value={values.searchUser}
                onChange={handleInputChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

export default SearchInputComponent