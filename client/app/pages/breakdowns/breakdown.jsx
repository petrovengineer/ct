import axios from 'axios'
import React from 'react'
import {upload} from '../../api'
import InfoStore from '../../store/info'

const Breakdown = ()=>{
    const uploadImage = ({target: { files }}) => {
        const file = files[0]
        file && upload(file)
        .then(()=>InfoStore.addMessage({type:'success', message: 'Изображение успешно загружено'}))
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
                <input name={'document'} type={'file'} id="file" 
                    onChange={uploadImage}/>
            </form>
        </div>
    )
}

export default Breakdown



