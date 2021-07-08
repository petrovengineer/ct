import React, { useEffect } from 'react'
import Drawer from './drawer.jsx'
import Main from './main.jsx'
import Users from '../pages/users.jsx'
import Welcome from '../pages/welcome.jsx'
import { observer } from 'mobx-react'
import IamStore from '../store/iam'
import NavBar from './navbar.jsx'

const Layout = observer(()=>{
    const {iam, whoAmI, exit} = IamStore;
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token) whoAmI();
    }, [])
    if(!iam) return <Welcome/>
    return (
        <>
            <Drawer/>
            <Main>
                <NavBar iam={iam} exit={exit}/>
                <Users/>
            </Main>    
        </>
    )
})

export default Layout;