import { FC, useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/auth-info';
import { useDispatch, useSelector } from '../..';

export const UnauthorizedRoute : FC<{path: string, exact: boolean}> = ({ children, ...rest }) => {
    const authorized = useSelector(state => state.authInfo.success);
    const dispatch = useDispatch();
    const [request, setRequest] = useState(false);
    const location = useLocation<{from: string;}>();

    useEffect(() => {
        setRequest(true);
        if (!authorized) {
            requestRefreshToken().then(() => {
                requestGetUser().then( authInfo => {
                    dispatch({type: LOGIN_SUCCESS, authInfo});
                    setRequest(false);
                }).catch( () => {
                    dispatch({type: LOGIN_FAILED});
                    setRequest(false);
                })
            }).catch(() => {
                dispatch({type: LOGIN_FAILED});
                setRequest(false);
            })
        }
// eslint-disable-next-line        
    }, []);

    if (request) {
        return null;
    } else if (!authorized) {
        return (
            <Route {...rest} render={() => ( children )} />
        );
    } else {
        return (<Redirect to={location?.state?.from || '/'} />);
    }

};
