import React, { useRef } from 'react'
import Post from './Post'
import loader from './loading.gif'
import { useObserver } from '../customHooks/useOserver'

let Feed = (props) => {

    const lastElement = useRef()
    
    useObserver(lastElement, props.page <= props.totalPageCount, props.isPostsLoading, props.getPostsThink, props.page);

    let postsArray = props.posts.map((item) => {
        return (
            <Post 
                key = {item.postId}
                addComment = {props.addComment} 
                setLike = {props.setLike} 
                post = {item}
                deletePost = {props.deletePost}
                savedPost = {props.savedPost}
                setSave = {props.setSave}
            />
        )
    })
    
    return (
        <React.Fragment>
            {postsArray}
            <img ref = {lastElement} style = {{width: '100px'}} src={loader} alt=" " />
        </React.Fragment>
    )
}

export default Feed;