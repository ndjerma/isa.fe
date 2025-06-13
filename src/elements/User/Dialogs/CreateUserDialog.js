import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {post} from "@/core/httpClient";
import {toast} from "react-toastify";

const CreateUserDialog = ({isOpen}) => {

    const {dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    })

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm({
        mode: "onSubmit"
    });

    return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <Col md={6} className="mb-1">
                            <input type="text" className="form-control form-control-sm" placeholder="First Name" {...register("firstName", {
                                required: "First name is required.",
                                maxLength: 50,
                                minLength: 3,
                            })} />
                            {errors && errors.firstName && (
                                <span className="text-danger">{errors.firstName.message}</span>
                            )}
                        </Col>
                        <Col md={6}>
                            <input type="text" className="form-control form-control-sm" placeholder="Last Name" {...register("lastName", {
                                required: "Last name is required.",
                                maxLength: 50,
                                minLength: 3
                            })} />
                            {errors && errors.lastName && (
                                <span className="text-danger">{errors.lastName.message}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} className="mb-1">
                            <input type="email" className="form-control form-control-sm" placeholder="Email" {...register("email", {
                                required: "Email is required.",
                            })} />
                            {errors && errors.email && (
                                <span className="text-danger">{errors.email.message}</span>
                            )}
                        </Col>
                        <Col md={6}>
                            <input type="text" className="form-control form-control-sm" placeholder="Contact Number" {...register("contactNumber", {
                                required: "Contact number is required.",
                                maxLength: 15,
                                minLength: 9,
                                validate: (value) => {
                                    if (!/^[0-9]*$/.test(value)) {
                                        return "Only numbers are allowed.";
                                    }
                                }
                            })} />
                            {errors && errors.contactNumber && (
                                <span className="text-danger">{errors.contactNumber.message}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} className="mb-1">
                            <input type="password" className="form-control form-control-sm" placeholder="Password" {...register("password", {
                                required: "Password is required.",
                            })} />
                            {errors && errors.password && (
                                <span className="text-danger">{errors.password.message}</span>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-success" type="button" onClick={() => {
                        handleSubmit(async (data) => {
                            let result = await post("/user/create", data);
                            if(result && result.status === 200){
                                toast.success('Successfully created user!');
                                dispatch({
                                    type: listAction.RELOAD
                                });
                            }
                        })();
                    }}>
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    );
}

export default CreateUserDialog;