import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../store/profileStore"
import toast from "react-hot-toast"

type ProfileData = {
  firstName: string
  lastName: string
  email: string

}

const EMPTY: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
}


function Profile() {
  const { profile,setProfile,updateProfile } = useProfile()
  const [form, setForm] = useState<ProfileData>(EMPTY);
  const [userID, setuserID] = useState<String>("")
  const navigate = useNavigate()
  const { authenticateUser } = useFormDetail()
 

  useEffect(() => {
    handleAuthentication()
    setProfile(userID)
  },[userID])

  const handleAuthentication = async () => {
      const { success, user_id} = await authenticateUser()
        if (success) {
          setuserID(user_id)
        } else {
          navigate('/login')      
        }
  }
  


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { success, message} = await updateProfile(userID,form)
    if (success) {
      toast.success(message)
    } else {
      toast.error("An error occured")
    }

    await setProfile(userID)
    
  }
  
  useEffect(() => {
    const current = profile[0];
    if (!current) return;

    setForm({
      firstName: current.firstName,
      lastName: current.lastName,
      email: current.email,
    });
  }, [profile]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 border-t-2 border-t-white rounded-md p-6 max-w-md"
    >
      <h2 className="text-sm font-bold text-gray-600">Profile</h2>
      <p className="text-xs text-gray-400 mt-1">
        Update your personal and business details.
      </p>
      <hr className="mt-3 mb-5 text-gray-300" />

   

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4">
        <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
        <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-xs text-white hover:bg-gray-800 disabled:opacity-60"
        >
          Save changes
        </button>       
      </div>
    </form>
  )
}

type FieldProps = {
  label: string
  name: keyof ProfileData
  value: string | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}

function Field({ label, name, value, onChange, type = "text", required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        className="rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-500"
      />
    </div>
  )
}

export default Profile