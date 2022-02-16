import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

let Comment = (props) => {

    return (
        <ListItem sx={{width: '100%', margin: '0', alignItems: "center", justifyContent: 'space-between', padding: '0', paddingLeft: '16px', paddingRight: '16px'}}>
            <Typography
                sx={{ display: "inline-block",}}
                component="span"
                variant="body2"
                color="text.primary"
            >
                <a href="/">{props.comment.userId}</a> {props.comment.comment}
            </Typography>
        </ListItem>
    )
}

export default Comment;