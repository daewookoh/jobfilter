import { LoginForm } from "~/app/_components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#2e026d] to-[#15162c] p-4">
      <LoginForm />
    </div>
  );
}
