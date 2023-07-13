import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
import { useEffect, useState } from "react";
import Buttons from "./Buttons";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const [page, setPage] = useState(1);

  const response = useQuery({
    queryKey: ["images", searchTerm, page],
    queryFn: async () => {
      const result = await axios.get(
        `${url}&query=${searchTerm}&per_page=9&page=${Number(page)}`
      );
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>Ops! Something went wrong.</h4>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found.</h4>
      </section>
    );
  }

  return (
    <>
      <section className="image-container">
        {results.map((item) => {
          const url = item?.urls?.regular;
          return (
            <img
              src={url}
              key={item.id}
              alt={item.alt_description}
              className="img"
              onClick={() => window.open(item.urls.full)}
            />
          );
        })}
        <Buttons response={response} page={page} setPage={setPage} />
      </section>
    </>
  );
};

export default Gallery;
