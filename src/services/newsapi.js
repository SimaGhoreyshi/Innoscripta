import { useEffect, useState } from "react";

export const useNewsapi = () => {
  const [newsapiResult, setResult] = useState([]);
  const [newsapiError, setError] = useState();
  const [newsapiIsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNewsapi();
  }, []);

  async function fetchNewsapi() {
    setIsLoading(true);
    await fetch(
      "https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=762e0135fce44e1ead51e9b0ce18f0b2"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setError(null);
        setIsLoading(false);
        setResult(
          res.articles.map((item, index) => ({
            title: item.title,
            date: new Date(item.publishedAt),
            author: item.author
              ? String(item.author).split(",").slice(0, 2).join(",")
              : "",
            source: item.source.name,
            category: "entertainment",
            url: item.url,
            image: item.urlToImage,
          }))
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }

  return [newsapiResult, newsapiIsLoading, newsapiError];
};
