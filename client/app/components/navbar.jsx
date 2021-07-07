import React from 'react'

const NavBar = ({iam})=>{
    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">
                        Home
                    </a>

                    <a class="navbar-item">
                        Documentation
                    </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                {iam.name} {iam.secondName}
                            </a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    About
                                </a>
                                <a class="navbar-item">
                                    Jobs
                                </a>
                                <hr class="navbar-divider"/>
                                <a class="navbar-item">
                                    Exit
                                </a>
                            </div>
                        </div>
                </div>

                <div class="navbar-end">
                    
                </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;