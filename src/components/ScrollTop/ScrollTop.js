import React, { useEffect } from 'react'

function ScrollTop({children}) {

    useEffect(()=>{
        window.scroll(0,0)
    })

    return (
        <div>
            {children}
        </div>
    )
}

export default ScrollTop
