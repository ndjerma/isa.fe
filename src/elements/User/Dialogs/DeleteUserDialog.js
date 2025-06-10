import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {del} from "@/core/httpClient";
import {useEffect} from "react";
import {toast} from "react-toastify";

const DeleteUserDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();
    // console.log(state.row);

    const toggle = () => dispatch({
        type: listAction.RESET
    })

    return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Are you sure you want to delete this user?</ModalHeader>
                <ModalBody>
                    <p>Id: {state.row.id}</p>
                    <p>First name: {state.row.firstName}</p>
                    <p>Last name: {state.row.lastName}</p>
                    <p>Email: {state.row.email}</p>
                    <p>Contact number: {state.row.contactNumber}</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-success" type="button" onClick={async () => {
                        await del(`/user/delete?userId=${state.row.id}`);
                        toast.success("User deleted successfully.");
                        dispatch({
                            type: listAction.RELOAD,
                        })
                    }}>
                        Delete user
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    );
}

export default DeleteUserDialog;