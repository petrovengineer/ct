import React, { useEffect, useState } from 'react'
import s from '../styles/drawer.module.scss'

export default function Drawer(){
    const [drawer, setDrawer] = useState(true)
    useEffect(()=>{
        if(drawer){
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }else{
            document.getElementById("mySidenav").style.width = "60px";
            document.getElementById("main").style.marginLeft = "60px";
        }
    }, [drawer])
    return (
        <div id="mySidenav" className={s.sidenav}>
            <a href="#" className={s.closebtn} onClick={()=>{setDrawer(!drawer)}}>&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}