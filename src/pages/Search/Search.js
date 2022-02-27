import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import MovieCard from '../../components/Moviecard/MovieCard'
import CustomPagination from '../../components/CustomPagination/CustomPagination'
import './Search.css'

const darkTheme=createTheme({
    palette:{
        type:"dark",
        primary:{
            main:"#fff"
        }
    }
   
})
function Search() {

const [type,setType]=useState(0);
const [page, setPage] = useState(1);
const [searchText, setSearchText] = useState("");
const [content, setcontent] = useState();
const [numOfPage, setnumOfPage] = useState(1);

const searchUrl=`https://api.themoviedb.org/3/search/${type?'tv':'movie'}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchText}`


const searchContent=()=>{
    axios.get(searchUrl).then(res=>{
        setcontent(res.data.results);
        setnumOfPage(res.data.total_pages)
    }).catch(err=>{
        setcontent();
        setnumOfPage(0)
    })
}

useEffect(()=>{
    window.scroll(0,0);
    searchContent();
},[page,type])

    return (
        <div className="search">
  <ThemeProvider theme={darkTheme}>
<div style={{display:'flex',marginTop:'15px',boxSizing:"content-box"}} >
<TextField 
style={{flex:1}}
label="search"
variant="filled"
className="searchBox"
onChange={(event)=>{
    setSearchText(event.target.value)
}}
/>
<Button variant="contained" 
style={{marginLeft:"15px"}}
onClick={searchContent}
>
<SearchOutlined/>
</Button>
</div>

<Tabs
 value={type} 
 textColor="primary" 
indicatorColor="primary"
onChange={(event,newValue)=>{
    setType(newValue);
    setPage(1)
}}
style={{padding:"5px"}}
>
 <Tab  style={{width:"50%"}} label="search movie" />
 <Tab  style={{width:"50%"}} label="search Tv" />
</Tabs>
</ThemeProvider>
<ContentContainer>
{
                     content && content.map((c)=>(
                        <MovieCard 
                         media_type={type?'tv':'movie'}
                         poster={c.poster_path}
                         vote_average={c.vote_average}
                         title={c.title || c.name}
                         date={c.first_air_date || c.release_date}
                         key={c.id}
                         id={c.id}
                        />
    ))
                   } 

                   {
                       searchText && !content  && (type?<h2>No TV Series Found</h2>:<h2>No Movie Found</h2>)
                   }
                    {
           numOfPage>1 && <CustomPagination setPage={setPage} numOfPage={numOfPage} />
       }
</ContentContainer>
        </div>
        
    )
}

export default Search
