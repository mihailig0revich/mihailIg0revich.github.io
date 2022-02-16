import { api } from "../api/api";
import { setError } from "./auth-reducer";

const GET_POST = 'postPage-reducer/GET_POST';
const SET_LIKE = 'postPage-reducer/SET_LIKE';
const ADD_COMMENT = 'postPage-reducer/ADD_COMMENT';
const DELETE_LIKE = 'postPage-reducer/DELETE_LIKE';
const SET_POST_IS_LOADING = 'postPage-reducer/SET_POST_IS_LOADING';

const initialState = {
    comments: [],
    postIsLoading: true,
}

const postPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                ...action.post
            }
        case SET_LIKE:
            return {
                ...state,
                liked: true,
                likeCount: ++state.likeCount,
            }
        case DELETE_LIKE:
            return {
                ...state,
                liked: false,
                likeCount: --state.likeCount,
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, {body: action.comment}],
            }
        case SET_POST_IS_LOADING: 
            return {
                ...state,
                postIsLoading: action.postIsLoading
            }
        default: 
            return state;
    }
}

const getPost = (post) => {
    return {
        type: 'postPage-reducer/GET_POST',
        post
    }
}

const postIsLoading = (postIsLoading) => {
    return {
        type: 'postPage-reducer/SET_POST_IS_LOADING',
        postIsLoading
    }
}

export const setLike = () => {
    return {
        type: 'postPage-reducer/SET_LIKE',
    }
}

export const deleteLike = () => {
    return {
        type: 'postPage-reducer/DELETE_LIKE',
    }
}

export const addComment = (comment) => {
    return {
        type: 'postPage-reducer/ADD_COMMENT',
        comment,
    }
}

export const getPostThunk = (postId) => {
    return async (dispatch) => {
        dispatch(postIsLoading(true))
        dispatch(setError(false))
        try {
            const postResponse = await api.getPhoto(postId);
            const userResponce = await api.getUserById(postResponse.data[0].albumId);
            const commentsResponce = await api.getComments(1);

            const canCraetePost = postResponse.data.lenght !== 0 && userResponce.data.lenght !== 0 && commentsResponce.data.lenght !== 0;
            
            if (canCraetePost) {
                dispatch(getPost({
                        username: userResponce.data[0].username,
                        id: postResponse.data[0].id,
                        url: postResponse.data[0].url,
                        title: postResponse.data[0].title,
                        comments: [...commentsResponce.data],
                        liked: false,
                        likeCount: 0,
                        savedPost: false,
                    }
                ))
            }
            dispatch(postIsLoading(false))
        } catch (error) {
            dispatch(setError(true))
        }
    }
}

export default postPageReducer;