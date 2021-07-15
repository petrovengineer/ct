import axios from 'axios'
import React from 'react'
import {upload} from '../../api'
import InfoStore from '../../store/info'
import OStore from '../../store/observations'

const Observation = ({observation})=>{
    const uploadImage = ({target: { files }}) => {
        const file = files[0]
        file && upload(file, observation._id)
        .then(()=>
            {
                InfoStore.addMessage({type:'success', message: 'Изображение успешно загружено'});
                OStore.getObservations();
            }
        )
        .catch((e)=>InfoStore.addMessage({type:'error', message: 'Ошибка сервера!'}))
    }
    return (
        <div className="box">
            <div className="icon-text">
                <span className="icon has-text-danger">
                    <i className="fas fa-exclamation-circle"></i>
                </span>
                <span>Неисправность линейного датчика</span>
            </div>
            <form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                <div class="file ">
                    <label class="file-label">
                        <input class="file-input" name={'document'} type="file" id="file" onChange={uploadImage}/>
                        <span class="file-cta">
                        <span class="file-icon m-0">
                            <i class="fas fa-image"></i>
                        </span>
                        </span>
                    </label>
                </div>
            </form>
            {observation.photos.map(p=><img src={p}></img>)}
        </div>
    )
}

export default Observation

