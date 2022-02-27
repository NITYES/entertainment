import { Chip } from '@material-ui/core';
import axios from 'axios';
import React,{useEffect} from 'react'

function Genres({type,genres,setgenres,selectedGenres,setselectedGenres,setPage}) {

  const genresurl=`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`

    
    
const fetchGenres=()=>{
    axios.get(genresurl).then(res=>{
        console.log(res.data)
        setgenres(res.data.genres);
    })
}

useEffect(()=>{
    fetchGenres();

    return ()=>{
        setgenres([])
        setselectedGenres([])
    }
},[])

const handleadd=(g)=>{
    let isalreadySelected=selectedGenres.find(genre=>genre.id===g.id);
    if(! isalreadySelected){
        setselectedGenres([...selectedGenres,g]);
        setgenres(genres.filter(genre=>genre.id!==g.id));
        setPage(1)
    }

  
}

const handleRemove=(genre)=>{
    setselectedGenres(selectedGenres.filter(g=>g.id !==genre.id));
    setgenres([...genres,genre]);
    setPage(1);
}

    return (
        <div className="genres" style={{padding:"5px 0"}}>
             {
                selectedGenres.length>0 && selectedGenres.map((g)=>{
                    return <Chip 
                     style={{margin:"2px"}}
                      label={g.name}
                      key={g.id}
                      clickable
                      size="small"
                      color="primary"
                      onClick={()=>{
                          handleadd(g)
                      }}
                      onDelete={()=>{
                          handleRemove(g)
                      }}
                    />
                })
            }
            {
                genres.length>0 && genres.map((g)=>{
                    return <Chip 
                    style={{margin:"2px"}}
                      label={g.name}
                      key={g.id}
                      clickable
                      size="small"
                      onClick={()=>{
                          handleadd(g)
                      }}
                    />
                })
            }
        </div>
    )
}

export default Genres
