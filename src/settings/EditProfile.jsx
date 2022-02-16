import { Avatar, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import useForm from "../customHooks/useFrom";

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

const EditProfile = ({editProfile, changeSettings}) => {

    const {
        values,
        handleInputChange,
        handleCheckboxChange,
    } = useForm(editProfile);

    const handleSubmit = () => {
        changeSettings(values, 'editProfile')
    }

    return (
        <Box  sx = {{width: '100%'}}>
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
                <Typography sx = {typographyStyle}><b>Имя:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="editName" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editName"
                    onChange = {handleInputChange}
                    value = {values.editName}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Имя пользователя:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="editUsername"  
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editUsername"
                    onChange = {handleInputChange}
                    value = {values.editUsername}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Веб-сайт:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="editWebsite" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editWebsite"
                    onChange = {handleInputChange}
                    value = {values.editWebsite}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>О себе:</b></Typography>
                <TextField  
                    multiline 
                    maxRows={4} 
                    id="editAboutSelf" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editAboutSelf"
                    onChange = {handleInputChange}
                    value = {values.editAboutSelf}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}></Typography>
                <Typography variant = 'h6' sx = {{margin: '10px 50px 10px 10px', width: '100%',}}>Личная информация</Typography>
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Эл. адрес:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="editEmail" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editEmail"
                    onChange = {handleInputChange}
                    value = {values.editEmail}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Номер телефона:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="editPhoneNumber" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editPhoneNumber"
                    onChange = {handleInputChange}
                    value = {values.editPhoneNumber}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Пол:</b></Typography>
                <TextField 
                    size = 'small' 
                    id="editGender" 
                    variant="outlined" 
                    sx = {feldStyle}
                    name = "editGender"
                    onChange = {handleInputChange}
                    value = {values.editGender}
                />
            </Box>
            <Box sx = {containerStyle}>
                <Typography sx = {typographyStyle}><b>Рекомендации похожих аккаунтов:</b></Typography>
                <FormControlLabel 
                    id = 'recommendationSimilarAccounts'
                    control={<Checkbox 
                        name = 'recommendationSimilarAccounts'
                        onChange = {handleCheckboxChange}
                        checked = {values.recommendationSimilarAccounts}
                    />} 
                    label="Рекомендовать ваш аккаунт возможным подписчикам." 
                    sx = {feldStyle} 
                    />
            </Box>
            <Box sx = {containerStyle}>
                <Box sx = {{width: '170px', margin: '0 10px 0 30px'}}>
                    
                </Box>
                <Box 
                    sx = {{
                        margin: '0 50px 0 10px', 
                        width: '100%', 
                        display: {xs: 'block', sm: 'block', md: 'flex'}, 
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        onClick={handleSubmit}
                        variant="contained" 
                        sx = {{
                            display: 'block',
                            margin: {xs: '20px', sm: '20px', md: '0'}
                        }}
                    >
                        отправить
                    </Button>
                    <Button sx = {{
                            display: 'block',
                            margin: {xs: '20px', sm: '20px', md: '0'}
                        }}
                    >
                        Временно отключить мой аккаунт
                    </Button>
                </Box>
            </Box>
            
        </Box>
    )
}

export default EditProfile