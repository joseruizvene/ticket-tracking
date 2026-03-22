"use client";

import { useState } from "react";
import type { Section } from "@/app/page";
import { AppSidebar } from "./app-sidebar";
import { MainContent } from "./main-content";
import { Role } from "@prisma/client";

interface DashboardWrapperProps {
  user?: {
    id: string;
    name: string;
    role: Role | string;
  } | null;
}

export function DashboardWrapper({ user }: DashboardWrapperProps) {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  // Forzamos el tipado a Role por si viene casteado como string desde auth
  const castedUser = user ? { ...user, role: user.role as Role } : null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        user={castedUser}
      />
      <MainContent activeSection={activeSection} onSectionChange={setActiveSection} user={castedUser} />
    </div>
  );
}
