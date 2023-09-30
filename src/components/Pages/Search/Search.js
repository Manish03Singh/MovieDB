import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { API_KEY } from '../../API_data';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';

const Search = () => {
    const [type, setType] = useState(0)
    const [page,setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [content, setContent] = useState([])
    const [noOfPages, setNoOfPages] = useState(500)

    const darkTheme = createTheme({
        palette: {
          type: "dark",
          primary: {
            main: "#fff",
          },
        },
    });

    const fetchSearch = async() => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&query=${searchText}&page=${page}&include_adult=true`);
            setContent(data.results);
            if(data.total_pages < 500)
                setNoOfPages(data.total_pages);
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        fetchSearch()
        window.scroll(0,0)
    },[type, page])

    return (
        <div>
            {/* //<div className='pageTitle'>Search</div> */}
            <ThemeProvider theme={darkTheme}>
                <div className="search">
                    <TextField
                        style={{ flex: 1 , backgroundColor:"gray", height:"6.5vh",
                                 width:"80%", borderStyle:"solid", borderRadius:"5px"}}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        onClick={fetchSearch}
                        variant="contained"
                        style={{ marginLeft: 10, marginTop: 2, backgroundColor:"#e0e0e0", height:"6vh"}}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </div>

                <Tabs 
                    value={type} 
                    indicatorColor='primary' 
                    textColor='primary'
                    onChange={(event,newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{paddingBottom:5}}
                >
                    <Tab style={{ width: "50%", color:"whitesmoke" }} label="Search Movies"/>
                    <Tab style={{ width: "50%", color:"whitesmoke" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>

            

            <div className='trending'>
                {
                    content && content.map((c) => (
                        <SingleContent 
                            key={c.id} 
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                            adult={c.adult}
                        />
                    ))
                }
                {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {noOfPages > 1 && (<CustomPagination setPage={setPage} noOfPages={noOfPages} />
      )}
        </div>
  )
}

export default Search