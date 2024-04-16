import Image from "next/image";
import ThemeSwitch from "@/components/theme-switch";
import UserProfileMenu from "@/components/user-profile/user-profile-menu";

import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";
import { UserType } from "@/lib/types";
import { memberOfServers } from "@/lib/db/db-querys";
import { getUserServerSide } from "@/lib/server-side-utils";

export default async function SetupPage() { 
  const user = await getUserServerSide() as UserType;
  const servers = await memberOfServers(user.id)
  const server = servers[0];

  if(server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
