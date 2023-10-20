import { Header } from "@/components/Layout/Header";
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
      <main className="flex container h-[95vh] border-b border-primary mx-auto">
        <section className="w-full h-20 p-2">{children}</section>
      </main>
    </UserProviders>
  );
}
