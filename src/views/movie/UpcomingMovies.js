import { fetchUpcomingMovies } from 'actions/movieActions';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import Loader from 'components/hoc/Loader';
import MovieList from 'components/movies/MovieList';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';
import useDocumentTitle from 'hooks/useDocumentTitle';
import usePageSaver from 'hooks/usePageSaver';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UpcomingMovies = (props) => {
  const { upcomingMovies, isLoading, favorites } = useSelector(state => ({
    upcomingMovies: state._movies.upcomingMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const queryString = '/movie/upcoming';

  useDocumentTitle('Upcoming Movies | MOVX');
  useEffect(() => {
    if (isEmpty(upcomingMovies)) {
      dispatch(fetchUpcomingMovies(queryString, currentPage));
    }
  }, []);

  const handlePageChange = (page) => {
    if (upcomingMovies.page !== page && !isLoading) {
      dispatch(fetchUpcomingMovies(queryString, page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Upcoming Movies</h1>
          <h3>{numberWithCommas(upcomingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={upcomingMovies.results}
        favorites={favorites}
        isLoading={isLoading}
        templateCount={10}
      />
      <PaginationBar
        activePage={upcomingMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={upcomingMovies.total_pages}
        totalPage={upcomingMovies.total_pages}
      />
    </Container>
  );
};

export default Loader('upcomingMovies')(UpcomingMovies);
