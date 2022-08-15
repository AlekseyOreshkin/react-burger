import React from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';
 
const useEscapeKey = (handleClose) => {
    const handleEscKey = React.useCallback((event) => {
    if (event.key === KEY_NAME_ESC) {
      handleClose();
    }
  }, [handleClose]);
 
  React.useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
 
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

export default useEscapeKey;
