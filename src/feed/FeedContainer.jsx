import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import Feed from './Feed'
import { getPostsThink, iteratonPage, setPage, setLike, addComment, setSave } from '../redux/feed-reducer'
import { deletePost, savedPost } from '../redux/auth-reducer';
import NoInternetError from '../common/NoInternetError'

const FeedAPIContainer = (props) => {
    useEffect(() => {
        props.setPage(1)
    }, [])
    useEffect(() => {
        document.title = 'myAlbum'
    }, [])

    if (props.error) return <NoInternetError/>
    
    return (
        <Feed
            posts = {props.posts}
            page = {props.page}
            isPostsLoading = {props.isPostsLoading}
            totalPageCount = {props.totalPageCount}
            getPostsThink = {props.getPostsThink}
            setLike = {props.setLike}
            addComment = {props.addComment}
            deletePost = {props.deletePost}
            savedPost = {props.savedPost}
            setSave = {props.setSave}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.feedPage.posts,
        page: state.feedPage.page,
        isPostsLoading: state.feedPage.isPostsLoading,
        totalPageCount: state.feedPage.totalPageCount,
        error: state.authReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        iteratonPage: () => {
            dispatch(iteratonPage())
        },
        setPage: (page) => {
            dispatch(setPage(page))
        },
        setLike: (postId) => {
            dispatch(setLike(postId))
        },
        setSave: (postId) => {
            dispatch(setSave(postId))
        },
        addComment: (comment, postId) => {
            dispatch(addComment(comment, postId))
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
    connect(null, {getPostsThink}),
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(FeedAPIContainer);