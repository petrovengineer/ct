import React, { useEffect, useState } from 'react'
import s from '../styles/drawer.module.scss'
import {Link} from 'react-router-dom'
import Iam from './iam.jsx'
import { useLocation } from 'react-router-dom'
import WithPermissions from '_hoc/WithPermissions'
import Store from '_store/menu'

export default function Drawer(){
    const [drawer, setDrawer] = useState(true);
    const location = useLocation();
    useEffect(()=>{
        if(drawer){
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("mySidenav").style.padding = "20px";
            if(document.body.clientWidth>640) document.getElementById("main").style.marginLeft = "250px";
        }else{
            document.getElementById("mySidenav").style.width = "60px";
            document.getElementById("mySidenav").style.padding = "20px 0px 20px 60px";
            document.getElementById("main").style.marginLeft = "60px";
        }
    }, [drawer])
    const {data: menu} = Store;
    function existInPermissions(group, permissions){
        return true
    }
    return (
            <aside id="mySidenav" className={s.sidenav}>
                <Iam/>
                <span className={s.closebtn} onClick={()=>{setDrawer(!drawer)}}>&times;</span>
                <WithPermissions>
                    {({data:permissions})=>{
                    return (
                        menu.filter(group=>(existInPermissions(group, permissions)))
                        .map(group=>(
                            <div  key={group._id} className="mt-4">
                                <p className="menu-label">
                                    {group.title}
                                </p>
                                <Items items={group.items}/>
                            </div>    
                        ))
                    )}}
                </WithPermissions>

            </aside>
    )
}

const Items = ({items})=>{
        return <ul className="menu-list">
            {items.map(item=>(
                <li key={item._id}>
                    <Link to={item.link} className={location.pathname===item.link?"has-background-success":undefined}>{item.name}</Link>
                    {Array.isArray(item.items) && <Items items={item.items}/>}
                </li>
            ))}
        </ul>
}