import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {API_KEY} from '../../API_data'
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css'
import CustomPagination from '../../Pagination/CustomPagination';


const Trending = () => {

    const [page,setPage] = useState(1)
    const [content, setContent] = useState([]);

    const fetchTrending = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${API_KEY}&page=${page}&include_adult=true`)
        //console.log(data)
        setContent(data.results)
    }

    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line
    },[page])
  
    return (
        <div>
            <div className='pageTitle'>TRENDING</div>
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
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
        
      )
  }

export default Trending