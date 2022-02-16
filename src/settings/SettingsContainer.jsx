import { connect } from 'react-redux'
import Settings from './Settings'
import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { changeSettings } from '../redux/settings-reducer';
import NoInternetError from '../common/NoInternetError';

const SettingAPIContainer = (props) => {
    useEffect(() => {
        document.title = 'Редактрование профиля'
    }, [])

    if (props.error) return <NoInternetError/>

    return (
        <Settings
            settingsPage = {props.settingsPage}
            changeSettings = {props.changeSettings}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        settingsPage: state.settingsPage,
        error: state.authReducer.error,

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeSettings (settings, settingsName) {
            dispatch(changeSettings(settings, settingsName))
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(SettingAPIContainer);