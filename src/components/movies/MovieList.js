import React from "react";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// templateCount = number of items shown blank as loading template
const MovieList = ({
  movies,
  favorites,
  category,
  gridClass,
  templateCount,
  isLoading,
}) => {
  const settings = {
    arrows: false,
    dots: false,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    draggable: true,
    slidesToShow: 4,
    rows: 2,
    responsive: [
      {
        breakpoint: 478,
        settings: {
          slidesToShow: 2,
          rows: 2,
          centerMode: false,
          infinite: false,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {!movies && templateCount != 0
        ? new Array(templateCount)
            .fill({})
            .map((item, index) => (
              <MovieCard
                category={category}
                isLoading={isLoading}
                key={`skeleton_movie_${index}`}
                movie={{}}
                favorites={[]}
              />
            ))
        : movies.map((movie, index) => (
            <MovieCard
              category={movie.media_type || category}
              isLoading={isLoading}
              key={`${movie.id}_${index}`}
              movie={movie}
              favorites={favorites}
            />
          ))}
    </Slider>
  );
};

MovieList.defaultProps = {
  templateCount: 0,
  category: "movie",
  gridClass: "grid",
};

export default MovieList;
