'use client'

import {useSession} from "next-auth/react";
import React from "react";
import {Row, Spinner} from "reactstrap";

export default function SessionStatusWrapper({children}) {
    const {data: session, status} = useSession();

    return (
        <>
            {status === 'loading' ?
                <Row className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
                    <Spinner />
                </Row>
                :
                <>
                    {children}
                </>
            }
        </>
    );
}