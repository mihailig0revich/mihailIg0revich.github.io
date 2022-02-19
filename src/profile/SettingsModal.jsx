import * as React from 'react';
import Modal from '@mui/material/Modal';
import {IconButton, ListItemText, MenuItem, MenuList, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export default function SettingsModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleSettingsOpen = () => setOpen(true);
    const handleSettingsClose = () => setOpen(false);

    const multyHandle = () => {
        props.handleFormProblemDialogOpen();
        handleSettingsClose()
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 500,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <React.Fragment>
            <IconButton variant="text" color={'inherit'} onClick={handleSettingsOpen}>{props.children}</IconButton>
            <Modal
                open={open}
                onClose={handleSettingsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper>
                        <MenuList>
                            <MenuItem component = {Link} to = '/accounts/changepassword' onClick={handleSettingsClose} sx = {{textAlign: 'center'}}>
                                <ListItemText>Сменить пароль</ListItemText>
                            </MenuItem>

                            <Divider/>

                            <MenuItem component = {Link} to = '/accounts/emails' onClick={handleSettingsClose} sx = {{textAlign: 'center'}}>
                                <ListItemText>Уведомления</ListItemText>
                            </MenuItem>

                            <Divider />

                            <MenuItem component = {Link} to = '/accounts/privacy_and_security' onClick={handleSettingsClose} sx = {{textAlign: 'center'}}>
                                <ListItemText>Конфиденциальность и безопасность</ListItemText>
                            </MenuItem>

                            <Divider />

                            <MenuItem onClick={multyHandle} sx = {{textAlign: 'center'}}>
                                <ListItemText>Сообщить о проблеме</ListItemText>
                            </MenuItem>

                            <Divider sx = {{marginBottom: '8px', marginTop: '8px'}} />

                            <MenuItem onClick={handleSettingsClose} sx = {{textAlign: 'center'}}>
                                <ListItemText>Выход</ListItemText>
                            </MenuItem>

                            <Divider />

                            <MenuItem onClick={handleSettingsClose} sx = {{textAlign: 'center'}}>
                                <ListItemText>Отмена</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Box>
            </Modal>
        </React.Fragment>
    );
}