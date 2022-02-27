import React from 'react'

function PageTitle(props) {
    return (
        <div style={{padding:"10px",textTransform:"uppercase",  textAlign:"center"}}>
            {props.title}
        </div>
    )
}

export default PageTitle
