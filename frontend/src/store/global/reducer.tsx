import { createSlice } from '@reduxjs/toolkit'
import { user, status } from '../../common/types'

const InitialState: user = {
	logged:false,
	username:undefined,
	friendsRequest:[]
}

export const globalSlice = createSlice({
	name: 'global',
	initialState:InitialState,
	reducers: {
		login: (state: any, data: any) => {
			state.username = data.payload.user.username
			state.id = data.payload.user.id
			state.status = status.Connected
			state.logged = true
			state.token = data.payload.token
			state.friendsRequest = data.payload.user.friendsRequest
			state.userImage = data.payload.user.profilIntraUrl
		},
		logout: (state: any) => {
			state.username = undefined
			state.id = undefined
			state.status = status.Disconnected
			state.logged = false
			state.token = undefined
		},
		updateDB: (state:any, data:any) => {
			state.status = data.payload.status
			state.friendsRequest = data.payload.friendsRequest
			state.friends = data.payload.friends
			state.bloqued = data.payload.bloqued
		},
	},
})

// Action creators are generated for each case reducer function
export const { login, logout, updateDB } = globalSlice.actions

export default globalSlice.reducer