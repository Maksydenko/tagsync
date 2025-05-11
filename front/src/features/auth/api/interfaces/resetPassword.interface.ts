export interface IRequestResetPassword {
  email: string;
  redirectUrl: string;
}

export interface IResetPassword {
  accessToken: string;
  password: string;
  refreshToken: string;
}
