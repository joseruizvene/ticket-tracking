import { DashboardWrapper } from "@/components/dashboard/dashboard-wrapper";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export type Section = 
  | "overview" 
  | "incidents" 
  | "deployments" 
  | "performance" 
  | "errors"
  | "sla"
  | "oncall"
  | "services" 
  | "postmortems" 
  | "settings";

export default async function DashboardPage() {
  const session = await getSession();

  // En una app real sin mock, si no hay sesión redirigimos al login
  if (!session.user) {
    redirect("/login");
  }

  return <DashboardWrapper user={session.user} />;
}
