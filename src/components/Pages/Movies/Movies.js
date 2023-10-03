import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '../../API_data'
import SingleContent from '../../SingleContent/SingleContent'
import CustomPagination from '../../Pagination/CustomPagination'
import Genres from '../../Genres'
import useGenre from '../../../hooks/useGenre'

const Movies = () => {

    const [page,setPage] = useState(1)
    const [content, setContent] = useState([]);
    const [noOfPages, setNoOfPages] = useState(500)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres,setGenres] = useState([])
    const genreUrl = useGenre(selectedGenres)

    const fetchMovies = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=false&page=1&sort_by=popularity.desc&page=${page}&with_genres=${genreUrl}`)
        //console.log(data)
        setContent(data.results)
        if(data.total_pages < 500)
            setNoOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    },[page,genreUrl])

    return (
        <div>
            <div className='pageTitle'>Movies</div>
            <Genres 
                type="movie"
                selectedGenres = {selectedGenres}
                setSelectedGenres = {setSelectedGenres}
                genres = {genres}
                setGenres = {setGenres}
                setPage = {setPage}
            />
            <div className='trending'>
                {
                    content && content.map((c) => (
                        <SingleContent 
                            key={c.id} 
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type='movie'
                            vote_average={c.vote_average}
                            adult={c.adult}
                        />
                    ))
                }
            </div>
            {noOfPages>1 && <CustomPagination setPage={setPage} noOfPages={noOfPages}/>}
            
        </div>
    )
}

export default Movies