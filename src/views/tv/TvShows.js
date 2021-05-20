import { fetchTvShows } from 'actions/movieActions';
import Container from 'components/common/Container';
import Filter from 'components/common/Filter';
import PaginationBar from 'components/common/PaginationBar';
import Loader from 'components/hoc/Loader';
import MovieList from 'components/movies/MovieList';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';
import useDidMount from 'hooks/useDidMount';
import useDocumentTitle from 'hooks/useDocumentTitle';
import usePageSaver from 'hooks/usePageSaver';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const TvShows = (props) => {
  const { tvShows, filter, favorites, isLoading } = useSelector(state => ({
    tvShows: state._movies.tvShows,
    filter: state._filters,
    favorites: state._misc.favorites,
    isLoading: state._misc.isLoading
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const query = '/discover/tv?language=en-US';

  useDocumentTitle('TV Shows | MOVX');
  useEffect(() => {
    if (isEmpty(tvShows) || didMount) {
      dispatch(fetchTvShows(`${query}${filter.tv.query}`, currentPage));
    }
  }, [filter.tv.query]);

  const handlePageChange = (page) => {
    if (tvShows.page !== page) {
      dispatch(fetchTvShows(`${query}${filter.tv.query}`, page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>TV Shows</h1>
          <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
        </div>
        {tvShows.results && (
          <Filter
            filterCategory="tv"
            filterData={filter.tv}
            isLoading={isLoading}
          />
        )}
      </div>
      <MovieList
        category="tv"
        favorites={favorites}
        isLoading={isLoading}
        movies={tvShows.results}
        templateCount={10}
      />
      <PaginationBar
        activePage={tvShows.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={tvShows.total_pages}
        totalPage={tvShows.total_pages}
      />
    </Container>
  );
};

export default Loader('tvShows')(TvShows);
