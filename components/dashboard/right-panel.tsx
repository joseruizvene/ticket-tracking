"use client";

import { Activity, Clock, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Role } from "@prisma/client";

const recentActivity = [
  {
    id: 1,
    type: "incident",
    title: "Latencia en base de datos",
    time: "hace 2 min",
    status: "active",
  },
  {
    id: 2,
    type: "deploy",
    title: "E-commerce v2.3.1",
    time: "hace 15 min",
    status: "success",
  },
  {
    id: 3,
    type: "incident",
    title: "Error 503 en Auth",
    time: "hace 1 hora",
    status: "resolved",
  },
];

const oncallTeam = [
  {
    id: 1,
    name: "Sarah Miller",
    role: "Soporte Nivel 1",
    initials: "SM",
    status: "active",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "DevOps de Guardia",
    initials: "MC",
    status: "standby",
  },
];

export function RightPanel({ user }: { user?: { name: string, role: Role } | null | undefined }) {
  const isClient = user?.role === Role.CLIENT;

  return (
    <aside className="w-[280px] h-screen bg-card border-l border-border flex flex-col shrink-0 overflow-hidden">
      {/* System Status - Simplificado para cliente */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">Estado del Servicio</h3>
          <span className="flex items-center gap-1.5 text-xs font-medium text-success">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            {isClient ? "Soporte Activo" : "Operacional"}
          </span>
        </div>
        {!isClient && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Uptime</p>
              <p className="text-lg font-semibold text-foreground">99.98%</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">P95 Latency</p>
              <p className="text-lg font-semibold text-foreground">142ms</p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-muted-foreground" />
          {isClient ? "Tus Tickets Recientes" : "Actividad Reciente"}
        </h3>
        <div className="space-y-3">
          {recentActivity.slice(0, isClient ? 2 : 5).map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/60 transition-colors text-left group"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                item.status === "active" 
                  ? "bg-destructive/10" 
                  : item.status === "success" 
                    ? "bg-success/10" 
                    : "bg-muted"
              )}>
                {item.type === "incident" ? (
                  item.status === "active" ? (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )
                ) : item.status === "success" ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* On-Call Team - Admin Only */}
      {!isClient && (
        <div className="p-5 flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            Equipo de Soporte
          </h3>
          <div className="space-y-2">
            {oncallTeam.map((member) => (
              <button
                key={member.id}
                type="button"
                className="w-full flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/60 transition-colors text-left"
              >
                <div className="relative">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium",
                      member.status === "active" 
                        ? "bg-chart-1/20 text-chart-1" 
                        : member.status === "standby"
                          ? "bg-warning/20 text-warning"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {member.initials}
                  </div>
                  {member.status === "active" && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
