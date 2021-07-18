import React, { useEffect } from 'react'
import Drawer from './components/drawer.jsx'
import Main from './components/main.jsx'
import Users from './pages/users.jsx'
import Welcome from './pages/welcome/index.jsx'
import { observer } from 'mobx-react'
import IamStore from './store/iam'
import NavBar from './components/iam.jsx'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Breakdowns from './pages/breakdowns'
import Observations from './pages/observations'

const Layout = observer(()=>{
    const {iam, whoAmI, getting, got} = IamStore;
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token) whoAmI();
        else got();
    }, [])
    if(getting)return <div style={{width:'100%', height:'100%', backgroundColor:'red'}}></div>
    if(!iam) return <Welcome/>
    return (
        <BrowserRouter>
            <Drawer/>
            <Main>
                <Switch>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/breakdowns">
                        <Breakdowns/>
                    </Route>
                    <Route path="/observations">
                        <Observations/>
                    </Route>
                    <Route path="/">
                        <Observations/>
                    </Route>
                </Switch>
            </Main>    
        </BrowserRouter>
    )
})

export default Layout;