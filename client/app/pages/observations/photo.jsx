import React, { useState } from 'react'
import Modal from '../../components/modal'
import ObservationStore from '../../store/observations'
import {observer} from 'mobx-react'

const Photo = observer(({photo, oid, index, showLarge})=>{
    const [confirm, showConfirm] = useState(false)
    const {deleteImage} = ObservationStore;
    return (
        <div style={{position: 'relative', display:'inline-block', height:'120px'}} className="mr-2 mb-2">
            <span className="icon has-text-white img-increase" onClick={()=>showLarge(photo)}>
                <i className="fas fa-search-plus" id="search-icon"></i>
            </span>
            <span className="icon has-text-danger img-remove" onClick={()=>showConfirm(true)}>
                <i className="fas fa-trash" id="remove-icon"></i>
            </span>
            <div id="img-back" className=""></div>
            <img style={{width:'160px', height:'120px'}} className="" src={photo}/>

            {confirm && <Modal close={()=>showConfirm(false)}>
                <div className="box">
                    <div className="mr-4 subtitle">Удалить фото?</div>
                    <button className="button is-danger mr-2" 
                    onClick={()=>{deleteImage(photo, oid, index )}}>Удалить</button>
                    <button className="button" onClick={()=>showConfirm(false)}>Отмена</button>
                </div>

                </Modal>}
        </div>
    )
})

export default Photo