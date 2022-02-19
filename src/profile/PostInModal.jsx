import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonBase, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import useForm from '../customHooks/useFrom';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/material/styles';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { StyledBox, StyledCard, StyledCardWrapper, StyledCardMediaWrapper, StyledCommentWrapper, StyleExitButton, StyldCardContentWrapper } from '../styledComponent/postInModal';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    width: '30%',
    paddingBottom: '30%',
    height: '0',
    margin: '0px 16px',
    '& .TypographyOpacity-root': {
        opacity: 0,
    },
    [theme.breakpoints.down('md')]: {
        width: '33.3%',
        paddingBottom: '33.3%',
        margin: '0px'
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.7,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .TypographyOpacity-root': {
            opacity: 1,
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    
});
    
const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
}));

const initialPostValues = {
    postComment: '',
}

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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
        if (props.post.type !== 'saved') {
            props.setSave(props.post.postId)
        }
        if (props.post.type === 'saved') {
            handleClose()
        }
    }

    const savedPost = () => {
        props.savedPost(props.post)
        props.setSave(props.post.postId)
    }
    return (
        <React.Fragment>
                <ImageButton
                    onClick={handleOpen}
                    focusRipple
                >
                    <ImageSrc 
                        style={{ 
                            backgroundImage: `url(${props.item.url}?w=164&h=164&fit=crop&auto=format)` 
                        }} 
                    />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            className = 'TypographyOpacity-root' 
                            sx = {{
                                display: 'flex', 
                                justifyContent: 'space-around', 
                                alignItems: "center", 
                                width: '100px'
                            }}
                        >
                            <FavoriteIcon 
                                fontSize = 'small'
                            /> 
                            {props.item.likeCount} 
                            <ModeCommentIcon/> 
                            {props.item.comments.length}
                        </Typography>
                    </Image>                                                    
                </ImageButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox>
                    <StyledCard>
                        <StyledCardWrapper>
                            <StyledCardMediaWrapper>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    width = '600px'
                                    image= {props.post.url}
                                    alt="green iguana"
                                />
                            </StyledCardMediaWrapper>
                            <StyldCardContentWrapper>
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
                                                <NavLink style = {{textDecoration: 'none', color: 'black'}} to={`/${props.post.username}/publications`}>{props.post.username}</NavLink>
                                            }
                                        />
                                    </Box>
                                    <Divider/>
                                    <StyledCommentWrapper>
                                        {
                                            props.comments.map((item) => {
                                                return (
                                                    <Box key = {item.id} sx = {{padding: '10px'}}>
                                                        <Box sx={{width: '100%', margin: '0', display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
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
                                                        </Box>
                                                        <Typography sx = {{paddingLeft: '50px', color: 'gray'}} fontSize = '12px'>
                                                            3 ч.
                                                        </Typography>
                                                    </Box>   
                                                )
                                            })
                                        }
                                    </StyledCommentWrapper>
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
                                            <IconButton aria-label="add to favorites" onClick = {() => props.setLike(props.post.postId)}>
                                                {props.post.like 
                                                    ? <FavoriteIcon fontSize = 'medium' color='error'/>
                                                    : <FavoriteBorderIcon fontSize = 'medium' />
                                                }
                                            </IconButton>
                                            <NavLink style = {{textDecoration: 'none'}} to={`/post/${props.post.id}`}>
                                                <IconButton aria-label="share">
                                                    <OpenInNewIcon />
                                                </IconButton>
                                            </NavLink>
                                            
                                        </Box>
                                        {
                                            props.post.savedPost
                                            ?<IconButton onClick = {deletePost} aria-label="share"><BookmarkIcon /></IconButton>                                    
                                            :<IconButton onClick = {savedPost} aria-label="share"><BookmarkBorderIcon/></IconButton>
                                        }
                                        
                                    </Grid>
                                        <Box sx = {{paddingLeft: '10px'}}>
                                            <Typography fontSize = '15px'>
                                                <b>{props.post.likeCount} отметок "Нравится"</b>
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
                            </StyldCardContentWrapper>
                        </StyledCardWrapper>
                    </StyledCard>
                    <StyleExitButton onClick = {handleClose}>
                        <CloseIcon fontSize = 'large' />
                    </StyleExitButton>
                </StyledBox>
            </Modal>
        </React.Fragment>
    );
}