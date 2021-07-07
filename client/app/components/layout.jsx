import React from 'react'
import Drawer from './drawer.jsx'
import Main from './main.jsx'
import Users from '../pages/users.jsx'

export default function Layout(){
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }
    return (
        <>
            <Drawer/>
            <Main>
                <button onClick={openNav} className='button'>Open</button>
                <Users/>
            </Main>    
        </>
    )
}