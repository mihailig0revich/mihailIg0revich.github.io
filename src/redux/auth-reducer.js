import { api } from "../api/api"

const SET_AUTH_USER = 'auth-reducer/SET_AUTH_USER'
const SET_ERROR = 'profile-reducer/SET_ERROR'
const LOGOUT_USER = 'auth-reducer/LOGOUT_USER'
const GET_ALL_USERS = 'profile-reducer/GET_ALL_USERS';
const DELETE_SUBSCRIPTIONS = 'profile-reducer/DELETE_SUBSCRIPTIONS';
const DELETE_SUBSCRIBERS = 'profile-reducer/DELETE_SUBSCRIBERS';
const ADD_SUBSCRIPTION = 'profile-reducer/ADD_SUBSCRIPTION';
const SAVED_POST = 'profile-reducer/SAVED_POST';
const DELETE_POST = 'profile-reducer/DELETE_POST';
const SET_LOADING = 'profile-reducer/SET_LOADING';


const initialState = {
    isAuth: false,
    error: false,
    user: {
        "id": null,
        "name": "",
        "username": "",
        "email": "",
        "address": {},
        "phone": "",
        "website": "",
        "company": {}
    },
    subscriptions: [],
    subscribers: [],
    savedPosts: [],
    isLoading: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
                return {
                    ...state,
                    ...action.user
                }
        case LOGOUT_USER:
                return {
                    ...state,
                    ...action.user
                }
        case GET_ALL_USERS:
            return {
                ...state,
                subscribers: action.users.filter((item) => {
                    if (item.username !== state.user.username) return true;
                    return false;
                }),
                subscriptions: action.users.filter((item) => {
                    if (item.username !== state.user.username) return true;
                    return false;
                })
            }
        case DELETE_SUBSCRIBERS:
            return {
                ...state,
                subscribers: state.subscribers.filter((item) => {
                    if (item.username !== action.username) return true;
                    return false;
                }),
                
            }
        case DELETE_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: state.subscriptions.filter((item) => {
                    if (item.username !== action.username) return true;
                    return false;
                })
            }
        case ADD_SUBSCRIPTION:
            return {
                ...state,
                subscriptions: [...state.subscriptions, {username: action.username}]
            }
        case SAVED_POST:
            
            return {
                ...state,
                savedPosts: [...state.savedPosts, {...action.post, savedPost: true, type: 'saved'}]
            }
        case DELETE_POST:
            return {
                ...state,
                savedPosts: state.savedPosts.filter((item) => {
                    
                    if (item.postId !== action.id) return true;
                    return false;
                })
            }
        case SET_ERROR: 
            return {
                ...state,
                error: action.error
            }
        case SET_LOADING: 
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}

const setAuthUser = (isAuth, user) => {
    return {
        type: 'auth-reducer/SET_AUTH_USER',
        user: {
            isAuth,
            error: null,
            user,
        }
    }
}

const logoutUser = () => {
    return {
        type: 'auth-reducer/LOGOUT_USER',
        user: {
            isAuth: false,
            error: null,
            user: {
                "id": null,
                "name": "",
                "username": "",
                "email": "",
                "address": {},
                "phone": "",
                "website": "",
                "company": {}
            }
        },
    }
}

const getAllUser = (users) => {
    return {
        type: 'profile-reducer/GET_ALL_USERS',
        users
    }
}

export const deleteSubscribers = (username) => {
    return {
        type: 'profile-reducer/DELETE_SUBSCRIBERS',
        username
    }
}

export const deleteSubscriptions = (username) => {
    return {
        type: 'profile-reducer/DELETE_SUBSCRIPTIONS',
        username
    }
}

export const addSubscription = (username) => {
    return {
        type: 'profile-reducer/SUBSCRIPTION',
        username
    }
}

export const savedPost = (post) => {
    return {
        type: 'profile-reducer/SAVED_POST',
        post
    }
}

export const deletePost = (id) => {
    return {
        type: 'profile-reducer/DELETE_POST',
        id
    }
}

export const setError = (error) => {
    return {
        type: 'profile-reducer/SET_ERROR',
        error
    }
}

export const setLoading = (isLoading) => {
    return {
        type: 'profile-reducer/SET_LOADING',
        isLoading
    }
}

export const getMeThunk = (login) => {
    return async (dispatch) => {
        dispatch(setError(false))
        
        try {
            const response = await api.login(login);

            if (response.data.length !== 0) {
                dispatch(setAuthUser(true, response.data[0]))
            }
        } catch (err) {
            
            dispatch(setError(true))
        }
    }
}

export const loginThunk = (login) => {
    return async (dispatch) => {
            dispatch(setError(false))
            dispatch(setLoading(true))
        
        try {
            const response = await api.login(login);
            
            if (response.data.length !== 0) {
                dispatch(getMeThunk(login))
                localStorage.setItem('LOCAL_SAFE_AUTH', login);
                dispatch(AllUserThink())
                
            }
        } catch (err) {
            dispatch(setError(true))
        }
        dispatch(setLoading(false))
    }
}

export const logoutThunk = () => {
    return async (dispatch) => {
        dispatch(logoutUser())
        localStorage.removeItem('LOCAL_SAFE_AUTH');
    }
}

export const AllUserThink = () => {
    return async (dispatch) => {
        dispatch(setError(false))
        
        try {
            const responseAllUser = await api.getAllUsers();
        
            if (responseAllUser.data.length !== 0) {
                dispatch(getAllUser(responseAllUser.data));
            }
        } catch (error) {
            dispatch(setError(true))
        }
    }
}

export default authReducer;