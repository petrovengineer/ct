import React, { useEffect, useState } from 'react'
import s from '../styles/drawer.module.scss'
import {Link} from 'react-router-dom'
import Iam from './iam.jsx'

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
            <aside id="mySidenav" className={s.sidenav+ ' has-background-link-light'}>
                <Iam/>
                <span className={s.closebtn} onClick={()=>{setDrawer(!drawer)}}>&times;</span>
                {menu.map(group=>(
                    <div  key={group._id} className="mt-4">
                        <p className="menu-label">
                            {group.title}
                        </p>
                        <Items items={group.items}/>
                    </div>    
                ))}
            </aside>
    )
}

const Items = ({items})=>{
        return <ul className="menu-list">
            {items.map(item=>(
                <li key={item._id}>
                    <Link to={item.link}>{item.name}</Link>
                    {Array.isArray(item.items) && <Items items={item.items}/>}
                </li>
            ))}
        </ul>
}

const menu = [
    {_id: 'g1', title: 'Эксплуатация', items: 
        [
            // {_id:'e1', name: 'Неисправности', link: '/breakdowns'},
            {_id:'e2', name: 'Нарушения', link: '/observations'},
            {_id:'e3', name: 'Отчёты', link: '/reports'},
        ]
    },
    // {_id:'g2', title: 'Системы', items: [
    //     {_id:'s1', name:'Противопожарная защита', link: '/systems/appz'},
    //     {_id:'s2', name:'Вентиляция', link: '/systems/vent'},
    // ]},
    // {_id: 'g3', title: 'Администрирование', items:
    //     [
    //         {_id:'a1', name: 'Пользователи', link: '/users'},
    //         {_id:'a2', name: 'Меню', link: '/menu'},
    //     ]
    // }
]