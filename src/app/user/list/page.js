'use client'

import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Progress, Spinner} from "reactstrap";

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
    }
]

export default function UserList(){
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {getData, loading, data} = useListData(`user/get-user-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    // iznad stavljamo `pageNumber-1` jer na FE pocinje paginacija od 1 a na BE pocinje od 0, moramo da ih uskladimo


    // Ovo se prvo ucitava kada refreshujemo stranicu i uzima podatke iz get metode sa axiosom iz bekenda
    useEffect(()=>{
        getData(`user/get-user-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
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
        </>
    );
}