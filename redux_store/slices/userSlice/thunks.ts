/* Instruments */
import { createAppAsyncThunk } from '@/redux_store/createAppAsyncThunk'
import { getUserInfoAPI, loginOrRegisterAPI, logoutAPI } from './api'

export const loginOrRegister = createAppAsyncThunk(
  'user/login-or-register',
  async (user: IUser) => {
    const response = await loginOrRegisterAPI(user);
    return response;
  }
)

export const logout = createAppAsyncThunk(
  'user/logout',
  async () => {
    const response = await logoutAPI();
    return response;
  }
)

export const getUserInfo = createAppAsyncThunk(
  'user/user-info',
  async () => {
    const response = await getUserInfoAPI();
    return response;
  }
)
