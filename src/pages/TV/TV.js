import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import PageTitle from '../../components/PageTitle/PageTitle';
import MovieCard from '../../components/Moviecard/MovieCard';
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenres'

function TV() {
    const [content, setcontent] = useState([])
    const [page,setPage]=useState(1)
    const [numOfPage,setNumOfPage]=useState(1);
    const [genres, setgenres] = useState([]);
    const [selectedGenres, setselectedGenres] = useState([])
   const genresurl=useGenres(selectedGenres);
    const movieUrl=`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresurl}`
 const fetchTV=()=>{
     axios.get(movieUrl).then(res=>{
         setcontent(res.data.results);
         setNumOfPage(res.data.total_pages)
     })
 }

 useEffect(()=>{
     fetchTV();

 },[page,selectedGenres])

    return (
       <>
       <PageTitle title="TV Series" />
       <Genres 
       type="tv" 
       setPage={setPage}
       setgenres={setgenres}
       selectedGenres={selectedGenres}
       setselectedGenres={setselectedGenres}
       genres={genres} />
       <ContentContainer>
       {
                     content && content.map((c)=>(
                        <MovieCard 
                         media_type="tv"
                         poster={c.poster_path}
                         vote_average={c.vote_average}
                         title={c.title || c.name}
                         date={c.first_air_date || c.release_date}
                         key={c.id}
                         id={c.id}
                        />
    ))
                   } 
       </ContentContainer>
       {
           numOfPage>1 && <CustomPagination setPage={setPage} numOfPage={numOfPage} />
       }
       </>
    )
}

export default TV
