import React, { useState, useEffect } from "react";
import Image from "../banner.jpg";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  let [page, setPage] = useState(1);
  const [hover, setHover] = useState();
  const [favourites, setFavourites] = useState([]);

  function goAhead(){
    setPage(page + 1);
  }
  function goBack(){
    if(page > 1){
      setPage(page - 1);
    }
  }
  
  useEffect(function(){
    // everytime when page reloads
    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || [];
    setFavourites(oldFav);
    axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=a5c56855c36baf556a59117a8a597d1b&page=${page}`
      )
      .then((res) => {
        console.table(res.data.results);
        setMovies(res.data.results);
      });
  }, [page])

  let add = (movie)=>{
      let newArray = [...favourites, movie];
      setFavourites([...newArray]);
      // console.log(newArray);
      // After for reload
      localStorage.setItem("imdb", JSON.stringify(newArray));
  }
  let del = (movie) => {
    let newArray = favourites.filter((m) => m.id != movie.id)
    setFavourites([...newArray])
    localStorage.setItem("imdb", JSON.stringify(newArray))
  }

  return (
    <div className="mb-8">
      <div className="mt-4 mb-3 font-bold text-2xl text-center">
        Trending Movies
      </div>
      {movies.length == 0 ? (
        <div className="flex justify-center">
          <Oval
            height="80"
            width="80"
            radius="9"
            color="grey"
            secondaryColor="grey"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {
            movies.map(movie =>  ( 
              <div
                className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] md:h-[40vh] md:w-[200px] 
              h-[30vh] w-[150px] bg-center bg-cover
              rounded-xl
              flex items-end
              m-2 md:m-2
              hover:scale-120
              ease-out duration-300
              relative
              `}
              onMouseEnter={()=>setHover(movie.id)}

              onMouseLeave={()=>{setHover("")}}
              >
              {
                hover == movie.id && 
                <div> {
                  !favourites.find((m) => m.id == movie.id) ?
                  <div className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                  onClick={()=> add(movie)}
                  >😍</div> :
                  <div className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                  onClick={() => del(movie)}
                  >❌</div>
                }
                </div>
              }
                <div className="w-full bg-gray-900 text-white py-2 text-center rounded-b-xl font-bold">
                  {movie.title}
                </div>
              </div>
            ))
          }
          
        </div>
      )}
      <Pagination pageProp={page} goBack={goBack} goAhead={goAhead} />
    </div>
  );
}
