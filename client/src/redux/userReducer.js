import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    initialState: {
        user: null
    },
    name: 'users',
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions