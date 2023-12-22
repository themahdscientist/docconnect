import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { hideLoading, showLoading } from '../redux/alertReducer'

function Register() {
    useEffect(() => {
        document.title = 'DocConnect - Register Portal'
    }, [])

    const register = async (values) => {
        try {
            dispatch(showLoading())
            let res = await axios.post('/api/users/register', values)
            dispatch(hideLoading())
            if (res.data.success) {
                dispatch(showLoading())
                navigate('/')
                dispatch(hideLoading())
            } else if (res.data.info) {
                dispatch(showLoading())
                toast.error(res.data.msg)
                dispatch(hideLoading())
            }
        } catch (err) {
            dispatch(hideLoading())
            toast.error('An error occurred')
        }
    },
        navigate = useNavigate(),
        dispatch = useDispatch()

    return (
        <section className='auth register'>
            <div className='auth-form card p-4'>
                <h1 className='card-title'>🟢 Nice to meet you!</h1>
                <Form layout='vertical' onFinish={register}>
                    <Form.Item label='Full Name' name='name'>
                        <Input placeholder='Please input your name' required />
                    </Form.Item>
                    <Form.Item label='Email Address' name='email'>
                        <Input type='email' placeholder='Please input your email' required />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' placeholder='Please input a secure password' required />
                    </Form.Item>
                    <Button className='primary-button my-3' htmlType='submit'>Register</Button>

                    <Link to='/login' className='anchor'>Already have an account? Log in.</Link>
                </Form>
            </div>
        </section>
    )
}

export default Register