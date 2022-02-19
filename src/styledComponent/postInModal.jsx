import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, IconButton } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: 0,
    
    [theme.breakpoints.up(1000)]: {
        height: 700,
    },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: 0,
    borderRadius: '15px',
    overflowX: 'heddien',
    [theme.breakpoints.up(1000)]: {
        height: 700,
    },
    [theme.breakpoints.down(1000)]: {
        width: '900px'
    },
    [theme.breakpoints.down(900)]: {
        width: '800px'
    },
    [theme.breakpoints.down(800)]: {
        width: '700px'
    },
    [theme.breakpoints.down(700)]: {
        width: '600px'
    },
    [theme.breakpoints.down(600)]: {
        width: '500px'
    },
    [theme.breakpoints.down(500)]: {
        width: '400px'
    },
}));

export const StyledCardWrapper = styled(Box)(({ theme }) => ({
    display: 'flex', 
    justifyContent: 'start', 
    alignItems: 'center', 
    height: '100%',
    [theme.breakpoints.down(1000)]: {
        flexDirection: 'column',
        overflowY: 'auto',
        width: '100%'
    },
}))

export const StyledCardMediaWrapper = styled(Box)(({ theme }) => ({
    maxwidth: '600px', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    backgroundColor: 'black',
    [theme.breakpoints.up(1000)]: {
        width: '600px',
    },
    [theme.breakpoints.down(1000)]: {
        width: '100%',
    },
}))

export const StyledCommentWrapper = styled(Box)(({ theme }) => ({
    justifyContent: 'space-between', 
    alignItems: 'center',
    [theme.breakpoints.up(1000)]: {
        height: '490px',
    },
}))

export const StyleExitButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '-3%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    [theme.breakpoints.down(1000)]: {
        top: '3%',
    },
}))

export const StyldCardContentWrapper = styled(Box)(({ theme }) => ({
    maxwidth: '900px',
    width: '100%',
    height: '100%', 
    display: 'inline-block',
    [theme.breakpoints.up(1000)]: {
        width: '400px',
    },
}))