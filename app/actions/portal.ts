"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Role } from "@/lib/types";

export async function createPortalAction(formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;

  if (!name) return { error: "El nombre es obligatorio" };

  try {
    const portal = await prisma.portal.create({
      data: { name, url },
    });
    return { success: true, portal };
  } catch (error) {
    return { error: "Error al crear el portal" };
  }
}

export async function fetchPortalsAction() {
  const session = await getSession();
  if (session.user?.role !== Role.ADMIN) return { error: "Solo administradores" };

  try {
    const portals = await prisma.portal.findMany({
      include: {
        _count: {
          select: { tickets: true, users: true }
        }
      }
    });
    return { success: true, portals };
  } catch (error) {
    return { error: "Error al recuperar portales" };
  }
}
