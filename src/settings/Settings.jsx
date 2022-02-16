import React from "react";
import { Switch, Route, Link, withRouter} from "react-router-dom";
import { Card, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import ChangePassword from "./ChangePassword";
import { useParams } from "react-router-dom";
import NotificationSettings from './NotificationSettings'
import EditProfile from "./EditProfile";
import SecuritySettings from "./SecuritySettings";

const Settings = ({settingsPage, changeSettings}) => {
    const allTabs = ['/accounts/edit', '/accounts/changepassword', '/accounts/privacy_and_security', '/accounts/emails'];
    const {settings} = useParams()
    return (
        <Box key = {settings} sx = {{maxWidth: '1000px', width: '100%'}}>
                <Box sx = {{width: '100%'}}>
                    <Card sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '700px', margin: '10px'}}>
                        <Tabs 
                            orientation="vertical"
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider', width: '250px' }}
                            value={`/accounts/${settings}`}
                        >
                            <Tab 
                                label="Редактировать профиль" 
                                value="/accounts/edit" 
                                component={Link} 
                                to={allTabs[0]} 
                            />
                            <Tab 
                                label="Сменить пароль" 
                                value="/accounts/changepassword" 
                                component={Link} 
                                to={allTabs[1]} 
                            />
                            <Tab 
                                label="Конфиденциальность и безопасность" 
                                value="/accounts/privacy_and_security" 
                                component={Link} 
                                to={allTabs[2]} 
                            />
                            <Tab 
                                label="Уведомления" 
                                value="/accounts/emails" 
                                component={Link} 
                                to={allTabs[3]} 
                            />
                        </Tabs>
                        <Switch>
                            <Route path={allTabs[0]} render={() => {
                                return (
                                    <EditProfile 
                                        editProfile = {settingsPage.editProfile}
                                        changeSettings = {changeSettings}
                                    />
                                )
                            }} />
                            <Route path={allTabs[1]} render={() => {
                                return (
                                    <ChangePassword/>
                                )
                            }} />
                            <Route path={allTabs[2]} render={() => {
                                return (
                                    <SecuritySettings 
                                        securitySettings = {settingsPage.securitySettings}
                                        changeSettings = {changeSettings}
                                    />
                                )
                            }} />
                            <Route path={allTabs[3]} render={() => {
                                return (
                                    <NotificationSettings 
                                        notificationSettings = {settingsPage.notificationSettings}
                                        changeSettings = {changeSettings}
                                    />
                                )
                            }} />
                        </Switch>
                    </Card>
                </Box>
        </Box>
        
    );
}

export default withRouter(Settings)