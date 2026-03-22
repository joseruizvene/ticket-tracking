"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, ExternalLink, AlertTriangle, ArrowLeft } from "lucide-react";
import { TicketForm } from "./ticket-form";
import { Role } from "@prisma/client";

export function ClientDashboard({ user }: { user: { name: string, role: Role, portal_id?: string } }) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <Button 
          variant="ghost" 
          onClick={() => setShowForm(false)}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Button>
        <TicketForm portalId={user.portal_id || "default-portal"} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Hola, {user?.name.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground">Aquí puedes gestionar el soporte de las webs que hemos desarrollado para ti.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card 
          className="bg-primary/5 border-primary/10 transition-all hover:bg-primary/10 active:scale-[0.98] cursor-pointer group"
          onClick={() => setShowForm(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportar Fallo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mt-1">Envíanos un ticket si algo no funciona correctamente.</p>
            <Button size="sm" className="mt-4 w-full" onClick={(e) => { e.stopPropagation(); setShowForm(true); }}>
              Nuevo Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Mis Portales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sitios Activos</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Webs bajo nuestro soporte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Estamos trabajando en ello</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-muted/50">
        <CardHeader>
          <CardTitle>Mis Proyectos Recientes</CardTitle>
          <CardDescription>Estado de las últimas actualizaciones realizadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground italic">No hay actualizaciones recientes para mostrar.</div>
        </CardContent>
      </Card>
    </div>
  );
}
