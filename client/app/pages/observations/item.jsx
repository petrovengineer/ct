import React, { useState } from 'react'
import { formatDate } from '../../time'
import Photos from './photos'
import {Iam} from '_store/iam'

const Observation = ({observation={}, index})=>{
    const [photos, showPhotos] = useState(false)
    let user = null;
    if(observation.author._id){
        const shortName = Object.getOwnPropertyDescriptor(Iam.prototype, 'shortName')
        user = {iam:{name: observation.author.name}}
        Object.defineProperty(user, 'shortName', shortName)
    }
    return (
        <div className="box">
            <div className="icon-text">
                <span className="icon has-text-danger">
                    <i className="fas fa-exclamation-circle"></i>
                </span>
                {formatDate(observation.time)}
                {/* <span className="ml-2">{observation.author.name}</span> */}
                <span className="ml-2">{user?user.shortName:'Неизвестный пользователь'}</span>
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

