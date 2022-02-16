import './App.css';
import Navigation from './navigation/Navigation'
import FeedContainer from './feed/FeedContainer';
import {Grid } from '@mui/material';
import {Route, Switch, withRouter} from "react-router-dom"
import React, { Suspense } from 'react';
import ProfileContainer from './profile/ProfileContainer';
import SettingsContainer from './settings/SettingsContainer';
import Login from './login/Login';
import { AuthContext } from './context/authContext';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ScrollToTop from './ScrollToTop';
import PostPage from './post/PostPage';
import AddPost from './addPost/AddPost.jsx';

class App extends React.Component {
  render () {
    return (
      <ScrollToTop>
        <AuthContext.Provider 
          value = {{
            isAuth: this.props.isAuth,

          }} 
        >
        <Navigation/>
        <Grid
            sx = {{pt: '10px', width: '100%', height: '100%'}}
            alignItems="start"
            justifyContent="center"
            container
            direction="row" 
          >
            
              <Switch>
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/accounts/:settings' component = {SettingsContainer} />
                <Route exact path = '/create' component = {AddPost} />
                <Route exact path = '/post/:postId' component = {PostPage} />
                <Route exact path = '/:username/:tag' component = {ProfileContainer} />
                <Route exact path = '/' component = {FeedContainer} /> 
              </Switch>
            
        </Grid>
      </AuthContext.Provider>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    error: state.authReducer.i
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(App);
