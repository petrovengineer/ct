import React from 'react'
import Drawer from './components/drawer.jsx'
import styles from './styles/drawer.scss'

export default function Layout(){
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }
    return (
        <>
            <Drawer/>
            <div id="main" className={styles.main}>
                <button onClick={openNav}>Open</button>
            </div>
        </>
    )
}