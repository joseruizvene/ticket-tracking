import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with Portals...");

  // Eliminar portales existentes para evitar duplicados si se corre varias veces
  await prisma.portal.deleteMany({});
  
  const portals = [
    { name: "E-commerce Cliente A", url: "https://ecommerce-a.com", ip_address: "192.168.1.10" },
    { name: "Landing Page Cliente B", url: "https://landing-b.com", ip_address: "192.168.1.11" },
    { name: "Portal Corporativo C", url: "https://portal-c.com", ip_address: "192.168.1.12" },
    { name: "Blog Informativo D", url: "https://blog-d.info", ip_address: "192.168.1.13" },
    { name: "Sistema CRM E", url: "https://crm-e.net", ip_address: "192.168.1.14" },
    { name: "App Móvil Backend F", url: "https://api-f.app", ip_address: "192.168.1.15" },
    { name: "Plataforma Educativa G", url: "https://edu-g.org", ip_address: "192.168.1.16" },
    { name: "Tienda Online H", url: "https://shop-h.com", ip_address: "192.168.1.17" },
    { name: "Sitio Web de Reservas I", url: "https://reservas-i.com", ip_address: "192.168.1.18" },
    { name: "Panel Administrativo J", url: "https://admin-j.com", ip_address: "192.168.1.19" },
  ];

  for (const portal of portals) {
    const created = await prisma.portal.create({
      data: portal,
    });
    console.log(`Created portal: ${created.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
