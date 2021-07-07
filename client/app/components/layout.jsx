import React, { useEffect } from 'react'
import Drawer from './drawer.jsx'
import Main from './main.jsx'
import Users from '../pages/users.jsx'
import Login from '../pages/login.jsx'
import { observer } from 'mobx-react'
import IamStore from '../store/iam'
import NavBar from './navbar.jsx'

const Layout = observer(()=>{
    const {iam, whoAmI} = IamStore;
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token) whoAmI();
    }, [])
    if(!iam) return <Login/>
    return (
        <>
            <Drawer/>
            <Main>
                <NavBar iam={iam}/>
                {/* <span class="icon-text">
                    <span>{iam.name} {iam.secondName}</span>
                    <span class="icon" style={{color: 'gray'}}>
                        <i class="fas fa-sign-out-alt"></i>
                    </span>
                </span> */}

                <section className="section">
                    <Users/>
                </section>
            </Main>    
        </>
    )
})

export default Layout;