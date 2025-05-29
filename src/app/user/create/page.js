'use client'            // sva logika se radi na strani klijenta

import Link from "next/link";
import {useEffect, useState} from "react";
import {get} from "@/core/httpClient";


export default function UserCreate() {
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [podatak, setPodatak] = useState();


    const getFirstName = async () => {
        setLoading(true);

        let result = await get("/user/get-first-name");

        setData(result.data);
        setLoading(false);
    }
 
    // obrisi, ja sam dodao
    const getFirstNameList = async () => {
        setLoading(true);

        let rezultat = await get("/user/get-first-name-list");

        console.log(rezultat.data);
        setPodatak(rezultat.data);
        setLoading(false);
    }


    // useEffect je nesto sto se pokrece prvo na stranici => react
    useEffect(() => {
        getFirstName();
        getFirstNameList();
    }, [counter]);

    return (
        <>
            {loading === true ? <h1>Loading...</h1> : (
                <>
                    <h1>{data}</h1>
                    <br/>
                    <h1>{podatak}</h1>
                    {/*<h1>{counter}</h1>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}

                    {/*<button onClick={() => {*/}
                    {/*    setCounter(counter + 1);*/}
                    {/*}}>Add +1</button>*/}

                    {/*<h1>USER CREATE PAGE!</h1>*/}
                    {/*<h2>USER CREATE PAGE2 HAHAHA!</h2>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<Link href="/user/list">Go to user list page</Link>*/}
                </>
            )}
        </>
    );


}