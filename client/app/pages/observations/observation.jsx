import React, { useState } from 'react'
import { formatDate } from '../../time'
import Photos from './photos'

const Observation = ({observation, index})=>{
    const [photos, showPhotos] = useState(false)
    console.log("RENDER ")
    return (
        <div className="box">
            <div className="icon-text">
                <span className="icon has-text-danger">
                    <i className="fas fa-exclamation-circle"></i>
                </span>
                {formatDate(observation.time)}
                <a className="ml-2" onClick={()=>showPhotos(!photos)}>
                    {observation.text}
                    {observation.photos.length>0 && <span className="ml-2 has-text-success">{observation.photos.length} фото</span>}
                </a>
            </div>
            {photos && <Photos photos={observation.photos} oid={observation._id} index={index}/>}
        </div>
    )
}

export default Observation

