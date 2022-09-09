import React, { useMemo }  from 'react';
import { useLocation } from 'react-router-dom';

export const Route = ({children, path}) => {
    const {pathname} = useLocation();
    const current = useMemo(() => {
      return pathname.toLocaleLowerCase() === path.toLocaleLowerCase();
    }, [pathname, path]);
    if (!current) {
      return null;
    } else {
      return (<>
          {children}
        </>);
    }
  };