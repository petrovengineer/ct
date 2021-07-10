import React, { useEffect, useState } from 'react'
import s from '../styles/drawer.module.scss'

export default function Drawer(){
    const [drawer, setDrawer] = useState(true)
    useEffect(()=>{
        if(drawer){
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("mySidenav").style.padding = "20px";
            document.getElementById("main").style.marginLeft = "250px";
        }else{
            document.getElementById("mySidenav").style.width = "60px";
            document.getElementById("mySidenav").style.padding = "20px 0px 20px 60px";
            document.getElementById("main").style.marginLeft = "60px";
        }
    }, [drawer])
    return (
            <aside className="menu" id="mySidenav" className={s.sidenav}>
                <span className={s.closebtn} onClick={()=>{setDrawer(!drawer)}}>&times;</span>
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><a>Dashboard</a></li>
                    <li><a>Customers</a></li>
                </ul>
                <p className="menu-label">
                    Administration
                </p>
                <ul className="menu-list">
                    <li><a>Team Settings</a></li>
                    <li>
                    <a className="is-active">Manage Your Team</a>
                    <ul>
                        <li><a>Members</a></li>
                        <li><a>Plugins</a></li>
                        <li><a>Add a member</a></li>
                    </ul>
                    </li>
                    <li><a>Invitations</a></li>
                    <li><a>Cloud Storage Environment Settings</a></li>
                    <li><a>Authentication</a></li>
                </ul>
            </aside>
    )
}