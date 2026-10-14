
export interface FormInput {
    firstName: String,
    lastName : String,
    email: String,
    password: String,
    confirmPassword: String
}

export interface Response {
  success: boolean;
  message: string;
}

export interface LoginINFO{
  email: String,
  password: String
}

export interface ResponseAuth{
  success: boolean,
  user_id: String
}
export interface FormDetail {
  loading: Boolean,
  setLoading: () => void,
  setCode: (code: String) => Promise<Response>,
  authenticateUser: () => Promise<ResponseAuth>,
  loginAccount: (details: LoginINFO) => Promise<Response>,
  registerAccount: (details: FormInput) => Promise<Response>;
}