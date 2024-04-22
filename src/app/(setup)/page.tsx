import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";
import { UserType } from "@/lib/types";
import { memberOfServers } from "@/lib/db/server-querys";
import { getUserServerSide } from "@/lib/server-side-utils";

export default async function SetupPage() { 
  const user = await getUserServerSide() as UserType;
  const servers = await memberOfServers(user.id)
  const server = servers[0];

  if(server) {
    return redirect(`/servers/${server.server_id}`);
  }

  return <InitialModal />;
}
