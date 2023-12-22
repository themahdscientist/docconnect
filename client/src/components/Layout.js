import React, { useState } from 'react'
import './Layout.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false),
        userMenu = [
            {
                name: 'Dashboard',
                path: '/',
                icon: 'bi bi-graph-down'
            },
            {
                name: 'Users',
                path: '/users',
                icon: 'bi bi-people'
            },
            {
                name: 'Doctors',
                path: '/doctors',
                icon: 'bi bi-file-medical'
            },
            {
                name: 'Profile',
                path: '/profile',
                icon: 'bi bi-person-workspace'
            },
            {
                name: 'Logout',
                path: '/logout',
                icon: 'bi bi-door-open'
            }
        ],
        adminMenu = [
            {
                name: 'Home',
                path: '/',
                icon: 'bi bi-house'
            },
            {
                name: 'Profile',
                path: '/profile',
                icon: 'bi bi-person-workspace'
            },
            {
                name: 'Logout',
                path: '/logout',
                icon: 'bi bi-door-open'
            },
        ],
        location = useLocation(),
        { user } = useSelector(state => state.users),
        menuToRender = user?.isAdmin ? adminMenu : userMenu

    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className={`sidebar ${collapsed ? 'collapsed-sidebar' : ''}`}>
                    <div className='sidebar-header'>
                        <h1>DC</h1>
                    </div>
                    <menu>
                        {menuToRender.map(menu => {
                            let active = location.pathname === menu.path ? true : false
                            return <div className={`d-flex menu-item active-${active}`}>
                                <Link to={menu.path}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && menu.name}
                                </Link>
                            </div>
                        })}
                    </menu>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? <i className='bi bi-list icon' onClick={() => setCollapsed(false)}></i> : <i className='bi bi-x-circle icon' onClick={() => setCollapsed(true)}></i>}
                        <div className='d-flex notify-area'>
                            <i className='bi bi-bell icon notify'></i>
                            <Link className='anchor' to='/profile'>
                                {user?.name}
                                <p className='email'>{user?.email}</p>
                            </Link>
                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>

            </div>
        </div>
    )
}

export default Layout