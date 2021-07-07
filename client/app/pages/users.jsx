import React, { useEffect } from 'react'
import {observer} from 'mobx-react'
import UsersStore from '../store/users'

const Users = observer(()=>{
    const {users, getUsers, isLoading} = UsersStore;
    useEffect(()=>{
        getUsers();
    }, [])
    if(isLoading)return <h2>Loading...</h2>
    return (
        <>
            <h1 className="title">Users</h1>
            <ul>
                {users.map(u=><li key={u._id}>{u.name}</li>)}
            </ul>
        </>
    )
})

export default Users

