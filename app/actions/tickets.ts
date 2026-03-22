"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TicketStatus, Role } from "@/lib/types";
import { getSession } from "@/lib/auth";

export async function createTicketAction(formData: FormData) {
  const session = await getSession();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const portalId = formData.get("portalId") as string;
  const clientId = session.user?.id; // Obtenemos el ID de la sesión mock

  if (!title || !description || !portalId || !clientId) {
    return { error: "Faltan datos obligatorios para crear el ticket" };
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        portal_id: portalId,
        client_id: clientId,
        status: TicketStatus.OPEN,
      },
    });

    revalidatePath("/");
    return { success: true, ticket };
  } catch (error) {
    console.error("Error creating ticket:", error);
    return { error: "No se pudo crear el ticket" };
  }
}

export async function fetchTicketsAction() {
  const session = await getSession();
  if (!session.user) return { error: "No autorizado" };

  try {
    const where = session.user.role === Role.ADMIN ? {} : { client_id: session.user.id };
    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        portal: true,
      },
      orderBy: { created_at: "desc" },
    });
    return { success: true, tickets };
  } catch (error) {
    return { error: "Error al recuperar los tickets" };
  }
}

export async function updateTicketStatusAction(ticketId: string, status: TicketStatus) {
  try {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Error al actualizar el estado" };
  }
}
