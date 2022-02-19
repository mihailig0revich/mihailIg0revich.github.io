import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useForm from '../customHooks/useFrom';
import { useHistory } from 'react-router-dom';
import { Search, StyledInputBase } from '../styledComponent/search';

const initialPostValues = {
    searchUser: ''
}

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