import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { NavLink } from "react-router-dom"

const ErrorPage = () => {
    return <Box sx = {{width: '100%', marginTop: '2%'}}>
        <Typography variant="h5" align = 'center'><b>К сожалению, эта страница недоступна.</b></Typography>
        <Typography sx = {{marginTop: '2%'}} align = 'center'>
            Возможно, вы воспользовались недействительной ссылкой или страница была удалена. 
            <NavLink style={{textDecoration: 'none', color: 'blue'}} to = '/'>
                Вернуться на главную страницу
            </NavLink>
        </Typography>
    </Box>
}

export default ErrorPage