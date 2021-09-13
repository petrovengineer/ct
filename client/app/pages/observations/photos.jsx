import React, {useState} from 'react'
import {upload} from '_app/api'
import InfoStore from '_store/info'
import ObservationsStore from '_store/_observations'
import Photo from './photo'
import Modal from '_components/modal'

const Photos = ({photos= [], oid, index})=>{
    const [large, showLarge] = useState(null)
    const uploadImage = ({target: { files }}) => {
        const file = files[0]
        file && upload(file, oid)
        .then((res)=>{ObservationsStore.addImage(res.data, index)})
        .catch((e)=>{InfoStore.addMessage({type:'error', message: 'Ошибка сервера!'}); console.log(e);})
    }
    const prev = ()=>{
        const index = photos.indexOf(large);
        if(index===0)showLarge(photos[photos.length-1])
        else showLarge(photos[index-1])
    }
    const next = ()=>{
        const index = photos.indexOf(large);
        if(index===photos.length-1)showLarge(photos[0])
        else showLarge(photos[index+1])
    }
    return(
        <div className="mt-4">
            <form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'} className="mb-2">
                <div className="file is-warning">
                    <label className="file-label">
                        <input className="file-input" type="file" name="resume" onChange={uploadImage}/>
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label ">
                            Загрузить фото...
                        </span>
                        </span>
                    </label>
                </div>
            </form>
            {photos.map(p=>(
                <Photo photo={p} oid={oid} key={p} index={index} showLarge={showLarge}/>
            ))}
            {large && <Modal close={()=>showLarge(null)}>
                <a className="icon title has-text-white" 
                    style={{position:'absolute', left: '10px', top: '240px'}}
                    onClick={prev}>
                    <i className="fas fa-angle-left"></i>
                </a>
                <a className="icon title has-text-white" 
                    style={{position:'absolute', right: '10px', top: '240px'}}
                    onClick={next}>
                    <i className="fas fa-angle-right"></i>
                </a>
                <img style={{width:'640px', height:'480px'}} className="" src={large}/>
            </Modal>}
        </div>
    )
}

export default Photos