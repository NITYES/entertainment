import { createTheme,ThemeProvider } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React from 'react'
import './CustomPagination.css'

const darkTheme=createTheme({
    palette:{
        type:"dark"
    }
})

function CustomPagination({setPage,numOfPage=10,color}) {

const handlePageChange=(e)=>{
    setPage(e.target.textContent);
    window.scroll(0,0)
}

    return (
        <div className="customPagination">
            <ThemeProvider theme={darkTheme}>
            <Pagination
             count={numOfPage}
             color={color}
              onChange={handlePageChange} />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
