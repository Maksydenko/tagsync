export interface IUploadAvatar {
  avatar: FileList;
  email: string;
}

export interface IUploadAvatarError {
  errors: {
    Avatar: string[];
  };
  status: number;
  title: string;
  traceId: string;
  type: string;
}

export interface IUploadAvatarResponse {
  avatar_url: string;
  message: string;
}
