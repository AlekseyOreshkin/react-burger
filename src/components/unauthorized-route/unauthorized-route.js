import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/authInfo';
import PropTypes from 'prop-types';

export const UnauthorizedRoute = ({ children, ...rest }) => {
    const {success: authorized} = useSelector(state => state.authInfo);
    const dispatch = useDispatch();
    const [request, setRequest] = useState(false);
    const location = useLocation();

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

} 

UnauthorizedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
}