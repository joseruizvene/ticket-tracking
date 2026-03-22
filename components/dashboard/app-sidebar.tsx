"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Section } from "@/app/page";
import {
  LayoutDashboard,
  AlertTriangle,
  Rocket,
  Gauge,
  Bug,
  Shield,
  Phone,
  Server,
  FileText,
  Settings,
  Search,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Role } from "@prisma/client";

interface AppSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  user?: {
    name: string;
    role: Role;
  } | null;
}

interface NavItem {
  id: Section;
  label: string;
  icon: LucideIcon;
  badge?: number;
  badgeColor?: "red" | "yellow" | "green";
}

const adminMenu: NavItem[] = [
  { id: "overview", label: "Proyectos", icon: LayoutDashboard },
  { id: "incidents", label: "Incidencias", icon: AlertTriangle, badge: 3, badgeColor: "red" },
  { id: "deployments", label: "Despliegues", icon: Rocket, badge: 8 },
  { id: "performance", label: "Rendimiento", icon: Gauge },
  { id: "errors", label: "Error Tracking", icon: Bug, badge: 24, badgeColor: "yellow" },
  { id: "sla", label: "SLA & Uptime", icon: Shield },
  { id: "oncall", label: "On-Call", icon: Phone },
  { id: "services", label: "Monitoreo de Web", icon: Server },
  { id: "postmortems", label: "Postmortems", icon: FileText },
];

const clientMenu: NavItem[] = [
  { id: "overview", label: "Mis Proyectos", icon: LayoutDashboard },
  { id: "incidents", label: "Soporte Técnico", icon: AlertTriangle },
  { id: "services", label: "Monitoreo de Web", icon: Server },
  { id: "settings", label: "Ajustes", icon: Settings },
];

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

export function AppSidebar({ activeSection, onSectionChange, user }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isClient = user?.role === Role.CLIENT;
  const menu = isClient ? clientMenu : adminMenu;
  const initials = user?.name?.split(" ").map(n => n[0]).join("") || "??";

  return (
    <aside className={cn(
      "h-screen bg-card border-r border-border flex flex-col shrink-0 transition-all duration-300",
      isCollapsed ? "w-[80px]" : "w-[260px]"
    )}>
      {/* Logo */}
      <div className={cn("h-16 flex items-center border-b border-border shrink-0", isCollapsed ? "justify-center" : "px-5 justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-chart-1 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-[15px] tracking-tight truncate">
              Suttaq Support
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-9 h-9 rounded-xl bg-chart-1 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        {!isCollapsed && (
            <button 
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="p-1.5 hover:bg-muted rounded text-muted-foreground ml-2 shrink-0"
              aria-label="Collapse sidebar"
            >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="pt-3 pb-2 flex justify-center shrink-0">
            <button 
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="p-1.5 hover:bg-muted rounded text-muted-foreground"
              aria-label="Expand sidebar"
            >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 flex flex-col">
        {/* Search - Admin Only */}
        {!isClient && !isCollapsed && (
          <div className="px-4 py-4 shrink-0">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-muted/60 hover:bg-muted transition-colors"
            >
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground flex-1 text-left truncate">Buscar...</span>
            </button>
          </div>
        )}

        {/* Favorites - Admin Only */}
        {!isClient && (
          <div className={cn("px-4 shrink-0", isCollapsed ? "mt-4" : "mb-2")}>
            {!isCollapsed && (
              <p className="px-2 mb-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider truncate">
                Quick Access
              </p>
            )}
            <nav className="space-y-0.5">
              {[adminMenu[1], adminMenu[2]].map((item) => (
                <NavButton
                  key={`fav-${item.id}`}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => onSectionChange(item.id)}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </div>
        )}

        {/* Main Menu */}
        <div className={cn("px-4 shrink-0", isCollapsed ? "mt-4" : "mt-4 flex-1")}>
          {!isCollapsed && (
            <p className="px-2 mb-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider truncate">
              {isClient ? "Mi Espacio" : "Operaciones"}
            </p>
          )}
          <nav className="space-y-0.5">
            {menu.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={() => onSectionChange(item.id)}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
        </div>

        {/* Historial (Movido desde el lado derecho) */}
        {!isCollapsed && (
          <div className="px-4 mt-6 mb-4 shrink-0">
            <p className="px-2 mb-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider truncate">
              Historial Reciente
            </p>
            <div className="space-y-2 px-2">
              {recentActivity.slice(0, isClient ? 2 : 3).map((item) => (
                 <div key={item.id} className="flex items-start gap-2.5 text-left group cursor-pointer hover:bg-muted/40 p-1.5 -mx-1.5 rounded-md transition-colors">
                  <div className="mt-0.5 shrink-0">
                    {item.type === "incident" && item.status === "active" ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                    ) : item.status === "success" ? (
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                    ) : item.type === "incident" && item.status === "resolved" ? (
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-destructive" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Settings & User */}
      <div className={cn("px-4 py-4 border-t border-border space-y-2 shrink-0 bg-card", isCollapsed ? "flex flex-col items-center" : "")}>
        {!isClient && (
          <NavButton
            item={{ id: "settings", label: "Configuración", icon: Settings }}
            isActive={activeSection === "settings"}
            onClick={() => onSectionChange("settings")}
            isCollapsed={isCollapsed}
          />
        )}
        
        {/* User Profile */}
        <div className={cn(
          "flex items-center rounded-xl",
          isCollapsed ? "justify-center p-2" : "gap-3 px-2 py-3"
        )}>
          <div className="w-9 h-9 rounded-full bg-chart-1/20 flex items-center justify-center shrink-0">
            <span className="text-chart-1 text-sm font-medium">{initials}</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || "Usuario"}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

function NavButton({ item, isActive, onClick, isCollapsed }: NavButtonProps) {
  const Icon = item.icon;

  const badgeColorClass = {
    red: "bg-destructive/15 text-destructive",
    yellow: "bg-warning/20 text-warning",
    green: "bg-success/15 text-success",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={isCollapsed ? item.label : undefined}
      className={cn(
        "flex items-center rounded-xl text-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isCollapsed ? "w-10 h-10 justify-center mx-auto" : "w-full gap-3 px-3 py-2.5",
        isActive
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-foreground/80 hover:bg-muted/80 hover:text-foreground"
      )}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : item.badgeColor
                    ? badgeColorClass[item.badgeColor]
                    : "bg-muted text-muted-foreground"
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}
