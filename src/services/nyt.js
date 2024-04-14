import { useEffect, useState } from "react";

export const useNyt = () => {
  const [nytResult, setResult] = useState([]);
  const [nytError, setError] = useState();
  const [nytIsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNyt();
  }, []);

  async function fetchNyt() {
    setIsLoading(true);
    await fetch(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=IvG06dYNVIkOU4eavYANevPFhBW7ce2k"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setError(null);
        setIsLoading(false);
        setResult(
          res.response.docs.map((item, index) => ({
            title: item.headline.main,
            date: new Date(item.pub_date),
            author: item.byline.person
              ?.map((author) =>
                String(author.firstname + " " + author.lastname).trim()
              )
              .slice(0, 2)
              .join(","),
            source: item.source,
            category: String(item.news_desk).toLowerCase(),
            url: item.web_url,
            image: item.multimedia[0]?.url
              ? "https://www.nytimes.com/" + item.multimedia[0]?.url
              : "",
          }))
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }

  return [nytResult, nytIsLoading, nytError];
};
