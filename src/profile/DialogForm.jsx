import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";

const DialogForm = (props) => {
    
    const [value, setValue] = React.useState();

    const handleChange = (event) => setValue(event.target.value);

    return (
        <Box>
            <Dialog open={props.openModal} onClose={props.handleFormProblemDialogClose}>
                <DialogTitle sx = {{display: 'flex', width: '500px', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6px', paddingTop: '6px'}}>
                    <Typography component = {'span'}>
                        Сообщить о проблеме
                    </Typography>
                    <IconButton onClick = {props.handleFormProblemDialogClose}>
                        <ClearIcon/>
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent sx = {{paddingBottom: '6px', paddingTop: '6px'}}>
                    <TextField
                        id="outlined-multiline-flexible"
                        autoFocus
                        multiline
                        label="Описание проблемы"
                        margin="dense"
                        value={value}
                        fullWidth
                        rows={4}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions sx = {{display: 'flex', width: '500px', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6px', paddingTop: '6px'}}>
                    <Button onClick={props.handleFormProblemDialogClose}>Отправить жалобу</Button>
                    <Button>Добавить файл</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogForm