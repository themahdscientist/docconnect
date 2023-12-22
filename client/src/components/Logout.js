import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertReducer'

function Logout() {
    const dispatch = useDispatch()

    dispatch(showLoading())
    localStorage.clear()
    dispatch(hideLoading())

    return <Navigate to='/login' />
}

export default Logout