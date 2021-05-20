import { fetchDiscoverMovies } from 'actions/movieActions';
import Container from 'components/common/Container';
import Filter from 'components/common/Filter';
import PaginationBar from 'components/common/PaginationBar';
import Loader from 'components/hoc/Loader';
import MovieList from 'components/movies/MovieList';
// helpers
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';
// hooks 
import useDidMount from 'hooks/useDidMount';
import useDocumentTitle from 'hooks/useDocumentTitle';
import usePageSaver from 'hooks/usePageSaver';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DiscoverMovies = (props) => {
  const {
    discoverMovies,
    filter,
    favorites,
    isLoading
  } = useSelector((state) => ({
    discoverMovies: state._movies.discoverMovies,
    filter: state._filters,
    favorites: state._misc.favorites,
    isLoading: state._misc.isLoading
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const query = '/discover/movie?';
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useDocumentTitle('Discover Movies | MOVX');
  useEffect(() => {
    if (isEmpty(discoverMovies) || didMount) {
      dispatch(fetchDiscoverMovies(`${query}${filter.discover.query}`, currentPage));
    }
  }, [filter.discover.query]);

  const handlePageChange = (page) => {
    if (discoverMovies.page !== page) {
      dispatch(fetchDiscoverMovies(`${query}?${filter.discover.query}`, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Discover Movies</h1>
          <h3>{numberWithCommas(discoverMovies.total_results)} Movies</h3>
        </div>
        {discoverMovies.results && (
          <Filter
            filterCategory="discover"
            filterData={filter.discover}
            isLoading={isLoading}
          />
        )}
      </div>
      <MovieList
        favorites={favorites}
        isLoading={isLoading}
        movies={discoverMovies.results}
        templateCount={10}
      />
      <PaginationBar
        activePage={discoverMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={discoverMovies.total_pages}
        totalPage={discoverMovies.total_pages}
      />
    </Container>
  );
};

export default Loader('discoverMovies')(DiscoverMovies);
