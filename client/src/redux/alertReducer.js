import { createSlice } from '@reduxjs/toolkit'
export const alertSlice = createSlice({
    initialState: {
        loading: false
    },
    name: 'alerts',
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
})

export const { showLoading, hideLoading } = alertSlice.actions