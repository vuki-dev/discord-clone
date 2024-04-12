import Image from "next/image";
import ThemeSwitch from "@/components/theme-switch";
import UserProfileMenu from "@/components/user-profile/user-profile-menu";
import { getProfileById } from "@/lib/db-querys";
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function Home() { 
  const token = cookies().get("token")?.value;
  const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
  const profileId: string | unknown = verifiedToken.payload.payload;
  const profile = await getProfileById(profileId);
  console.log(profile)

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
