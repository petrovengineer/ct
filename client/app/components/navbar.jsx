import React from 'react'
import IamStore from '../store/iam.js'

const NavBar = ({iam, exit})=>{
    // console.log("IAM ", iam)
    // const {exit} = IamStore
    function onExit(){
        exit();
    }
    return (
            <>
                <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger p-4">
                        <a aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>{iam.name}</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </a>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">
                                Сменить пароль
                            </a>
                            <hr class="dropdown-divider"/>
                            <a href="#" class="dropdown-item" onClick={()=>{exit()}}>
                                Выход
                                <span class="icon" style={{color: 'gray'}}>
                                    <i class="fas fa-sign-out-alt"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                    </div>
            </>
    )
}

export default NavBar;