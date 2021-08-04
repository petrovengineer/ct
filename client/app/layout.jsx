import React, { useEffect } from 'react'
import Drawer from './components/drawer.jsx'
import Main from './components/main.jsx'
import Users from './pages/users.jsx'
import Welcome from './pages/welcome/index.jsx'
import { observer } from 'mobx-react'
import IamStore from './store/iam'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Observations from './pages/observations'
import Reports from '_pages/reports'
import store from '_store/observations'

const Layout = observer(()=>{
    const {iam, whoAmI, getting, got} = IamStore;
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token) whoAmI();
        else got();
    }, [])
    if(getting)return <></>
    if(!iam) return <Welcome/>
    return (
        <BrowserRouter>
            <Drawer/>
            <Main>
                <Switch>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/observations">
                        <Observations/>
                    </Route>
                    <Route path="/reports">
                        <Reports/>
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