import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import PostInModal from './PostInModalFeed'
import useForm from '../customHooks/useFrom';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const initialPostValues = {
    postComment: '',
}

export default function RecipeReviewCard( props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const {
        values,
        handleInputChange,
    } = useForm(initialPostValues);

    const sendPost = () => {
        props.addComment(values.postComment, props.post.postId)
        values.postComment = ''
    }

    const deletePost = () => {
        props.deletePost(props.post.postId)
        props.setSave(props.post.postId)
    }

    const savedPost = () => {
        props.savedPost(props.post)
        props.setSave(props.post.postId)
    }
    
    return (
        <Box sx = {{width: '100%', justifyContent: 'center', display: 'flex', paddingBottom: '20px'}}>
            <Card sx={{ width: 600, padding: '0px', marginBottom: '0px', border: 'solid 1px gray'}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" sx = {{padding: 0, paddingTop: '10px', paddingRight: '10px'}}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title= {
                        <NavLink style = {{textDecoration: 'none', color: 'black'}} to={`/${props.post.username}/publications`}>{props.post.username}</NavLink>
                    }
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="auto"
                    image= {props.post.url}
                    width = '100%'
                    alt="Paella dish"
                />
                <CardActions disableSpacing>
                    <Grid
                        alignItems="center"
                        container
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Box>
                            <IconButton aria-label="add to favorites" onClick = {() => props.setLike(props.post.postId)}>
                                {props.post.like 
                                    ? <FavoriteIcon fontSize = 'medium' color='error'/>
                                    : <FavoriteBorderIcon fontSize = 'medium' />
                                }
                                
                            </IconButton>
                        </Box>
                        {
                            props.post.savedPost
                            ?<IconButton onClick = {deletePost} aria-label="share"><BookmarkIcon /></IconButton>                                    
                            :<IconButton onClick = {savedPost} aria-label="share"><BookmarkBorderIcon/></IconButton>
                        }
                    </Grid>
                    
                </CardActions>
                <Typography sx = {{paddingLeft: '16px'}}>
                    {props.post.likeCount} отметок "Нравится"
                </Typography>
                {!expanded 
                    ? <Box>
                        <Typography sx = {{paddingLeft : '16px', paddingRight : '16px', paddingBottom : '0', paddingTop : '0'}}>
                            <a href="/">{props.post.username}</a> {props.post.title.slice(0, 300)}{props.post.title.length > 300 && '...'}
                            {
                                props.post.title.length > 300 && <CardActions disableSpacing sx = {{padding: '0', paddingLeft: '8px', height: '16px', display: 'inline-block'}}>
                                    <IconButton
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                        sx = {{fontSize: '16px', padding: '0', paddingLeft: '8px'}}
                                    >
                                        ещё
                                    </IconButton>
                                </CardActions>
                                
                            }
                            </Typography>
                        </Box>
                    : <Collapse in={expanded} timeout="auto">
                        <CardContent sx = {{paddingLeft : '16px', paddingRight : '16px', paddingBottom : '0', paddingTop : '0'}}>
                            <Typography paragraph sx = {{margin: '0'}}>
                                <a href="/">{props.post.username}</a> {props.post.title}
                            </Typography>
                        </CardContent>
                    </Collapse>
                }
                <CardContent sx = {{padding : '0px', marginBottom: '0px'}}>
                    <Box>
                        <Box sx={{paddingLeft: '16px'}}>
                            <PostInModal 
                                addComment = {props.addComment} 
                                setLike = {props.setLike} 
                                comments = {props.post.comments} 
                                post = {props.post}
                                deletePost = {props.deletePost}
                                savedPost = {props.savedPost}
                                setSave = {props.setSave}
                                customStyle = {{
                                    padding: '0'
                                }}
                            >
                                Посмотеть комментарии
                            </PostInModal>
                            
                        </Box>
                    </Box>
                    <Typography sx = {{paddingLeft: '16px', paddingBottom: '8px', color: 'gray'}} fontSize = '10px'>
                        21 ЧАСОВ НАЗАД
                    </Typography>
                    <Divider />
                    <form>
                        <Grid
                            alignItems="center"
                            container
                            direction="row"
                            justifyContent="space-between"
                            sx = {{height: '40px'}}
                        >
                            <TextField 
                                placeholder="Оставить комментарий" 
                                InputProps={{ disableUnderline: true }} 
                                sx = {{width: '430px', paddingLeft: '10px'}} 
                                id="filled-basic"
                                name = "postComment"
                                variant="standard" 
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
                                    onClick = {sendPost}
                                    variant="text"
                                    disabled
                                >   
                                Send
                                </Button>
                            }
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

// disabled