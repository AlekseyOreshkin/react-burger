import { FC, useMemo }  from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  path: string;
}
export const Route : FC<IProps> = ({children, path}) => {
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