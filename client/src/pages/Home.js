import React, { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertReducer'

function Home() {
  const getData = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/users/authz', {}, {
        headers: {
          Authorization: localStorage.getItem('_token')
        }
      })
      dispatch(hideLoading())
      // toast.success(`Welcome ${res.data}`)
      console.log(res.data.user)
    } catch (err) {
      dispatch(hideLoading())
      toast.error(err.message)
    }
  },
  dispatch = useDispatch()

  useEffect(() => {
    document.title = 'DocConnect - Access Portal'
    getData()
  }, [])

  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  )
}

export default Home