import React, { useEffect , lazy} from 'react'
import Drawer from './components/drawer.jsx'
import Main from './components/main.jsx'
import Users from './pages/users.jsx'
import Welcome from './pages/welcome/index.jsx'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

//==============PAGES===========================
import Observations from '_pages/observations'
// const Observations = lazy(()=>import('_pages/observations'))
import Reports from '_pages/reports'
import Access from '_pages/access'
// import WorkTime from '_pages/worktime'
// import Keys from '_pages/keys'
// import Permissions from '_pages/permissions'
//=============================================

import WithIam from '_entities/Iam/hoc'

export default function Layout(){
    return (
        <WithIam>
            {function EnhancedLayout({iam}){
                if(!iam) return <Welcome/>
                return (
                    <BrowserRouter>
                        <Drawer/>
                        <Main>
                            <Switch>
                                <Route path="/users">
                                    {/*<Users/>*/}
                                </Route>
                                <Route path="/observations">
                                    <Observations/>
                                </Route>
                                <Route path="/reports">
                                    <Reports/>
                                </Route>
                                <Route path="/access">
                                    <Access/>
                                </Route>
                                <Route path="/worktime">
                                    {/*<WorkTime/>*/}
                                </Route>
                                <Route path="/keys">
                                    {/*<Keys/>*/}
                                </Route>
                                <Route path="/permissions">
                                    {/*<Permissions/>*/}
                                </Route>
                                <Route path="/">
                                    <Observations/>
                                </Route>
                            </Switch>
                        </Main>
                    </BrowserRouter>
                )
            }}
        </WithIam>
    )
}