import { useEffect, useState } from "react";

const useSpecdata = () => {
  const [specsData, setSpecsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const responseAdmin = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseSpecs = await fetch("http://localhost:8080/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (responseAdmin.ok && responseSpecs.ok) {
        const adminData = await responseAdmin.json();
        const specsData = await responseSpecs.json();

        const mergedData = [...adminData, ...specsData];
        setSpecsData(mergedData);
      } else {
        console.error(
          "Failed to fetch data. Admin status:",
          responseAdmin.status,
          "Specs status:",
          responseSpecs.status
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { specsData, isLoading };
};

export default useSpecdata;
