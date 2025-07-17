import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { axiosInstance, IResponse } from '@/application/api';

import { IResult } from '@/shared/api';
import { IDatabase } from '@/shared/lib';

import {
  IEmailExists,
  ILogin,
  IRegister,
  IRequestResetPassword,
  IResetPassword,
  IUploadAvatar,
  IUploadAvatarError,
  IUploadAvatarResponse,
  IUserData
} from './interfaces';

const { auth } = createClientComponentClient<IDatabase>();

export const AuthService = {
  addUserData: async (data: Omit<IUserData, 'avatarUrl'>) => {
    try {
      const response: IResponse<IResult> = await axiosInstance.post(
        '/UserRegistration/addUserData',
        data
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  changeUserData: async (data: Partial<IUserData>) => {
    try {
      const response: IResponse<IResult> = await axiosInstance.post(
        '/UserRegistration/changeUserData',
        data
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  checkEmailExists: async (email: string) => {
    const response: IResponse<IEmailExists> = await axiosInstance.get(
      `/UserRegistration/checkUserExists?email=${email}`
    );

    return response;
  },

  getUserData: async () => {
    const user = await auth.getUser();

    if (!user.data.user) {
      return null;
    }

    try {
      const response: IResponse<IUserData> = await axiosInstance.get(
        `/UserRegistration/getUserData?email=${user.data.user?.email}`
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  login: async (data: ILogin) => {
    try {
      const response = await auth.signInWithPassword(data);

      return response;
    } catch (err) {
      throw err;
    }
  },

  logout: async () => {
    try {
      const response = await auth.signOut();

      return response;
    } catch (err) {
      throw err;
    }
  },

  register: async (data: IRegister) => {
    try {
      const response: IResponse<IResult> = await axiosInstance.post(
        '/UserRegistration/register',
        data
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  requestResetPassword: async (data: IRequestResetPassword) => {
    try {
      const response: IResponse<IResult> = await axiosInstance.post(
        '/UserRegistration/requestPasswordReset',
        data
      );

      return response;
    } catch (err) {
      throw err;
    }
  },

  resetPassword: async ({
    accessToken,
    password,
    refreshToken
  }: IResetPassword) => {
    const { error: sessionError } = await auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (sessionError) {
      throw sessionError;
    }

    const { data: userData, error: userError } = await auth.updateUser({
      password
    });

    if (userError) {
      throw userError;
    }

    return userData;
  },

  uploadAvatar: async ({ avatar, email }: IUploadAvatar) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('avatar', avatar[0]);

    const response = await axiosInstance.post<
      IResponse<IUploadAvatarError | IUploadAvatarResponse>
    >('/UserRegistration/uploadAvatar', formData);

    return response;
  }
};
