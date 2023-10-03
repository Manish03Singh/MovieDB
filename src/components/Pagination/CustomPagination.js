import { ThemeProvider } from '@emotion/react'
import { Pagination } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import React from 'react'

const darkTheme = createTheme({
    palette:{
        type:"dark",
    },
    color:"#ffffff !important",
})

const CustomPagination = ({setPage, noOfPages=10}) => {

    const pageChangehandler = (page) => {
        window.scroll(0,0)
        setPage(page)
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                color:"#ffffff !important",
            }}
        >   
            <ThemeProvider theme={darkTheme}>
                <Pagination 
                    count={noOfPages} 
                    onChange={(e) => pageChangehandler(e.target.textContent)}
                    variant="outlined"
                    color='secondary'
                    hideNextButton
                    hidePrevButton    
                />
            </ThemeProvider>
            
        </div>
    )
}

export default CustomPagination