import { Avatar, Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import useForm from "../customHooks/useFrom"

const containerStyle = {
    display: {xs: 'block', sm: 'block', md: 'flex'}, 
    alignItems: 'start',
    width: '100%',
    margin: '10px 0 0 0',
}

const typographyStyle = {
    width: '170px', 
    margin: '0 10px 0 30px', 
    textAlign: 'end'
}

const feldStyle = {
    margin: '0 50px 0 10px',
    padding: {xs: '0 50px 0 10px', sm: '0 50px 0 10px', md: '0'}, 
    width: '100%',
}

const ChangePassword = () => {
    const initialValues = {
        oldPassword: '',
        newPasswordFirst: '',
        newPasswordSecond: '',
    }

    const {
        values,
        handleInputChange,
    } = useForm(initialValues);

    const handleSubmit = () => {
        console.log(values);
    }

    return(
        <Box sx = {{width: '100%'}}>
            <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center',
                    width: '100%',
                    margin: '10px 0 30px 0',
                }}>
                <Box sx = {{width: '170px', margin: '0 10px 0 30px', display: 'flex', justifyContent: 'flex-end'}}>
                    <Avatar 
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 50, height: 50 }}
                    />
                </Box>
                <Typography variant = 'h6' sx = {feldStyle}>Bred</Typography>
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Старый пароль:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="oldPassword" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = 'oldPassword'
                    onChange={handleInputChange}
                    value = {values.oldPassword}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Новый пароль:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="newPasswordFirst" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = 'newPasswordFirst'
                    onChange={handleInputChange}
                    value = {values.newPasswordFirst}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Подтвердите новый пароль:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="newPasswordSecond" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = 'newPasswordSecond'
                    onChange={handleInputChange}
                    value = {values.newPasswordSecond}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Box sx = {{width: '170px', margin: '0 10px 0 30px'}}>
                    
                </Box>
                <Box sx = {feldStyle}>
                    <Button onClick={handleSubmit} variant="contained">Сменить пароль</Button>
                </Box>
            </Box>
            <Box sx = {containerStyle}>
                <Box sx = {{width: '170px', margin: '0 10px 0 30px'}}>
                    
                </Box>
                <Box sx = {feldStyle}>
                    <Button>Забыли пароль?</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ChangePassword