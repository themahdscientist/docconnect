import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../redux/userReducer'
import { hideLoading, showLoading } from '../redux/alertReducer'

function Auth(props) {
    const { user } = useSelector(state => state.users),
        getUser = async () => {
            try {
                dispatch(showLoading())
                const res = await axios.post('/api/users/authz', { _token: localStorage.getItem('_token') }, {
                    headers: {
                        Authorization: localStorage.getItem('_token')
                    }
                })
                dispatch(hideLoading())
                if (res.data.success) { dispatch(setUser(res.data.user)) } else {
                    localStorage.clear()
                    navigate('/login')
                }

            } catch (err) {
                dispatch(hideLoading())
                localStorage.clear()
                navigate('/login')
            }
        },
        navigate = useNavigate(),
        dispatch = useDispatch()

    useEffect(() => {
        if (!user) getUser()
    }, [])

    if (!localStorage.getItem('_token')) return <Navigate to='/login' />

    return props.children
}

export default Auth