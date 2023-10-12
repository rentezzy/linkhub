import { Header } from "@/components/Header";
import { UserProviders } from "@/lib/UserProvider";
import { getSession, getUser } from "@/lib/supabase";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const session = await getSession();

  const accessToken = session?.access_token || null;
  return (
    <UserProviders accessToken={accessToken} user={user}>
      <Header />
      {children}
    </UserProviders>
  );
}
