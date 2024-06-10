import { getUserServerSide } from "@/lib/server-side-utils";
import { UserType } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useUser = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/current-user`,
          {
            headers: {
              "Authorization": `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setUser(currentUser.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default useUser;
