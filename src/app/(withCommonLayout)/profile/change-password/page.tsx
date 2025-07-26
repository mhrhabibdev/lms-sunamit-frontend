import { ChangePasswordForm } from "@/components/Profile/ChangePassword/ChangePasswordForm"

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center bg-background text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  )
}
