'use client'

import {useSession} from "next-auth/react";
import React from "react";
import {Spinner} from "reactstrap";

export default function SessionStatusWrapper({children}) {
    const {data: session, status} = useSession();

    return (
        <>
            {status === 'loading' ?
                <Spinner/> :
                <>
                    {children}
                </>
            }
        </>
    );
}