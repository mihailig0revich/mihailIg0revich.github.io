import { useEffect } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import LoaderPage from "../common/LoaderPage"
import { loginThunk } from "../redux/auth-reducer"

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        error: state.authReducer.error,
        isLoading: state.authReducer.isLoading
    }
}

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        useEffect(() => {
            if(localStorage.getItem('LOCAL_SAFE_AUTH') && props.isAuth === false) {
                props.loginThunk(localStorage.getItem('LOCAL_SAFE_AUTH'))
            }
        }, [props.isAuth])

        if (!(localStorage.getItem('LOCAL_SAFE_AUTH')) && !props.isAuth) return <Redirect to = '/login'/>

        if (props.isLoading || !props.isAuth) return <LoaderPage/>;

        return <Component {...props}/>
        
    }

    return connect(mapStateToProps, {loginThunk})(RedirectComponent)
}