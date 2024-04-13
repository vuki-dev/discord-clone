import Image from "next/image";
import ThemeSwitch from "@/components/theme-switch";
import UserProfileMenu from "@/components/user-profile/user-profile-menu";

import { cookies } from "next/headers";
import { getUserServerSide } from "@/lib/server-side-utils";
import { memberOfServers } from "@/lib/db-querys";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";
import { ProfileType } from "@/lib/types";

export default async function SetupPage() { 
  const token = cookies().get("token")?.value;
  const profile = await getUserServerSide(token) as ProfileType;
  const servers = await memberOfServers(profile.id)
  const server = servers[0];

  if(server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
