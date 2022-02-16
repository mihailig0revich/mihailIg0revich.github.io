import { Box } from "@mui/material";
import { chunkArray } from "../scripts/scripts";
import PostingModal from './PostInModal'
import loader from './loading.svg';

const Posts = (props) => {
    return(
        <Box>
            {chunkArray(props.posts).map((item, index) => {
                return (
                    <Box 
                        key = {index}
                        sx = {{
                            width: '100%', 
                            marginTop: {xs: '0', sm: '0', md: '20px'},
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        {
                            item.map((item) => {
                                return (
                                    <PostingModal 
                                    item = {item}
                                    key = {item.id}
                                    addComment = {props.addComment} 
                                    setLike = {props.setLike} 
                                    comments = {item.comments} 
                                    post = {item} 
                                    savedPost = {props.savedPost}
                                    deletePost = {props.deletePost}
                                    setSave = {props.setSave}
                                    />
                                )
                            })
                        }
                    </Box>
                )
            })}
            <img ref = {props.lastElement} style = {props.customStyle} src={loader} alt=" " />
        </Box>
    )
}

export default Posts