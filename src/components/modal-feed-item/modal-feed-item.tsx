import { useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

export const ModalFeedItem = () => {
    const location=useLocation<{from: string;}>();
    const [show, setShow] = useState(true);
    const onHideDetails = useCallback( () => {
        setShow(false);
    }, [setShow]);
    if (!show) {
      return (<Redirect to={location?.state?.from || '/feed'} />);
    }
    return (
    <div >
        <Modal  headerText=' '  isShowing={show} toggle={onHideDetails}>
            <OrderDetails />
        </Modal>
    </div>
    );
};