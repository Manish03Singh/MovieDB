import React from 'react'
import {img_300, unavailable} from '../../Config/Config'
import './SingleContent.css'
import { Badge } from '@mui/material'
import ContentModal from '../ContentModal/ContentModal'

const SingleContent = ( {id ,poster ,title ,date ,media_type ,vote_average, adult} ) => {
    vote_average = Math.round(vote_average*10)/10;

    return (
            <ContentModal media_type={media_type} id={id}>
                <Badge 
                    badgeContent={vote_average}
                    color={vote_average > 6.5 ? (vote_average > 8.5 ? "success" : "primary") : "secondary"}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                />
                {adult && <Badge 
                    badgeContent={adult ? "A" : ""}
                    color="secondary"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                />}

                <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} title={title}/>
                
                <b className='title'>{title}</b>
                <span className='subTitle'>
                    {media_type === "movie" ? "Movie" : "tv"}
                    <span className='subTitle'>{date}</span>
                </span>
        
            </ContentModal>
      )
}

export default SingleContent