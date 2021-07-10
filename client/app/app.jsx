import ReactDOM from 'react-dom'
import React from 'react'
import Layout from './layout.jsx'
import Info from './components/info.jsx'

import 'bulma/bulma.sass'
import './styles/main.module.scss'
import './styles/fontawesome/css/all.css'

ReactDOM.render(<><Layout/><Info/></>, document.getElementById('app'));

