import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import useForm from "../customHooks/useFrom";

const SecuritySettings = ({securitySettings, changeSettings}) => {

    const {
        values,
        handleCheckboxChange,
    } = useForm(securitySettings);

    const handleSubmit = () => {
        changeSettings(values, 'securitySettings')
    }    

    return (
        <Box sx = {{width: '100%', height: '100%', padding: '30px 40px'}}>
            <Box sx = {{width: '100%', height: '100%'}}>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Конфиденциальность аккаунта</Typography>
                <FormControlLabel 
                    id = 'accountPrivacy'
                    control={<Checkbox 
                        name = 'accountPrivacy'
                        onChange = {handleCheckboxChange}
                        checked = {values.accountPrivacy}
                    />} 
                    label="Закрытый аккаунт"/>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>Если у вас закрытый аккаунт, ваши фото и видео в Instagram смогут видеть только люди, которых вы одобрите. Это не относится к уже существующим подписчикам.</Typography>
                <hr/>
                <Typography sx = {{margin: '20px 0'}} variant="h6">Сетевой статус</Typography>
                <FormControlLabel  
                    id = 'onlineStatus'
                    control={<Checkbox 
                        name = 'onlineStatus'
                        onChange = {handleCheckboxChange}
                        checked = {values.onlineStatus}
                    />} 
                    label="Показывать сетевой статус"/>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>Разрешить владельцам аккаунтов, на которые вы подписаны, и всем, кому вы отправляете сообщения, видеть, когда вы заходили в приложения Instagram в последний раз. Отключив эту настройку, вы не сможете видеть сетевой статус других аккаунтов.</Typography>
                <Box 
                    sx = {{
                        margin: '20px 0', 
                        width: '100%', 
                        display: {xs: 'block', sm: 'block', md: 'flex'}, 
                        justifyContent: 'left',
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
                </Box>
            </Box>
        </Box>
    )
}

export default SecuritySettings