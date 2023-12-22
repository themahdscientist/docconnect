import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { showLoading, hideLoading } from '../redux/alertReducer'

function Login() {
    useEffect(() => {
        document.title = 'DocConnect - Login Portal'
    }, [])

    const login = async (values) => {
        try {
            dispatch(showLoading())
            let res = await axios.post('/api/users/login', values)
            dispatch(hideLoading())
            if (res.data.success) {
                dispatch(showLoading())
                localStorage.setItem('_token', res.data._token)
                navigate('/')
                dispatch(hideLoading())
            } else if (res.data.info) {
                dispatch(showLoading())
                toast.error(res.data.msg)
                dispatch(hideLoading())
            }
        } catch (err) {
            dispatch(hideLoading())
            console.error(err)
            toast.error('An error occurred')
        }
    },
        navigate = useNavigate(),
        dispatch = useDispatch()

    return (
        <section className='auth login'>
            <div className='auth-form card p-4'>
                <h1 className='card-title'>🟢 Welcome back!</h1>
                <Form layout='vertical' onFinish={login}>
                    <Form.Item label='Email Address' name='email'>
                        <Input type='email' placeholder='Enter in your email' required />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' placeholder='Enter in your password' required />
                    </Form.Item>
                    <Button className='primary-button my-3' htmlType='submit'>Log in</Button>

                    <Link to='/register' className='anchor'>Don&apos;t have an account? Register.</Link>
                </Form>
            </div>
        </section>
    )
}

export default Login