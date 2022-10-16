import { FC } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from '../..';

export const UnauthorizedRoute: FC<{ path: string, exact: boolean }> = ({ children, ...rest }) => {
    const {request, success} = useSelector(state => state.authInfo);
    const location = useLocation<{ from: string; }>();

    if (request) {
        return null;
    } else if (!success) {
        return (
            <Route {...rest} render={() => (children)} />
        );
    } else {
        return (<Redirect to={location?.state?.from || '/'} />);
    }

};
