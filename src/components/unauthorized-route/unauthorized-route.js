import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/authInfo';

export const UnauthorizedRoute = ({ children, ...rest }) => {
    const authorized = useSelector(state => state.authInfo.success);
    const dispatch = useDispatch();
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

    if (!authorized) {
        return (
            <Route {...rest} render={() => ( children )} />
        );
    } else {
        return (<Redirect to='/' />);
    }

} 