import React, { useEffect } from 'react'
import {observer} from 'mobx-react'
import UsersStore from '../store/users'

const Users = observer(()=>{
    const {users, getUsers} = UsersStore;
    useEffect(()=>{
        console.log("COMP USERS", users)
    }, [users])
    useEffect(()=>{
        getUsers();
    }, [])
    return (
        <>
            <h1>Users</h1>
            <ul>
                {users.map(u=><li key={u._id}>{u.name}</li>)}
            </ul>
        </>
    )
})

export default Users

