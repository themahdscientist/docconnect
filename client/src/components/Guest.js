import React from 'react'
import { Navigate } from 'react-router-dom'

function Guest(props) {
    if (!localStorage.getItem('_token')) return props.children

    return <Navigate to='/' />
}

export default Guest