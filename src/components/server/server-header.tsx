"use client"
import { MemberRole, ServerType } from "@/lib/types"
import { DropdownMenu } from "@/components/ui/dropdown-menu";

interface ServerHeaderProps {
    server: ServerType;
    role?: MemberRole;
}

const ServerHeader = ({server, role}: ServerHeaderProps) => {
    const isAdmin = role === "ADMIN";
    const isModerator = isAdmin || role === "MODERATOR";

    return <div>Server Header</div>
}

export default ServerHeader;