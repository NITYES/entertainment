import { Movie } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import MovieCard from '../../components/Moviecard/MovieCard';
import PageTitle from '../../components/PageTitle/PageTitle'

function Trending() {
    const [page,setPage]=useState(1)
const [content,setContent]=useState([]);

const API_Url=`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`
const fetchTrending=()=>{
        axios.get(API_Url).then(res=>{
            console.log(res.data)
           setContent(res.data.results);
       }).catch(err=>{
           console.log(err.data)
       })
}

useEffect(()=>{
       fetchTrending();
},[page])

    return (
        <>
            <PageTitle title="Trending" />
            <ContentContainer >
            {
                     content && content.map((c)=>(
                        <MovieCard 
                         media_type={c.media_type}
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
                  <CustomPagination color="primary" setPage={setPage} />
        </>
    )
}

export default Trending
