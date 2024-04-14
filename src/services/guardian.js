import { useEffect, useState } from "react";

export const useGuardian = () => {
  const [guardianResult, setResult] = useState([]);
  const [guardianError, setError] = useState();
  const [guardianIsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGuardian();
  }, []);

  async function fetchGuardian() {
    setIsLoading(true);
    await fetch(
      "https://content.guardianapis.com/search?format=json&show-tags=contributor&show-elements=image&api-key=ae9988fa-05b1-4975-b76c-827d18093308"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setError(null);
        setIsLoading(false);
        setResult(
          res.response.results.map((item, index) => ({
            title: item.webTitle,
            date: new Date(item.webPublicationDate),
            author: item.tags
              ?.map((author) => String(author.webTitle).trim())
              .slice(0, 2)
              .join(","),
            source: "Guardian",
            category: String(item.pillarName).toLowerCase(),
            url: item.webUrl,
            image: item.elements[0]?.assets[0]?.file,
          }))
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }

  return [guardianResult, guardianIsLoading, guardianError];
};
