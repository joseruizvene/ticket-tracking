import { createClient } from "@/lib/supabase/server";

export async function getSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { user: null };
  }

  // To maintain compatibility with existing code that checks user.role
  const userRole = user.user_metadata?.role || "CLIENT";
  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email,
      role: userRole,
    }
  };
}
