'use client'

import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Spinner
} from "reactstrap";
import {FiEdit2} from "react-icons/fi";
import {BsEraser} from "react-icons/bs";
import listAction from "@/core/listAction";
import {useListActions} from "@/contexts/listActionContext";
import AllUserDialogs from "@/elements/User/AllUserDialogs";
import {IoAddCircleOutline} from "react-icons/io5";

export const tableColumns = [
    {
        name: "First Name",
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: "Last Name",
        selector: (row) => `${row.lastName}`,
        sortable: false
    },
    {
        name: "Contact Number",
        selector: (row) => `${row.contactNumber}`,
        sortable: false
    },
    {
        name: "Options",
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-success me-3" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <FiEdit2 />
                    </Button>
                    <Button className="btn btn-danger me-3" onClick={() => {
                        dispatch({
                            type: listAction.DELETE,
                            payload: row
                        })
                    }}>
                        <BsEraser />
                    </Button>
                </>
            );
        },
        sortable: false
    }
]

export default function UserList(){
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state, dispatch} = useListActions();


    // iznad stavljamo `pageNumber-1` jer na FE pocinje paginacija od 1 a na BE pocinje od 0, moramo da ih uskladimo
    const {
        getData,
        loading,
        data
    } = useListData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);



    // Ovo se prvo ucitava kada refreshujemo stranicu i uzima podatke iz get metode sa axiosom iz bekenda
    useEffect(()=>{
        getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(()=>{
        if(state.reload){
            getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
        }
    }, [state]);

    //Sa svakom promenom jedne od ove dve funkcije, refreshuje se page, i dolazi do promene URL-a
    // A ako se URL menja, ponovo se poziva useEffect i samim tim getData(), pa dobijamo
    // nove podatke, tj napravi se novi poziv ka bekendu i dobijamo update u tabeli sa korisnicima

        // Sledeca / Prethodna stranica
        const handlePageChange = async (page)=> {
            setPageNumber(page);
        }

        // Broj redova po jednoj stranici
        const handlePerRowsChange = async (newPerPage, page) => {
            setPageNumber(page);
            setPageSize(newPerPage);
        }

    return (
        <>
            <Card>
                <CardHeader className="d-flex justify-content-end">
                    <button onClick={() => {}}>Sign in</button>
                    <Button className="btn btn-success me-3" onClick={() => {
                        dispatch({
                            type: listAction.CREATE
                        })
                    }}>
                        Create User
                    </Button>
                </CardHeader>
                <CardBody>
                    {data != null && <DataTable data={data.users}
                                        columns={tableColumns}
                                        striped={true}
                                        noHeader={true}
                                        pagination
                                        paginationServer
                                        progressPending={loading}
                                        paginationTotalRows={data.totalElements}
                                        onChangePage={handlePageChange}
                                        onChangeRowsPerPage={handlePerRowsChange}
                                        progressComponent={<Spinner color="danger"> Ocitavanje...</Spinner>}
                                        highlightOnHover
                    />}
                </CardBody>
            </Card>

            <AllUserDialogs />
        </>
    );
}