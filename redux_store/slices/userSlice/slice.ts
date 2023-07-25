/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { getUserInfo, loginOrRegister, logout } from './thunks'

const initialState: UserSliceState = {
  userInfo: null,
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginOrRegister.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginOrRegister.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = {
          email: action.payload.data!.email!
        }
      })

      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userInfo = {
          email: action.payload.data!.email
        }
      })

      .addCase(logout.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle'
        state.userInfo = null
      })
  },
})

/* Types */
export interface UserSliceState {
  userInfo: IUser | null,
  status: 'idle' | 'loading' | 'failed'
}