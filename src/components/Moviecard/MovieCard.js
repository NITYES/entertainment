import React from 'react'
import {img_300,img_500,unavailable} from '../../config/config'
import ContentModal from '../ContentModal/ContentModal'
import CustomModal from '../CustomModal/CustomModal'
import './MovieCard.css'
function MovieCard({title,poster,media_type,date,vote_average,id}) {


    return (
                 
        <CustomModal 
        vote_average={vote_average}
        media_type={media_type}
        id={id}
        >
<img src={poster?`${img_300}/${poster}`:unavailable}  alt={poster} className="movieposter" />
<span className="movieTitle">{title}</span>
<div className="movieData">
     <span className="mediaType">{media_type}</span>
     <span className="releaseDate">{date}</span>
</div>
        </CustomModal>

    )
}

export default MovieCard
