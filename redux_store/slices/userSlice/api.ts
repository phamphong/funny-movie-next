import { axiosClient } from "@/redux_store/slices/base_api"

export const loginOrRegisterAPI = async (
  user: IUser
): Promise<BaseResponse<UserInfoResponse>> => {
  const response = await axiosClient.post<BaseResponse<UserInfoResponse>>("/api/user/login", user);
  return response.data
}

export const logoutAPI = async (): Promise<BaseResponse<any>> => {
  const response = await axiosClient.get<BaseResponse<any>>("/api/user/logout");
  return response.data
}

export const getUserInfoAPI = async (): Promise<BaseResponse<UserInfoResponse>> => {
  const response = await axiosClient.get<BaseResponse<UserInfoResponse>>("/api/user/user-info");
  return response.data
}
