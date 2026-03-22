"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function logErrorAction(portalId: string, message: string, stack?: string) {
  try {
    const errorLog = await prisma.errorLog.create({
      data: {
        message,
        stack_trace: stack,
        portal_id: portalId,
      },
    });
    revalidatePath("/");
    return { success: true, id: errorLog.id };
  } catch (error) {
    console.error("Failed to log error:", error);
    return { error: "Failed to record error log" };
  }
}

export async function registerDeploymentAction(portalId: string, version: string, status: string = "SUCCESS") {
  try {
    const deployment = await prisma.deployment.create({
      data: {
        version,
        status,
        portal_id: portalId,
      },
    });
    revalidatePath("/");
    return { success: true, id: deployment.id };
  } catch (error) {
    console.error("Failed to register deployment:", error);
    return { error: "Failed to record deployment" };
  }
}
