import React, { useEffect } from 'react'
import axios from 'axios'
import { API_KEY } from './API_data'
import { Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const Genres = ({ type, selectedGenres, setSelectedGenres, genres, setGenres, setPage }) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async() => {
        const {data} = await axios(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`)
        //console.log(data)
        setGenres(data.genres)
    }

    useEffect(() => {
        fetchGenres();
        // eslint-disable-next-line
        return () => {
            setGenres([]);
            // eslint-disable-next-line
        }
    },[])

    return (
        <div style={{ padding: "6px 0" }}>
            {
                selectedGenres && selectedGenres.map((genre) => (
                    <Chip 
                        style={{ margin: 2, color:"whitesmoke" }}
                        label={genre.name}
                        key={genre.id}
                        clickable
                        color='primary'
                        size="small"
                        deleteIcon={<DeleteIcon />}
                        onDelete={() => handleRemove(genre)}
                    />
                ))
            }
            {
                genres && genres.map((genre) => (
                    <Chip 
                        style={{ margin: 2, color:"whitesmoke", backgroundColor:"#121212"}}
                        label={genre.name}
                        key={genre.id}
                        clickable
                        size="small"
                        variant='outlined'
                        onClick={() => handleAdd(genre)}
                    />
                ))
            }
        </div>
    )
}

export default Genres