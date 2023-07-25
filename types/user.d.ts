type IUser = {
  email: string;
  password?: string;
}

type UserLoginData = {
  token: string;
  email: string;
}

type UserInfoResponse = {
  email: string;
}
