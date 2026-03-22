"use client";

import type { Section } from "@/app/page";
import { IncidentsContent } from "./content/incidents-content";
import { DeploymentsContent } from "./content/deployments-content";
import { PerformanceContent } from "./content/performance-content";
import { ErrorsContent } from "./content/errors-content";
import { SlaContent } from "./content/sla-content";
import { OncallContent } from "./content/oncall-content";
import { ServicesContent } from "./content/services-content";
import { PostmortemsContent } from "./content/postmortems-content";
import { SettingsContent } from "./content/settings-content";
import { Bell, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientDashboard } from "./client-dashboard";
import { AdminDashboard } from "./admin-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";
import { Role } from "@prisma/client";

interface MainContentProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  user?: {
    id: string;
    name: string;
    role: Role;
  } | null;
}

const sectionConfig: Record<Section, { title: string; subtitle: string }> = {
  overview: {
    title: "Proyectos",
    subtitle: "Estado general del soporte",
  },
  incidents: {
    title: "Incidencias",
    subtitle: "Tickets de soporte activos",
  },
  deployments: {
    title: "Despliegues",
    subtitle: "Historial de actualizaciones",
  },
  performance: {
    title: "Rendimiento",
    subtitle: "Salud técnica de las webs",
  },
  errors: {
    title: "Error Tracking",
    subtitle: "Logs de errores detectados",
  },
  sla: {
    title: "SLA & Uptime",
    subtitle: "Cumplimiento de servicio",
  },
  oncall: {
    title: "On-Call",
    subtitle: "Equipo de guardia",
  },
  services: {
    title: "Monitoreo de Web",
    subtitle: "Catálogo de proyectos entregados",
  },
  postmortems: {
    title: "Postmortems",
    subtitle: "Análisis de incidentes pasados",
  },
  settings: {
    title: "Configuración",
    subtitle: "Ajustes de la plataforma",
  },
};

export function MainContent({ activeSection, onSectionChange, user }: MainContentProps) {
  const config = sectionConfig[activeSection];

  const renderContent = () => {
    if (activeSection === "overview") {
      return user?.role === Role.CLIENT && user
        ? <ClientDashboard user={user} /> 
        : <AdminDashboard onSectionChange={onSectionChange} />;
    }

    switch (activeSection) {
      case "incidents":
        return <IncidentsContent />;
      case "deployments":
        return <DeploymentsContent />;
      case "performance":
        return <PerformanceContent />;
      case "errors":
        return <ErrorsContent />;
      case "sla":
        return <SlaContent />;
      case "oncall":
        return <OncallContent />;
      case "services":
        return <ServicesContent />;
      case "postmortems":
        return <PostmortemsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return user?.role === Role.CLIENT && user
            ? <ClientDashboard user={user} /> 
            : <AdminDashboard onSectionChange={onSectionChange} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-border bg-card shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            {config.title}
          </h1>
          <p className="text-sm text-muted-foreground">{config.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Time Range */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            <span>Last 24 hours</span>
          </Button>

          {/* Refresh */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>

          {/* Alerts */}
          <button
            type="button"
            className="relative p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Alerts"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </button>

          {/* Primary Action Removed */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div key={activeSection} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
