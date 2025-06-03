'use client'

import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row, Spinner} from "reactstrap";
import {useTestActions} from "@/contexts/testContext";
import testAction from "@/core/testAction";
import {FiEdit2} from "react-icons/fi";
import {BsEraser} from "react-icons/bs";
import listAction from "@/core/listAction";
import {useListActions} from "@/contexts/listActionContext";
import AllUserDialogs from "@/elements/User/AllUserDialogs";

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
        name: "Options",
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();
            return (
                <>
                    <Button className="btn btn-light me-3" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <FiEdit2 />
                    </Button>
                    <Button className="btn btn-light me-3" onClick={() => {
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
            {data && <DataTable data={data.users}
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
            <AllUserDialogs />
        </>
    );
}