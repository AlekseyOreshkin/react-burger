import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { requestRefreshToken, requestGetUser } from '../../utils/request';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../services/actions/authInfo';
import PropTypes from 'prop-types';

export const UnauthorizedRoute = ({ children, ...rest }) => {
    const {success: authorized} = useSelector(state => state.authInfo);
    const dispatch = useDispatch();
    const [request, setRequest] = useState(false);
// eslint-disable-next-line        
const history = useHistory();

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
        return (<p>Обновляем аворизацию</p>);
    } else if (!authorized) {
        return (
            <Route {...rest} render={() => ( children )} />
        );
    } else {
        return (<Redirect to='/' />);
        // if (history.length > 0) {
        //     history.goBack();
        //     return (<p>Перенаправляем</p>);
        // } else {
        //     return (<Redirect to='/' />);
        // }
        
    }

} 

UnauthorizedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
}