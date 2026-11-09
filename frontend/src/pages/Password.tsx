import { useState, type ChangeEvent, type FormEvent } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

type PasswordForm = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const EMPTY: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

type Status = "idle" | "saving" | "saved" | "error"

function validate(form: PasswordForm): string {
  if (form.newPassword.length < 8) return "New password must be at least 8 characters."
  if (!/[A-Za-z]/.test(form.newPassword) || !/\d/.test(form.newPassword))
    return "New password must include a letter and a number."
  if (form.newPassword === form.currentPassword)
    return "New password must be different from the current one."
  if (form.newPassword !== form.confirmPassword) return "Passwords do not match."
  return ""
}

function Password() {
  const [form, setForm] = useState<PasswordForm>(EMPTY)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (status !== "idle") setStatus("idle")
    setError("")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationError = validate(form)
    if (validationError) {
      setError(validationError)
      setStatus("error")
      return
    }

    setStatus("saving")
    setError("")

    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message ?? "Failed to change password")
      }

      setForm(EMPTY)
      setStatus("saved")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStatus("error")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 border-t-2 border-t-white rounded-md p-6 max-w-md"
    >
      <h2 className="text-sm font-bold text-gray-600">Password</h2>
      <p className="text-xs text-gray-400 mt-1">
        Choose a strong password you don't use anywhere else.
      </p>
      <hr className="mt-3 mb-5 text-gray-300" />

      <div className="flex flex-col gap-4 max-w-sm">
        <PasswordField
          label="Current password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <PasswordField
          label="New password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <PasswordField
          label="Confirm new password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          disabled={status === "saving"}
          className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-xs text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {status === "saving" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {status === "saving" ? "Updating..." : "Update password"}
        </button>

        {status === "saved" && (
          <span className="text-xs text-green-600">Password updated.</span>
        )}
        {status === "error" && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </form>
  )
}

type PasswordFieldProps = {
  label: string
  name: keyof PasswordForm
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoComplete: string
}

function PasswordField({ label, name, value, onChange, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 pr-9 text-xs text-gray-700 outline-none focus:border-gray-500"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

export default Password