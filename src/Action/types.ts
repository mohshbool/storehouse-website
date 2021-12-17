export const UPDATE_CONFIGS = "UPDATE_CONFIGS";
export const SET_USER = "SET_USER";

interface Upload {
  type: string;
  filename: string;
  created_at: Date;
}

export interface ConfigsReducer {
  token?: string;
  signedIn?: boolean;
}

export interface UserReducer {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  icon?: Upload;
  created_at?: Date;
  updated_at?: Date;
}

interface UpdateConfigs {
  type: typeof UPDATE_CONFIGS;
  payload: ConfigsReducer;
}

interface UpdateUser {
  type: typeof SET_USER;
  payload: UserReducer;
}

export type ActionTypes = UpdateConfigs | UpdateUser;
