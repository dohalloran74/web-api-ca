import React from "react";
import { useQuery } from '@tanstack/react-query';
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/playlistAdd';
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
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
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => <PlaylistAddIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;