"use server";

import { Role } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string || Role.CLIENT;

  if (!name || !email || !password) {
    return { error: "Todos los campos son obligatorios" };
  }

  try {
    const supabase = await createClient();

    // 1. Registrar en Supabase Auth
    // Los roles y nombres se pasan en metadata para que el trigger de DB
    // los inserte automáticamente en la tabla de Prisma (public.users)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: role,
        },
      },
    });

    if (authError) {
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: "No se pudo crear el usuario en Auth. Revisa si el correo ya existe." };
    }

    // Ya no hacemos prisma.user.create aquí porque tenemos un trigger en la base de datos
    // que sincroniza auth.users -> public.users automáticamente.

    return { success: true };
  } catch (error) {
    console.error("Error en registro:", error);
    return { error: "Error inesperado durante el registro" };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Correo y contraseña son obligatorios" };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    // Buscamos el usuario en Prisma para obtener su rol y datos adicionales
    const userInDb = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: { role: true }
    });

    return { 
      success: true, 
      role: userInDb?.role || Role.CLIENT 
    };
  } catch (error) {
    console.error("Error en login:", error);
    return { error: "Error al iniciar sesión" };
  }
}
