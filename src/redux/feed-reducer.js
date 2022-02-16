import { api } from '../api/api';
import { setError } from './auth-reducer';

const GET_POSTS = 'feed-reducer/GET_POSTS';
const ITERATION_PAGE = 'feed-reducer/ITERATION_PAGE';
const SET_PAGE = 'feed-reducer/SET_PAGE';
const SET_POSTS_LOADING = 'feed-reducer/SET_POSTS_LOADING';
const SET_LIKE = 'feed-reducer/SET_LIKE';
const ADD_COMMENT = 'feed-reducer/ADD_COMMENT';
const SET_SAVE = 'feed-reducer/SET_SAVE';


let initialState = {
    page: 1,
    posts: [],
    isPostsLoading: false,
    totalPageCount: 50,
}

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: state.posts.concat(action.posts),
            }
        case ITERATION_PAGE: 
            return {
                ...state,
                page: ++state.page
            }
        case SET_PAGE: 
            return {
                ...state,
                page: action.page
            }
        case SET_POSTS_LOADING:
            return {
                ...state,
                isPostsLoading: action.isPostsLoading
            }
        case SET_LIKE:
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item.postId === action.postId) {
                        item.like = !item.like;
                        if (item.like) {
                            item.likeCount++;
                            return item;
                        }
                        item.likeCount--;
                        return item;
                    }
                    return item;
                })
            }
        case SET_SAVE:
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item.postId === action.postId) {
                        item.savedPost = !item.savedPost;
                        return item;
                    }
                    return item;
                })
            }
        case ADD_COMMENT:
            
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item.postId === action.postId) {
                        item.comments.push({'body': action.comment})
                        return item;
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}

const getPosts = (posts) => {
    return {
        type: 'feed-reducer/GET_POSTS',
        posts
    }
}

export const iteratonPage = () => {
    return {
        type: 'feed-reducer/ITERATION_PAGE'
    }
}

export const setPage = (page) => {
    return {
        type: 'feed-reducer/SET_PAGE',
        page
    }
}

export const setPostsLoading = (isPostsLoading) => {
    return {
        type: 'feed-reducer/SET_POSTS_LOADING',
        isPostsLoading
    }
}

export const setLike = (postId) => {
    return {
        type: 'feed-reducer/SET_LIKE',
        postId,
    }
}

export const setSave = (postId) => {
    return {
        type: 'feed-reducer/SET_SAVE',
        postId,
    }
}

export const addComment = (comment, postId) => {
    return {
        type: 'feed-reducer/ADD_COMMENT',
        comment,
        postId,
    }
}


export const getPostsThink = (page) => { // Получает 10 постов, по одному от каждого пользователя
    return async (dispatch) => {
        dispatch(setError(false))
        dispatch(setPostsLoading(true))
        try {
            const responseUsers = await api.getAllUsers();
        
            const posts = responseUsers.data.map(async (item, index) => {
            const count = page + index*50;

            const responsePhoto = await api.getPhoto(count);
            const responseComments = await api.getComments(index)

            return {
                postId: responsePhoto.data[0].id,
                albumId: item.id,
                username: item.username,
                url: responsePhoto.data[0].url,
                title: responsePhoto.data[0].title,
                comments: responseComments.data,
                liked: false,
                likeCount: 0,
                savedPost: false,
            }
        })

        Promise.all(posts)
            .then(reponse => {
                if (reponse.length !== 0) {
                    dispatch(getPosts(reponse));
                    dispatch(iteratonPage())
                    dispatch(setPostsLoading(false))
                }
            })
        } catch (error) {
            dispatch(setError(true))
        }
    }
}

export default feedReducer;