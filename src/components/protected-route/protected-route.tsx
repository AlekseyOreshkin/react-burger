import { FC, useEffect, useState } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/auth-info';
import { useDispatch, useSelector } from '../..';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const authorized = useSelector(state => state.authInfo.success);
    const location = useLocation();
    const dispatch = useDispatch();
    const [request, setRequest] = useState(false);

    useEffect(() => {
        if (!authorized) {
            requestRefreshToken().then(() => {
                requestGetUser().then(authInfo => {
                    dispatch({ type: LOGIN_SUCCESS, authInfo });
                }).catch(() => {
                    dispatch({ type: LOGIN_FAILED });
                    setRequest(false);
                })
            }).catch(() => {
                dispatch({ type: LOGIN_FAILED });
            })
        };
        // eslint-disable-next-line        
    }, []);

    if (request) {
        return null;
    } else if (authorized) {
        return (
            <Route {...rest} render={() => (children)} />
        );
    } else {
        return (<Redirect to={{ pathname: "/login", state: { from: location } }} />);
    }

} 
