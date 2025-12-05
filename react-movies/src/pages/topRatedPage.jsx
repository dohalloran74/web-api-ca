import React from "react";
import { useQuery } from '@tanstack/react-query';
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/playlistAdd';
import { topRatedMovies } from "../api/tmdb-api";

const TopRated= () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['toprated'],
    queryFn: topRatedMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <PageTemplate
      title='Top Rated Movies'
      movies={movies}
      action={(movie) => <PlaylistAddIcon movie={movie} />}
    />
  );
};

export default TopRated
