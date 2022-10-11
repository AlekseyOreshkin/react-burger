import { useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

export const ModalFeedItem = () => {
    const location=useLocation();
    const [show, setShow] = useState(true);
    const onHideDetails = useCallback( () => {
        setShow(false);
    }, [setShow]);
    if (!show) {
        /* @ts-ignore */
      return (<Redirect to={location.state?.background?.pathname} />);
    }
    return (
    <div >
        <Modal  headerText=' '  isShowing={show} toggle={onHideDetails}>
            <OrderDetails />
        </Modal>
    </div>
    );
};