import { memberOfServers } from "@/lib/db/server-queries";
import { getUserServerSide } from "@/lib/server-side-utils";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeSwitch from "@/components/theme-switch";
import UserProfileMenu from "@/components/user-profile/user-profile-menu";

import NavigationAction from "./navigation-action";
import { NavigationItem } from "./navigation-item";

const NavigationSidebar = async () => {
  const user = await getUserServerSide();

  if (!user) {
    return redirect("/");
  }

  const servers = await memberOfServers(user.id);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.server_id} imageUrl={server.image_url} name={server.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeSwitch />
        <UserProfileMenu />
      </div>
    </div>
  );
};

export default NavigationSidebar;
