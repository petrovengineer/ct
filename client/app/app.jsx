import ReactDOM from 'react-dom'
import React from 'react'
import Layout from './layout.jsx'
import Info from './components/info.jsx'
import {StoreContextProvider} from '_app/storeContext'

import './styles/global.scss'
import 'bulma/bulma.sass'
import './styles/main.module.scss'
import './styles/fontawesome/css/all.css'


ReactDOM.render(<StoreContextProvider><Layout/><Info/></StoreContextProvider>, document.getElementById('app'));

