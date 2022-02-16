import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useForm from "../customHooks/useFrom";

const NotificationSettings = ({notificationSettings, changeSettings}) => {

    const {
        values,
        handleInputChange,
    } = useForm(notificationSettings);

    const handleSubmit = () => {
        changeSettings(values, 'notificationSettings')
    }

    return (
        <Box sx = {{width: '100%', height: '100%', padding: '30px 40px'}}>
            <Box sx = {{width: '100%', height: '100%'}}>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Отметки "Нравится"</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={values.like}
                    name="like"
                    onChange={handleInputChange}
                    >
                    <FormControlLabel value="1" control={<Radio sx = {{padding: '0 10px'}}/>} label="Выкл." />
                    <FormControlLabel value="2" control={<Radio sx = {{padding: '0 10px'}}/>} label="От людей, на которых вы подписаны" />
                    <FormControlLabel value="3" control={<Radio sx = {{padding: '0 10px'}}/>} label="От всех" />
                </RadioGroup>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>johnappleseed нравится ваше фото.</Typography>
                <hr/>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Комментарии</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={values.comments}
                    name="comments"
                    onChange={handleInputChange}
                    >
                    <FormControlLabel value="1" control={<Radio sx = {{padding: '0 10px'}}/>} label="Выкл." />
                    <FormControlLabel value="2" control={<Radio sx = {{padding: '0 10px'}}/>} label="От людей, на которых вы подписаны" />
                    <FormControlLabel value="3" control={<Radio sx = {{padding: '0 10px'}}/>} label="От всех" />
                </RadioGroup>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>johnappleseed прокомментировал(-а): "Хороший снимок!"</Typography>
                <hr/>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Принятые запросы на подписку</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={values.subscriptionRequest}
                    name="subscriptionRequest"
                    onChange={handleInputChange}
                    >
                    <FormControlLabel value="1" control={<Radio sx = {{padding: '0 10px'}}/>} label="Выкл." />
                    <FormControlLabel value="2" control={<Radio sx = {{padding: '0 10px'}}/>} label="От всех" />
                </RadioGroup>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>John Appleseed (johnappleseed) принял(-а) ваш запрос на подписку.</Typography>
                <hr/>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Напоминания</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={values.reminders}
                    name="reminders"
                    onChange={handleInputChange}
                    >
                    <FormControlLabel value="1" control={<Radio sx = {{padding: '0 10px'}}/>} label="Выкл." />
                    <FormControlLabel value="2" control={<Radio sx = {{padding: '0 10px'}}/>} label="От всех" />
                </RadioGroup>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>У вас есть непросмотренные уведомления и другие похожие уведомления.</Typography>
                <hr/>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Первые публикации</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={values.firstPublications}
                    name="firstPublications"
                    onChange={handleInputChange}
                    >
                    <FormControlLabel value="1" control={<Radio sx = {{padding: '0 10px'}}/>} label="Выкл." />
                    <FormControlLabel value="2" control={<Radio sx = {{padding: '0 10px'}}/>} label="От людей, на которых вы подписаны" />
                    <FormControlLabel value="3" control={<Radio sx = {{padding: '0 10px'}}/>} label="От всех" />
                </RadioGroup>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>Вы увидите первый пост johnappleseed в Instagram, а также другие похожие уведомления.</Typography>
                <hr/>
                <Typography sx = {{margin: '0 0 20px 0'}} variant="h6">Запросы поддержки</Typography>
                <RadioGroup
                    value={values.supportRequests}
                    name="supportRequests"
                    onChange={handleInputChange}
                    >
                    <FormControlLabel value="1" control={<Radio sx = {{padding: '0 10px'}}/>} label="Выкл." />
                    <FormControlLabel value="2" control={<Radio sx = {{padding: '0 10px'}}/>} label="От всех" />
                </RadioGroup>
                <Typography variant="subtitle2" sx = {{color: 'gray'}}>Ваш запрос на поддержку (дата: июля 10) только что был обновлен.</Typography>
                
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

export default NotificationSettings