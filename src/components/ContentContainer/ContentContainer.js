import React from 'react'
import './ContentContainer.css'
function ContentContainer({children,style}) {
    console.log()
    return (
        <div className="contentContainer" style={style} >
            {
                children
            }
        </div>
    )
}

export default ContentContainer
