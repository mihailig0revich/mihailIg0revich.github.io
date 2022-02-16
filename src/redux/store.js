import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import profileReducer from './profile-reducer';
import feedReducer from './feed-reducer';
import settingsReducer from './settings-reducer';
import authReducer from './auth-reducer';
import postPageReducer from './postPage-reducer';
import thunk from 'redux-thunk';

let reducer = combineReducers({
    profilePage: profileReducer,
    feedPage: feedReducer,
    settingsPage: settingsReducer,
    authReducer: authReducer,
    postPage: postPageReducer
})

let store = createStore(reducer, applyMiddleware(thunk));

export default store;