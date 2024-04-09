import Image from "next/image";
import ThemeSwitch from "@/components/theme-switch";
import UserProfileMenu from "@/components/user-profile/user-profile-menu";

export default function Home() { 
  return (
    <div>
      <div className="flex gap-2 p-2" >
        <UserProfileMenu />
        <ThemeSwitch />
      </div>
      <h1>Hello discord clone</h1>
    </div>
  );
}
