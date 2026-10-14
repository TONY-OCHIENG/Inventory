
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

export interface FormDetail {
  loading: Boolean,
  setLoading: () => void,
  setCode: (code: String) => Promise<Response>,
  registerAccount: (details: FormInput) => Promise<Response>;
}