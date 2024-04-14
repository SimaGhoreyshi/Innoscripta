import { useEffect, useState } from "react";

import "./feed.scss";
import { Loading, Card, Importants, Navigator, Filter } from "../components";
import { useGuardian, useNewsapi, useNyt } from "../services";

export const Feed = () => {
  const [nytResult, nytIsLoading, nytError] = useNyt();
  const [guardianResult, guardianIsLoading, guardianError] = useGuardian();
  const [newsapiResult, newsapiIsLoading, newsapiError] = useNewsapi();
  const [combined, setCombined] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const combinedTemp = [
      ...nytResult,
      ...guardianResult,
      ...newsapiResult,
    ].filter((value) => value.author.length);

    setCombined(combinedTemp);
    setData(combinedTemp.sort((a, b) => a.date < b.date));
  }, [nytResult, guardianResult, newsapiResult]);

  if (nytIsLoading || guardianIsLoading || newsapiIsLoading || !data)
    return <Loading />;
  return (
    <>
      <div className="feed">
        <Navigator data={data} setData={setData} combined={combined} />
        <Filter data={data} setData={setData} combined={combined} />
        {data?.length !== 0 ? (
          <>
            <Importants newest={data?.slice(0, 3)} />
            <div className="cards">
              {data?.slice(3)?.map((item, index) => (
                <Card data={item} key={"item" + index} />
              ))}
            </div>
          </>
        ) : (
          `You haven't chosen a favorite in this field yet!`
        )}
      </div>
    </>
  );
};
