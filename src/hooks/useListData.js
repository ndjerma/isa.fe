import {useCallback, useState} from "react";
import {get} from "@/core/httpClient";

// da li je ovo react hook? Jer moze da menja stanja?
const useListData = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const getData = useCallback(async (url) => {
        setLoading(true);

        let result = await get(url);

        setData(result.data);
        setLoading(false);
    }, [url]);

    return {getData, loading, data};
}

export default useListData;
