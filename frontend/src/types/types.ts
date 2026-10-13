
interface FormInput {
    firstName: String,
    lastName : String,
    email: String,
    password: String,
    confirmPassword: String
}

interface FormActions {
    setFirstName: (firstName: String) => void,
    setLastName: (lastName: String) => void,
    setEmail: (email: String) => void,
    setPassword: (password: String) => void,
    setConfirmPassword: (confirmPassword: String) => void
}

export type FormData = FormInput & FormActions