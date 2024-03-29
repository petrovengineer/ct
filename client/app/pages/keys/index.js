import React, { useRef, useState } from 'react'
import WithKeys from '_hoc/WithKeys'
import Modal from '_components/modal'
import Store from '_entities/Keys/store'
import Pages from '_components/pagination'
import {observer} from "mobx-react";

const Keys = ()=>{
                const [newKeyForm, showNewKeyForm] = useState(false)
                const [toRemove, setToRemove] = useState(null)
                const {cachedData: data, count, filter} = Store;
                if(!data)return <h1 className="title">Загрузка...</h1>
                function remove(){
                    Store.remove(toRemove)
                    setToRemove(null)
                }
                return (
                    <>
                        <h1 className="subtitle">Ключи</h1>
                        <button className="button is-success" onClick={()=>showNewKeyForm(true)}>Добавить</button>
                        <hr/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Сотрудник</th>
                                    <th>Номер ключа</th>
                                    <th>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(key=>(
                                    <tr key={key._id}>
                                        <td>{key.owner}</td>
                                        <td>{key.data}</td>
                                        <td>
                                            <button className="delete" onClick={()=>setToRemove(key._id)}></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/*<Pages count={count} limit={filter.limit} skip={filter.skip} setSkip={setSkip}/>*/}
                        {newKeyForm && <NewKeyForm close={()=>showNewKeyForm(false)}/>}
                        {toRemove && <RemoveForm close={()=>{setToRemove(null)}} remove={remove}/>}
                    </>
                )
}

function RemoveForm({close, remove}){
    return (
        <Modal close={close}>
            <div className="box">
                <h1 className="subtitle">Подтвердить удаление?</h1>
                <button className="button is-danger" onClick={remove}>Удалить</button>
            </div>
        </Modal>
    )
}

function NewKeyForm({close}){
    const fioRef = useRef(null)
    const keyRef = useRef(null)
    async function addKey(){
        try{
            Store.create({owner: fioRef.current.value, data: keyRef.current.value})
            close()
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <Modal close={close}>
            <div className="box">
                <div className="field">
                    <label className="label">Фамилия Имя Отчество сотрудника</label>
                    <div className="control">
                        <input type="text" className="input" ref={fioRef}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Код ключа</label>
                    <div className="control">
                        <input type="text" className="input" ref={keyRef}/>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success" onClick={addKey}>Добавить</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default observer(Keys)