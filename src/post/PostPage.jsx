import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import useForm from '../customHooks/useFrom';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { deletePost, savedPost } from '../redux/auth-reducer';
import { addComment, deleteLike, getPostThunk, setLike } from '../redux/postPage-reducer';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoaderPage from '../common/LoaderPage'
import NoInternetError from '../common/NoInternetError';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    bgcolor: 'background.paper',
    p: 4,
    padding: 0,
};

const styleCard = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    bgcolor: 'background.paper',
    p: 4,
    padding: 0,
    border: '1px solid lightgray',
    borderRadius: '15px'
};

const initialPostValues = {
    postComment: '',
}

function PostModal({post, ...props}) {
    const {postId} = useParams();

    useEffect(() => {
        document.title = `Пост ${postId}`
    }, [])
    
    useEffect(() => {
        props.getPostThunk(postId)
    }, [])
    
    const {
        values,
        handleInputChange,
    } = useForm(initialPostValues);

    const sendPost = () => {
        props.addComment(values.postComment);
        values.postComment = '';
    }
    
    if (post.postIsLoading) {
        return <LoaderPage/>
    }

    const deletePost = () => {
        props.deletePost(post.postId)
    }

    const savedPost = () => {
        props.savedPost(post)
    }

    if (props.error) return <NoInternetError/>
    
    return (
        <Box sx = {{style}}>
            <Card sx={styleCard}>
                <Box sx = {{display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%'}}>
                    <Box  sx = {{width: '600px', height: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'black'}}>
                        <CardMedia
                            component="img"
                            height="auto"
                            width = '600px'
                            image= {post.url}
                            alt="green iguana"
                        />
                    </Box>
                    <Box sx = {{width: '400px', height: '100%', display: 'inline-block'}}>
                        <CardContent sx = {{padding: '0'}}>
                            <Box sx = {{height: '60px', width: '100%'}}>
                                <CardHeader
                                    sx = {{padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', paddingLeft: '10px', paddingRight: '10px'}}
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings" sx = {{padding: 0, paddingTop: '15px'}}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title= {
                                        <NavLink style = {{textDecoration: 'none', color: 'black'}} to={`/${post.username}/publications`}>{post.username}</NavLink>
                                    }
                                />
                            </Box>
                            <Divider/>
                            <Box sx = {{height: '480px', width: '100%', justifyContent: 'space-between', alignItems: 'center', overflowY: 'scroll'}}>
                                {
                                    post.comments.map((item) => {
                                        return (
                                            <Box key = {item.id} sx = {{padding: '10px'}}>
                                                <Box sx={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                    <Avatar sx={{ bgcolor: red[500], width: 24, height: 24 }} aria-label="recipe">
                                                        R
                                                    </Avatar>
                                                    <Typography
                                                        sx={{ display: 'inline-block', width: '300px', paddingLeft: '15px'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        <a href="/">User</a>
                                                        <Typography component="span" variant="body2" sx={{ paddingLeft: '15px'}}>
                                                            {item.body}
                                                        </Typography>
                                                    </Typography>
                                                    <IconButton aria-label="add to favorites">
                                                        <FavoriteBorderIcon fontSize = 'small' />
                                                    </IconButton>
                                                </Box>
                                                <Typography sx = {{paddingLeft: '50px', color: 'gray'}} fontSize = '12px'>
                                                    3 ч.
                                                </Typography>
                                            </Box>   
                                        )
                                    })
                                }
                            </Box>
                            <Divider/>
                            <Box sx = {{height: '100px', width: '100%'}}>
                            <Grid
                                alignItems="center"
                                container
                                direction="row"
                                justifyContent="space-between"
                                sx = {{paddingBottom: '0px'}}
                            >
                                <Box>
                                    
                                    {
                                        post.liked
                                            ? <IconButton onClick={props.deleteLike} aria-label="add to favorites">
                                                <FavoriteIcon  fontSize = 'medium' color='error'/>
                                            </IconButton>
                                            : <IconButton onClick={props.setLike} aria-label="add to favorites">
                                                <FavoriteBorderIcon fontSize = 'medium'/>
                                            </IconButton>
                                    }
                                    
                                    <IconButton aria-label="share">
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                                    {
                                        post.savedPost
                                        ?<IconButton onClick = {deletePost} aria-label="share"><BookmarkIcon /></IconButton>                                    
                                        :<IconButton onClick = {savedPost} aria-label="share"><BookmarkBorderIcon/></IconButton>
                                    }
                            </Grid>
                                <Box sx = {{paddingLeft: '10px'}}>
                                    <Typography fontSize = '15px'>
                                        <b>{post.likeCount} отметок "Нравится"</b>
                                    </Typography>
                                    <Typography fontSize = '10px' color = 'gray'>
                                        5 ЧАСОВ НАЗАД
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider/>
                            <form>
                                <Grid
                                    alignItems="center"
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    sx = {{height: '50px', width: '100%'}}
                                >
                                    <TextField placeholder="Оставить комментарий" 
                                    InputProps={{ disableUnderline: true }} 
                                    sx = {{width: '300px', paddingLeft: '10px'}} 
                                    id="filled-basic" 
                                    label="" 
                                    variant="standard" 
                                    name = "postComment"
                                    onChange = {handleInputChange}
                                    value = {values.postComment}
                                    />
                                    {
                                        values.postComment
                                        ? <Button 
                                            variant="text"
                                            onClick = {sendPost}
                                        >   
                                        Send
                                        </Button>
                                        : <Button 
                                            variant="text"
                                            disabled
                                        >   
                                        Send
                                        </Button>
                                    }
                                </Grid>
                            </form>
                        </CardContent>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        post: state.postPage,
        error: state.authReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLike: () => {
            dispatch(setLike())
        },
        deleteLike: () => {
            dispatch(deleteLike())
        },
        addComment: (comment) => {
            dispatch(addComment(comment))
        },
        savedPost: (post) => {
            dispatch(savedPost(post))
        },
        deletePost: (id) => {
            dispatch(deletePost(id))
        },
    }
}

export default compose(
    connect(null, {getPostThunk}),
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(PostModal);