import React, { useState } from 'react'
import WithPermissions from '_hoc/WithPermissions'
import WithUsers from '_hoc/WithUsers'
import Multiselect from '_components/multiselect'
import {shortName} from '_app/usefull'

export default ()=>{
    return (
        <WithPermissions>
            {({data:permissions, update})=>{
                if(!permissions)return <h1 className="title">Загрузка...</h1>
                return (
                    <>
                        <h1 className="subtitle">Привелегии</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Название</th><th>Чтение</th><th>Запись</th><th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                <WithUsers>
                                    {({data:users})=>permissions.map(p=><Permission key={p._id} permission={p} users={users} update={update}/>)}
                                </WithUsers>
                            </tbody>
                        </table>
                    </>
                )
            }}
        </WithPermissions>
    )
}

function Permission({permission, users, update}){
    const [read, setRead] = useState(permission.read)
    const [write, setWrite] = useState(permission.write)
    function filterUsers(users){
        if(!users)return []
        return users.map(u=>({_id:u._id, name:shortName(u.name)}))
    }
    function save(){
        update(permission._id, {read, write})
    }
    return (
        <tr>
            <td>{permission.name}</td>
            <td><Multiselect arr={filterUsers(users)} selected={read} setSelected={setRead}/></td>
            <td><Multiselect arr={filterUsers(users)} selected={write} setSelected={setWrite}/></td>
            <td>
                <a className="is-small" onClick={save}>
                    <span className="icon">
                        <i className="fas fa-save"></i>
                    </span>
                </a>
            </td>
        </tr>
    )
}