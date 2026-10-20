
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

export interface UserDetails{
  firstName: String,
  lastName: String,
  email: String
}
export interface FormDetail {
  loading: Boolean,
  details: UserDetails[],
  setDetails: (userID: String) => void,
  setLoading: () => void,
  logout: () => Promise<Response>,
  setCode: (code: String) => Promise<Response>,
  authenticateUser: () => Promise<ResponseAuth>,
  loginAccount: (details: LoginINFO) => Promise<Response>,
  registerAccount: (details: FormInput) => Promise<Response>;
}

//Add reminder types
export interface Reminders{
  reminder: String,
}

export interface ReminderDetails{
  reminder: String,
  rem_id: String,
  time: Date
}

export interface Reminder{
  reminder: ReminderDetails[],
  setReminders: (userID: String) => Promise<void>
  addReminder: (user_id: String, reminder: Reminders) => Promise<Response>
}