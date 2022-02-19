import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import {getUserThink, setLike, addComment, setPage, setSave} from '../redux/profile-reducer'
import {withRouter} from 'react-router-dom';
import { getAlbumThink } from '../redux/profile-reducer';
import { addSubscription, AllUserThink, deletePost, deleteSubscribers, deleteSubscriptions, savedPost } from '../redux/auth-reducer';
import LoaderPage from '../common/LoaderPage';
import ErrorPage from './ErrorPage';
import NoInternetError from '../common/NoInternetError';
import { AuthContext } from '../context/authContext';

const checkSub = (arr, username) => {
    const index = arr.findIndex((item) => {
        if(item.username === username) return true;
        return false
    })
    if (index >= 0) {
        return true;
    }
    return false;
}

const ProfileAPIContainer = (props) => {
    const {username} = useParams();
    
    useEffect(() => {
        if (!props.isUserLoading) {
            props.getUserThink(username, 1);
        }
    }, [username])

    useEffect(() => {
        document.title = username
    }, [username])
    
    const authContext = useContext(AuthContext)

    const isSub = checkSub(props.subscriptions, username);

    const userMatch = username === props.authUsername;
    
    if (props.error) return <NoInternetError/>
    
    if (props.isUserLoading) return <LoaderPage/>
    
    if (!(props.user.username === username) && authContext.isAuth) return <ErrorPage/>


    return (
        <Profile
            posts = {props.posts}
            user = {props.user}
            tag = {props.match.params.tag}
            userMatch = {userMatch}
            totalPostsCount = {props.totalPostsCount}
            setLike = {props.setLike}
            setSave = {props.setSave}
            addComment = {props.addComment}
            subscribers = {props.subscribers}
            subscriptions = {props.subscriptions}
            deleteSubscriptions = {props.deleteSubscriptions}
            deleteSubscribers = {props.deleteSubscribers}
            addSubscription = {props.addSubscription}
            savedPost = {props.savedPost}
            deletePost = {props.deletePost}
            savedPosts = {props.savedPosts}
            isPageLoading = {props.isPageLoading}
            getAlbumThink = {props.getAlbumThink}
            totalPageCount = {props.totalPageCount}
            currentPage = {props.currentPage}
            isSub = {isSub}
            isUserLoading = {props.isUserLoading}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.album,
        user: state.profilePage.user,
        currentPage: state.profilePage.currentPage,
        isPageLoading: state.profilePage.isPageLoading,
        totalPageCount: state.profilePage.totalPageCount,
        totalPostsCount: state.profilePage.totalPostsCount,
        subscribers: state.authReducer.subscribers,
        subscriptions: state.authReducer.subscriptions,
        authUsername: state.authReducer.user.username,
        isAuth: state.authReducer.isAuth,
        savedPosts: state.authReducer.savedPosts,
        isUserLoading: state.profilePage.isUserLoading,
        error: state.authReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLike: (postId) => {
            dispatch(setLike(postId))
        },
        setSave: (postId) => {
            dispatch(setSave(postId))
        },
        addComment: (comment, postId) => {
            dispatch(addComment(comment, postId))
        },
        deleteSubscribers: (username) => {
            dispatch(deleteSubscribers(username))
        },
        deleteSubscriptions: (username) => {
            dispatch(deleteSubscriptions(username))
        },
        AllUserThink: () => {
            dispatch(AllUserThink())
        },
        addSubscription: (username) => {
            dispatch(addSubscription(username))
        },
        savedPost: (post) => {
            dispatch(savedPost(post))
        },
        deletePost: (id) => {
            dispatch(deletePost(id))
        },
        setPage: (page) => {
            dispatch(setPage(page))
        },
    }
}

export default compose(
    connect(null, {getUserThink, getAlbumThink}),
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(ProfileAPIContainer)