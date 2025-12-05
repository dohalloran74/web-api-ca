import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getTrendingMoviesToday } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingTodayPage = () => {
  const { data, error, isLoading, isError } = useQuery({
   queryKey: ["trendingToday"], //had to change both of these
  queryFn:  getTrendingMoviesToday
});

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
    <PageTemplate
      title="Trending Today"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TrendingTodayPage;