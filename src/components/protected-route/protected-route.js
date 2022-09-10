import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/authInfo';

export const ProtectedRoute = ({ children, ...rest }) => {
    const authorized = useSelector(state => state.authInfo.success);
    useEffect(() => {
        if (!authorized) {
            requestRefreshToken().then(() => {
                requestGetUser().then( authInfo => {
                    dispatch({type: LOGIN_SUCCESS, authInfo});
                })
            }).catch(() => {
                dispatch({type: LOGIN_FAILED});
            })
        }
// eslint-disable-next-line        
    }, []);
    
    const dispatch = useDispatch();
    if (authorized) {
        return (
            <Route {...rest} render={() => ( children )} />
        );
    } else {
        return (<Redirect to='/login' />)
    }

} 