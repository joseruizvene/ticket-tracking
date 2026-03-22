"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LayoutDashboard, AlertCircle, Rocket, Bug } from "lucide-react";
import type { Section } from "@/app/page";

interface AdminDashboardProps {
  onSectionChange?: (section: Section) => void;
}

export function AdminDashboard({ onSectionChange }: AdminDashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Soporte Multicliente</h1>
        <p className="text-muted-foreground">Panel de control global para todos los proyectos entregados.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despliegues Hoy</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Sistemas actualizados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errores Críticos</CardTitle>
            <Bug className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Con soporte vigente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Últimas Incidencias</CardTitle>
            <CardDescription>Resumen de fallos reportados por los clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground italic">
              Cargando tickets de soporte...
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Salud de Portales</CardTitle>
            <CardDescription>Estado técnico de las webs alojadas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                <button type="button" onClick={() => onSectionChange?.("services")} className="w-full flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer text-left">
                    <span className="text-sm">E-commerce Cliente A</span>
                    <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Estable</span>
                </button>
                <button type="button" onClick={() => onSectionChange?.("services")} className="w-full flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer text-left">
                    <span className="text-sm">Landing Page Cliente B</span>
                    <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Estable</span>
                </button>
                <button type="button" onClick={() => onSectionChange?.("services")} className="w-full flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer text-left">
                    <span className="text-sm">Portal Corporativo C</span>
                    <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full">Errores</span>
                </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
