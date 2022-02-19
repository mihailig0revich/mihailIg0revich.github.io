import { Avatar, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useRef } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link, NavLink, Route, Switch, useParams} from 'react-router-dom';
import SettingsModal from './SettingsModal'
import { useObserver } from "../customHooks/useOserver";
import Posts from "./Posts";
import UserListModal from "./UserListModal";
import DialogForm from "./DialogForm";

const typographyStyle = {
    display: 'inline-block',
    marginRight: '20px',
    
}

const typographyButtonStyle = {
    display: 'inline-block',
    marginRight: '20px',
    textTransform: 'none',
    color: 'black',
    fontSize: 16,
    fontFamily: 'sans-serif'
}

const Profile = (props) => {

    const lastElement = useRef();
    
    const canLoad = props.currentPage < props.totalPageCount;
    
    useObserver(lastElement, canLoad, props.isPageLoading, props.getAlbumThink, props.user.username, props.currentPage);
    
    const {username, tag} = useParams();
    
    const allTabs = [`/${username}/publications`, `/${username}/saved`];

    const [openModal, setOpenModal] = React.useState(false);
    const handleFormProblemDialogOpen = () => setOpenModal(true);
    const handleFormProblemDialogClose = () => setOpenModal(false);
        
    return (
        <>
            <Box sx = {{width: '1000px'}}>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    container
                    direction="row" 
                    sx = {{marginTop: '20px'}}
                >
                    <Box sx = {{marginLeft: '100px', marginRight: '100px'}}>
                        <Avatar 
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 130, height: 130, marginBottom: '20px' }}
                        />
                    </Box>
                    <Box>   
                        <Box sx = {{marginBottom: '10px'}}>
                            <Typography sx ={typographyStyle}>{props.user.username}</Typography>
                            {
                                props.userMatch 
                                    ? <>
                                        <NavLink style = {{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }} to="/accounts/edit">
                                                <Button variant="outlined">Редактировать профиль</Button>
                                        </NavLink>
                                        <SettingsModal
                                            handleFormProblemDialogOpen = {handleFormProblemDialogOpen}                            
                                        >
                                            <SettingsIcon/>
                                        </SettingsModal>
                                    </>
                                    : <>
                                        {
                                            props.isSub 
                                                ? <Button variant="outlined" onClick = {() => props.deleteSubscriptions(props.user.username)}>Отписаться</Button>
                                                : <Button variant="contained" onClick = {() => props.addSubscription(props.user.username)}>Подписаться</Button>
                                        }
                                    </>
                            }
                        </Box>
                        <Box sx = {{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                            <Typography sx = {typographyStyle}><b>{props.totalPostsCount}</b> публикаций</Typography>
                            <UserListModal
                                userList = {props.subscribers}
                                customStyle = {typographyButtonStyle}
                                titleText = {'Подписчиков'}
                                buttonText = {'Удалить'}
                                deleteUser = {props.deleteSubscribers}
                                userMatch = {props.userMatch}
                                >
                                <b>{props.subscribers.length}</b> подписчиков
                            </UserListModal>
                            <UserListModal
                                userList = {props.subscriptions}
                                customStyle = {typographyButtonStyle}
                                userMatch = {props.userMatch}
                                deleteUser = {props.deleteSubscriptions}
                                buttonText = {'Отписаться'}
                                titleText = {'Подписок'}
                            >
                                <b>{props.subscriptions.length}</b> подписок
                            </UserListModal>
                        </Box>
                        <Box sx = {{marginBottom: '10px'}}>
                            <Typography sx = {typographyStyle}><b>{props.user.name}</b></Typography>
                        </Box>
                    </Box>
                </Grid>
                <Box sx={{ width: '100%', marginTop: '20px'}}>
                    <Box 
                        sx = {{ 
                            width: '100%', 
                            marginTop: '20px'
                        }}
                    >
                        <Box 
                            sx = {{ 
                                borderBottom: 1, 
                                borderColor: 'divider' 
                            }}
                        >
                            <Tabs 
                                value={`/${username}/${tag}`} 
                                aria-label="basic tabs example" 
                                centered
                            >
                                <Tab 
                                    label = {
                                        <Grid 
                                            alignItems="center" 
                                            container 
                                            direction="row"
                                        >
                                            <AppsIcon/>
                                            ПУБЛИКАЦИИ
                                        </Grid>
                                    } 
                                    value = { `/${username}/publications` } 
                                    component={Link} 
                                    to={allTabs[0]} 
                                />
                                <Tab 
                                    label = {
                                        <Grid 
                                            alignItems="center" 
                                            container 
                                            direction="row"
                                        >
                                            <BookmarkBorderIcon/>
                                            СОХРАНЕННОЕ
                                        </Grid>
                                    } 
                                    value={`/${username}/saved`} 
                                    component={Link} 
                                    to={allTabs[1]}/>
                            </Tabs>
                        </Box>
                        <Switch>
                            <Route 
                                path={allTabs[0]} 
                                render={() => (
                                    <Posts
                                        lastElement = {lastElement}
                                        posts = {props.posts}
                                        addComment = {props.addComment} 
                                        setLike = {props.setLike}
                                        setSave = {props.setSave}
                                        savedPost = {props.savedPost}
                                        deletePost = {props.deletePost}
                                        customStyle = {{
                                            width: '100px'
                                        }}
                                    />
                                )}
                            />
                            <Route 
                                path={allTabs[1]} 
                                render={() => {
                                    return (
                                        <Posts
                                            lastElement = {lastElement}
                                            posts = {props.savedPosts}
                                            addComment = {props.addComment} 
                                            setLike = {props.setLike}
                                            savedPost = {props.savedPost}
                                            deletePost = {props.deletePost}
                                            customStyle = {{
                                                visibility: 'hidden',
                                                width: '100px'
                                            }}
                                        />
                                    )
                                }}
                            />
                        </Switch>
                    </Box>
                </Box>
            </Box>
            <DialogForm
                handleFormProblemDialogClose = {handleFormProblemDialogClose}
                handleFormProblemDialogOpen = {handleFormProblemDialogOpen}
                openModal = {openModal}
            />
        </>
    )
}

export default Profile;


