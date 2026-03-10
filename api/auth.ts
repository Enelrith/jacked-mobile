import { axiosAuth } from "@/services/axios";
import { IAddUserRequest } from "@/types/users";
import { getBackendUrl } from "@/utils/env";
import axios, { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

export async function loginUser(user: IAddUserRequest) {
  try {
    const response = await axios.post(`${getBackendUrl()}/api/v1/auth`, user);
    return response;
  } catch (error) {
    if (isAxiosError(error)) return error.response;
  }
}

export async function refreshToken() {
  try {
    const response = await axios.post(
      `${getBackendUrl()}/api/v1/auth/refresh`,
      { refreshToken: await SecureStore.getItemAsync("refreshToken") },
    );

    return response;
  } catch (error) {
    if (isAxiosError(error)) return error.response;
  }
}

export async function me() {
  try {
    const response = await axiosAuth.get(`${getBackendUrl()}/api/v1/auth`);
    return response;
  } catch (error) {
    if (isAxiosError(error)) return error.response;
  }
}
