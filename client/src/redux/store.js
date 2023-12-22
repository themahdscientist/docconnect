import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { alertSlice } from './alertReducer'
import { userSlice } from './userReducer'

const rootReducer = combineReducers({
    alerts: alertSlice.reducer,
    users: userSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store