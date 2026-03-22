"use client";

import { useState } from "react";
import { createTicketAction } from "@/app/actions/tickets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";

export function TicketForm({ portalId }: { portalId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    formData.append("portalId", portalId); // Asociamos el ticket al portal del cliente

    try {
      const result = await createTicketAction(formData);
      if (result.success) {
        toast.success("Ticket creado correctamente. Estaremos en contacto pronto.");
        (event.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || "Error al crear el ticket");
      }
    } catch (error) {
      toast.error("Ocurrió un fallo en el sistema. Inténtalo de nuevo.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary" />
          Reportar Incidencia
        </CardTitle>
        <CardDescription>
          Cuéntanos qué está fallando en tu sitio web. Nuestro equipo técnico lo revisará de inmediato.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Asunto / Título corto</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="Ej: El formulario de contacto no envía correos" 
              required 
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción detallada</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Explica qué sucede, cuándo ocurre y si hay algún mensaje de error..." 
              required 
              className="min-h-[150px]"
              disabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button type="button" variant="ghost" disabled={isPending}>Cancelar</Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar Reporte
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
