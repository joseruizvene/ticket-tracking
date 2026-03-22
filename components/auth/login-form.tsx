"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

import { loginAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    setIsLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Iniciando sesión...");
      router.push("/");
      router.refresh();
    }
  }

  return (
    <Card className="w-full max-w-sm border-none shadow-2xl bg-card/50 backdrop-blur-xl">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
          <Zap className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Bienvenido</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a soporte
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" name="email" type="email" placeholder="nombre@empresa.com" required className="bg-background/50" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required className="bg-background/50" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-semibold" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            ¿No tienes cuenta? <a href="/register" className="text-primary hover:underline font-medium">Contáctanos</a> para tu registro.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
