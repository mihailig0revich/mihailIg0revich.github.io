import { api } from '../api/api';
import { setError } from './auth-reducer';

const GET_USER = 'profile-reducer/GET_USER';
const GET_ALBUM = 'profile-reducer/GET_ALBUM';
const ITERATION_PAGE = 'profile-reducer/ITERATION_PAGE';
const SET_PAGE = 'profile-reducer/SET_PAGE';
const IS_PAGE_LOADING = 'profile-reducer/IS_PAGE_LOADING';
const TOTAL_POSTS_COUNT = 'profile-reducer/TOTAL_POSTS_COUNT';
const SET_LIKE = 'profile-reducer/SET_LIKE';
const ADD_COMMENT = 'profile-reducer/ADD_COMMENT';
const IS_USER_LOADING = 'profile-reducer/IS_USER_LOADING';
const SET_SAVE = 'profile-reducer/SET_SAVE';

let initialState = {
    user : {
        "id": null,
        "name": "",
        "username": "",
        "email": "",
        "address": {},
        "phone": "",
        "website": "",
        "company": {}
    },
    album: [],
    totalPageCount: 10,
    currentPage: 1,
    isPageLoading: false,
    isUserLoading: false,
    totalPostsCount: 0,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.user,
                album: []
            }
        case GET_ALBUM:
            return {
                ...state,
                album: [...state.album, ...action.album]
            }
        case ITERATION_PAGE:
            return {
                ...state,
                currentPage: ++state.currentPage
            }
        case SET_PAGE:
            
            return {
                ...state,
                currentPage: action.page
            }
        case IS_PAGE_LOADING:
            return {
                ...state,
                isPageLoading: action.isPageLoading
            }
        case IS_USER_LOADING:
            return {
                ...state,
                isUserLoading: action.isUserLoading
            }
        case TOTAL_POSTS_COUNT:
            return {
                ...state,
                totalPostsCount: action.totalPostsCount
            }
        case SET_LIKE:
            
            return {
                ...state,
                album: state.album.map((item) => {
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
        case ADD_COMMENT:
            return {
                ...state,
                album: state.album.map((item) => {
                    if (item.postId === action.postId) {
                        item.comments = [...item.comments, {'body': action.comment}]
                        
                        return item;
                    }
                    return item;
                })
            }
        case SET_SAVE:
            return {
                ...state,
                posts: state.album.map((item) => {
                    if (item.postId === action.postId) {
                        item.savedPost = !item.savedPost;
                        return item;
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}

const getUser = (user) => {
    return {
        type: 'profile-reducer/GET_USER',
        user
    }
}

const getAlbum = (album) => {
    return {
        type: 'profile-reducer/GET_ALBUM',
        album
    }
}

const iteratoinPage = () => {
    return {
        type: 'profile-reducer/ITERATION_PAGE',
    }
}

export const setPage = (page) => {
    return {
        type: 'profile-reducer/SET_PAGE',
        page
    }
}

const isPageLoading = (isPageLoading) => {
    return {
        type: 'profile-reducer/IS_PAGE_LOADING',
        isPageLoading
    }
}
const isUserLoading = (isUserLoading) => {
    return {
        type: 'profile-reducer/IS_USER_LOADING',
        isUserLoading
    }
}

const totalPostsCount = (totalPostsCount) => {
    return {
        type: 'profile-reducer/TOTAL_POSTS_COUNT',
        totalPostsCount
    }
}

export const setLike = (postId) => {
    return {
        type: 'profile-reducer/SET_LIKE',
        postId,
    }
}

export const setSave = (postId) => {
    return {
        type: 'profile-reducer/SET_SAVE',
        postId,
    }
}

export const addComment = (comment, postId) => {
    return {
        type: 'profile-reducer/ADD_COMMENT',
        comment,
        postId,
    }
}

export const getAlbumThink = (username, page) => {
    return async (dispatch) => {
        dispatch(setError(false))
        try {
            dispatch(isPageLoading(true))
            
            const responseUser = await api.getUser(username);
            const responseUserAlbum = await api.getUserAlbum(responseUser.data[0].id, page);
            
            if (responseUserAlbum.data.length !== 0) {
                let userAlbumAndComment = responseUserAlbum.data.map((item) => {
                    item.comments = [
                        {"body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et", id: '1'},
                        {"body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in", id: '2'}
                    ];
                    item.like = false;
                    item.likeCount = 0;
                    item.postId = item.id
                    item.username = username;
                    item.username = username;
                    item.savedPost = false;
                    return item
                })
                dispatch(getAlbum(userAlbumAndComment));
                dispatch(iteratoinPage());
                dispatch(totalPostsCount(responseUserAlbum.headers["x-total-count"]))
                dispatch(isPageLoading(false))
            }
        } catch (error) {
            dispatch(setError(true))
        }
    }
}

export const getUserThink = (username, currentPage) => {
    return async (dispatch) => {
        dispatch(isUserLoading(true))
        try {
            dispatch(setError(false))
            const responseUser = await api.getUser(username);
            
            if (responseUser.data.length !== 0) {
                dispatch(setPage(1));
                dispatch(getUser(responseUser.data[0]));
                dispatch(getAlbumThink(username, currentPage));
            }
            
        } catch (error) {
            dispatch(setError(true))
        }
        dispatch(isUserLoading(false));
    }
}

export default profileReducer;