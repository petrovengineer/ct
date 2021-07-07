import React from 'react'
import s from '../styles/drawer.module.scss'

export default function Drawer(){
    function closeNav() {
        document.getElementById("mySidenav").style.width = "60px";
        document.getElementById("main").style.marginLeft = "60px";
    }
    return (
        <div id="mySidenav" className={s.sidenav}>
            <a href="#" className={s.closebtn} onClick={closeNav}>&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}