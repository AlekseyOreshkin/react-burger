import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/authInfo';
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children, ...rest }) => {
    const authorized = useSelector(state => state.authInfo.success);
    const history = useHistory();
// eslint-disable-next-line        
const location = useLocation();
    useEffect(() => {
        if (!authorized) {
            requestRefreshToken().then(() => {
                requestGetUser().then( authInfo => {
                    dispatch({type: LOGIN_SUCCESS, authInfo});
                })
            }).catch(() => {
                dispatch({type: LOGIN_FAILED});
            })
        };
        history.location.state = {}
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

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
}