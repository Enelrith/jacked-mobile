import { IAddUserRequest } from "@/types/users";
import { getBackendUrl } from "@/utils/env";
import axios, { isAxiosError } from "axios";

export async function registerUser(request: IAddUserRequest) {
  try {
    const response = await axios.post(
      `${getBackendUrl()}/api/v1/users`,
      request,
    );
    return response; // ✅ return full response, not just data
  } catch (error) {
    if (isAxiosError(error)) return error.response;
  }
}
