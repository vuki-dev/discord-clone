import ServerSidebar from "@/components/server/server-sidebar";
import { getServer } from "@/lib/db/server-querys";
import { getUserServerSide } from "@/lib/server-side-utils";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const user = await getUserServerSide();
  console.log(user.id)

  if (!user) {
    return redirect("/login");
  }

  const server = await getServer(params.serverId, user.id);

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20
      flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  );
};

export default ServerIdLayout;
