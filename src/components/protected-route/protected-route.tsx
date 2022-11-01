import { FC, useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/auth-info';
import { useDispatch, useSelector } from '../..';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    
    const {request, success} = useSelector(state => state.authInfo);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!success) {
            requestRefreshToken().then(() => {
                requestGetUser().then(authInfo => {
                    dispatch({ type: LOGIN_SUCCESS, authInfo });
                }).catch(() => {
                    dispatch({ type: LOGIN_FAILED });
                })
            }).catch(() => {
                dispatch({ type: LOGIN_FAILED });
            })
        };
        // eslint-disable-next-line        
    }, []);

    if (request) {
        return null;
    } else if (success) {
        return (
            <Route {...rest} render={() => (children)} />
        );
    } else {
        return (<Redirect to={{ pathname: "/login", state: { from: location } }} />);
    }

} 
