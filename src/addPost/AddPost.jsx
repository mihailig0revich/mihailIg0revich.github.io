import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useRef } from "react";
import { compose } from "redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";

const AddPost = (props) => {
    useEffect(() => {
        document.title = 'Создание поста'
    }, [])

    let fileInput = useRef()

    const handleSubmit = () => {
        console.log(fileInput.current.files[0]);
    }

    return (
        <Box 
            sx = {{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box 
                sx = {{
                    width: {xs: '100%'},
                    maxWidth: '500px',
                    border: '1px solid lightgray',
                    borderRadius: '10px',
                    margin: '10px'
                }}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx = {{
                            width: {xs: '150px', sm: '200px'},
                            height: {xs: '150px', sm: '200px'},
                            background: 'gray',
                            margin: '10px',
                            borderRadius: '5px'
                        }}
                    >
                    </Box>
                    <Box
                        sx = {{
                            margin: {sx: '0px', sm: '20px'}
                        }}
                    >
                        <input
                            ref={fileInput}
                            color="primary"
                            accept="image/*"
                            type="file"
                            id="icon-button-file"
                            style={{ display: 'none', }}
                        />
                        <label htmlFor="icon-button-file">
                            <Button
                                
                                component="span"
                                size="large"
                                color="primary"
                            >
                                Выбрать фотографию
                            </Button>
                        </label>
                    </Box>
                </Box>
                <Typography 
                    variant="h6"
                    sx = {{
                        margin: '10px'
                    }}
                >
                    Подпись:
                </Typography>
                <TextField 
                    multiline 
                    rows={4}
                    sx = {{
                        width: '100%',
                        padding: '0 10px'
                    }}
                />
                <Box
                    sx = {{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        padding: '10px'
                    }}
                    
                >
                    <Button onClick={handleSubmit} variant="contained">Опубликовать пост</Button>
                    
                </Box>
            </Box>
        </Box>
    )
}

export default compose(
    withAuthRedirect,
)(AddPost);