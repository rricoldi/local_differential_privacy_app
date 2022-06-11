import { api } from "../api";

// if API returns success, set authentication.
const handleLogin = async ({ email, password }: { email: string, password: string }) => {
  const { data } = await api.post<{ id: number }>('/user/login', { email, password })	

  if (data.id) {
    return data.id;
  }

  return 0;
}

export default handleLogin;