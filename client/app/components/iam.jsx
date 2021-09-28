import React from 'react'
import IamStore from '_entities/Iam/store'
import { observer } from 'mobx-react';
import {shortName} from "_app/usefull";

const NavBar = observer(()=>{
    const {exit, iam} = IamStore
    return (
            <>
                <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <a aria-haspopup="true" aria-controls="dropdown-menu" className="p-0">
                            <span>{shortName(iam.name)}</span>
                        </a>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <a href="#" className="dropdown-item">
                                Сменить пароль
                            </a>
                            <hr className="dropdown-divider"/>
                            <a href="#" className="dropdown-item" onClick={exit.bind(IamStore)}>
                                Выход
                                {/* <span className="icon" style={{color: 'gray'}}>
                                    <i className="fas fa-sign-out-alt"></i>
                                </span> */}
                            </a>
                        </div>
                    </div>
                </div>
            </>
    )
})

export default NavBar;