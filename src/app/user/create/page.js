'use client'            // sva logika se radi na strani klijenta

import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {options} from "axios";
import {error} from "next/dist/build/output/log";    //ovaj hook ce nam biti glavni baja za forme

// npm install react-hook-form    <=   treba da ga instaliramo


export default function UserCreate() {
    const {register,
        watch,
        handleSubmit,
        formState: {errors}} = useForm({
        mode: "onSubmit"
    });

    return (
        <>
            <Row className="mb-3">
                <Col md={6}>
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
                <Col md={6}>
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
                        minLength: 8,
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
            <Row>
                <Col md={12} className="d-flex justify-content-end">
                    <Button className="btn btn-primary" type="button" onClick={() => {
                        handleSubmit(async (data) => {
                           await post("/user/create-user-body", data);
                        })();    // <= referenca na komentar dole
                    }}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    );
}

/*
            * handleSubmit(...)	Vraća funkciju koja izvršava validaciju forme
            * handleSubmit(...)(...)	Odmah poziva tu funkciju
            * () => { handleSubmit(...)(); }	Arrow funkcija za onClick koja poziva sve to
* */