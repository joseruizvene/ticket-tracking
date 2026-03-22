import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(100,100,255,0.05),transparent)] pointer-events-none" />
      <RegisterForm />
    </div>
  );
}
