import React from "react";
import useSpecdata from "../utils/useSpecdata";
import Card from "./Card";
import { HOME_BANNER } from "../utils/constants";
import ShimmerCard from "./ShimmerCard";

const Home = () => {
  const { specsData, isLoading } = useSpecdata();
  // console.log(specsData);

  return (
    <div>
      <img src={HOME_BANNER} alt="banner" className="banner" />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        {isLoading ? (
          <ShimmerCard />
        ) : (
          specsData.map((specData, idx) => (
            <div className="col" key={`${specData?.id}${idx}`}>
              <Card specData={specData} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
