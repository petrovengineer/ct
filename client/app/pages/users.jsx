import React, { useEffect } from 'react'
import WithUsers from '_hoc/WithUsers'

function Users(){
    return <WithUsers>
        {({data:users})=>{
            if(!users)return 'Загрузка...'
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ФИО</th><th>Почта</th><th>active</th><th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u=><User user={u}/>)}
                    </tbody>
                </table>
            )
        }}
    </WithUsers>
}

export default Users

function User({user}){
    return <tr>
        <th>{user.name}</th><th>{user.email}</th>
        <th>{user.active?'active':'blocked'}</th>
        <th></th>
    </tr>
}

