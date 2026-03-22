import { type NextRequest } from "next/server";
import { protectRoutesAndRefreshSession } from "@/middlewares/session-manager";

// ATENCIÓN: Next.js requiere obligatoriamente que este archivo de entrada 
// ("middleware.ts") exista en la raíz del proyecto. No se puede mover a otra 
// carpeta sin que Next.js lo ignore por completo.
export async function middleware(request: NextRequest) {
  // Aquí llamamos a tu manejador de sesión organizado en tu propia carpeta
  return await protectRoutesAndRefreshSession(request);
}

export const config = {
  matcher: [
    /*
     * Aplica el middleware en todas las request de las rutas de tu app excepto en:
     * - _next/static (archivos estáticos devueltos por next)
     * - _next/image (optimización de imagenes)
     * - favicon.ico (archivo de icono)
     * - imagenes dentro de public (.svg, .png, .jpg, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
