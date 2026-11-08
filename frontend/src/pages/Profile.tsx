import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Camera, Loader2 } from "lucide-react"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../store/profileStore"

type ProfileData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName: string
  avatarUrl?: string
}

const EMPTY: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  avatarUrl: "",
}

type Status = "idle" | "loading" | "saving" | "saved" | "error"

function Profile() {
  const [form, setForm] = useState<ProfileData>(EMPTY)
  const [error, setError] = useState("")
  const [userID, setuserID] = useState<String>("")
  const navigate = useNavigate()
  const { authenticateUser } = useFormDetail()
  const { profile,setProfile } = useProfile()

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

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Preview only; upload it to your API (FormData) on save
    setForm((prev) => ({ ...prev, avatarUrl: URL.createObjectURL(file) }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
  
    setError("")

    
  }

  

  const initials =
    `${form.firstName[0] ?? ""}${form.lastName[0] ?? ""}`.toUpperCase() || "?"

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 border-t-2 border-t-white rounded-md p-6 max-w-2xl"
    >
      <h2 className="text-sm font-bold text-gray-600">Profile</h2>
      <p className="text-xs text-gray-400 mt-1">
        Update your personal and business details.
      </p>
      <hr className="mt-3 mb-5 text-gray-300" />

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-16 w-16">
          {form.avatarUrl ? (
            <img
              src={form.avatarUrl}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-500">
              {initials}
            </div>
          )}
          <label
            htmlFor="avatar"
            className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow cursor-pointer hover:bg-gray-50"
          >
            <Camera className="h-3.5 w-3.5 text-gray-500" />
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatar}
          />
        </div>
        <div className="text-xs text-gray-400">
          JPG or PNG, up to 2 MB.
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
        <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        <div className="sm:col-span-2">
          <Field label="Business name" name="businessName" value={form.businessName} onChange={handleChange} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          disabled={status === "saving"}
          className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-xs text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {status === "saving" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>

        {status === "saved" && (
          <span className="text-xs text-green-600">Profile updated.</span>
        )}
        {status === "error" && (
          <span className="text-xs text-red-500">{error}</span>
        )}
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