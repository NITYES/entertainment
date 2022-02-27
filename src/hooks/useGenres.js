import { generatePath } from "react-router";

const useGenres=(selectedGenres)=>{

    if(selectedGenres.length < 1) return ""
    const genreId=selectedGenres.map(g=>g.id)
    const genrestring=genreId.reduce((prev,currentgenre)=>prev+','+currentgenre);
    return genrestring
}


export default useGenres