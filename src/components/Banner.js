import React, { useState, useEffect } from "react";
import Image from "../banner.jpg";
import axios from "axios";

export default function Banner() {
  const [movie, setMovies] = useState([]);
  useEffect(function(){
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=a5c56855c36baf556a59117a8a597d1b&page=1"
      )
      .then((res) => {
        console.table(res.data.results);
        setMovies(res.data.results[1]);
      });
  }, [])
  return (
    <div
      className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh]
      md:h-[70vh] bg-center bg-cover
      flex items-end justify-center
    `}
    >
      <div
        className="text-xl md:text-3xl text-white
          p-6
          bg-gray-900 bg-opacity-50
          w-full
          flex justify-center
      "
      >
        {movie.title}
      </div>
    </div>
  );
}
