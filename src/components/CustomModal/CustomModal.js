import React,{useState,useEffect} from 'react'
import './CustomModal.css'
import {img_500,unavailable} from '../../config/config'
import './CustomModal.css'
import {Button , Badge} from '@material-ui/core'
import axios from 'axios';
import { VisibilityOutlined } from '@material-ui/icons';




function CustomModal({children,vote_average,media_type,id}) {


   const [openModal, closeModal] = useState(false)
   const [content, setcontent] = useState();
   const [video, setvideo] = useState()
   const moviedetailUrl=`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
   const videolUrl=`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
     const fetchData=()=>{
       axios.get(moviedetailUrl).then(res=>{
             setcontent(res.data)
       })
     }
   
     const fetchVideo=()=>{
       axios.get(videolUrl).then(res=>{
         setvideo(res.data.results[0]?.key);
   })
     }
   
   
   useEffect(()=>{
   fetchData();
   fetchVideo();
   },[])

function closeModalfunc(e){
if(e.target.className === 'modalBodyContainer'){
    closeModal(false)
}
}

  const Modal=({children,closeModal})=>{
      return <div className="modalBodyContainer" onClick={(e)=>closeModalfunc(e)} >
                <div className="modalContainer">
                        <div className="closeXbuttonContainer" >
                                <button className="closeXbutton" onClick={()=>closeModal(false)} >X</button>
                        </div>
                        <div className="modalBody">
       {
           children
       }
                        </div>
                </div>
      </div>
  }

    return (
        <div className="modal" >
            <Badge 
             className="movieCard" 
             badgeContent={vote_average} 
             color={vote_average>6 ? "primary":"secondary"} 
             onClick={()=>closeModal(true)}
             >
                {
                children
            }</Badge>
            {
                openModal && <Modal 
                closeModal={closeModal}
                >

               <div className="contentModal">
                <div className="image_container">
                <img  
                 className="img_portrait" 
                 src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} 
                  alt={content.poster_path}
                    />
                      <img  
                 className="img_landspaces" 
                 src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailable} 
                  alt={content.backdrop_path}
                    />
                </div>
                    <div className="contentModal_about">
                       <span className="contentModal_title">
                             {content.title || content.name}
                             ({(content.first_air_date||content.release_date).substring(0,4)})
                       </span>
                       {content.tagline && (
                         <i className="contentModal_tagline">{content.tagline}</i>
                       )}
                       <div className="contentModal_overview">
                  {content.overview}
                       </div>
                       <div></div>
                       <Button
                       style={{width:"100%",marginTop:"20px"}}
                       variant="contained"
                       color="secondary"
                       target="_blank"
                       href={`https://www.youtube.com/watch?v=${video}`}
                       startIcon={< VisibilityOutlined  />}
                       >
                watch trailer
                       </Button>
                    </div>
                    
                 </div>
        
                </Modal>
            }
        </div>
        
    )
}

export default CustomModal
