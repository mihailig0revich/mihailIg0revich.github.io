import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import NoInternetError from '../common/NoInternetError';
import { loginThunk } from '../redux/auth-reducer';

const Login = (props) => {
    const [value, setValue] = useState('');

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.loginThunk(value)
        setValue('')

    }
    
    if (props.error) return <NoInternetError/>

    if (props.isAuth) {
        return <Redirect to = '/'/>
    }
    return (
        <form>
            <Box 
                sx = {{
                    border: '1px solid lightgray', 
                    borderRadius: '10px', 
                    marginTop: '100px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    }}>
                <Typography variant = 'h5' sx = {{margin: '10px'}}>
                    Авторизация
                </Typography>
                <TextField 
                    id="outlined-basic" 
                    value = {value} 
                    onChange = {handleInputChange}
                    label="Пароль" 
                    variant="outlined" />
                <Button 
                    sx = {{margin: '20px 0px 20px 0px'}}
                    onClick = {handleSubmit} 
                    variant="contained"
                >
                    Войти
                </Button>
            </Box>
        </form>
    )
}

const mapDispatchToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        error: state.authReducer.error
    }
}

export default compose(
    connect(mapDispatchToProps, {loginThunk})
)(Login) 