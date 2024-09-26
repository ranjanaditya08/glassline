import { useEffect, useState } from "react"


const useSpecdata = () => {
    const [specsData, setSpecsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    },[])

    console.log(specsData);
    
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const data = await fetch("http://localhost:8080/Servelets-demo/data");
            const dataJson = await data.json();
            setSpecsData(dataJson);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    
    return {specsData, isLoading};
}

export default useSpecdata