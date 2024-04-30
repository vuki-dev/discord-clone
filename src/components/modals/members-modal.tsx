"use client";

import { useModal } from "@/hooks/use-modal-store";

import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-profile/user-avatar";

import qs from 'query-string';
import { useState } from "react";
import axios from "axios";
 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { MemberRole } from "@/lib/types";
import { useRouter } from "next/navigation";

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500"/>
}

 export const MembersModal = () => {
  const router = useRouter();
  const {isOpen, onOpen, onClose, type, data} = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";

  const { server } = data;

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          server: server?.id,
        }
      })

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", {server: response.data});
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  }

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId
        }
      })

      const response = await axios.patch(url, { role })

      router.refresh();  
      onOpen("members", {server: response.data})
    } catch (err){
      console.log(err);
    } finally {
      setLoadingId("");
    }

  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage memebers
          </DialogTitle>
          <DialogDescription
            className=" text-center text-zinc-500"
          >
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member)=>(
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar />
              <div className="flex flex-col  gap-y-1">
                <div className="font-semibold text-xs flex items-center gap-x-1">
                  {member.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">
                  {member.email}
                </p>
              </div>
                {server.user_id !== member.user_id && 
                 loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger tabIndex={-1}>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem onClick={()=>{onRoleChange(member.id, "GUEST")}}>
                                <Shield className="h-4 w-4 mr-2" />
                                GUEST
                                {
                                  member.role === "GUEST" && (<Check className="h-4 w-4 ml-auto" />)
                                }
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>{onRoleChange(member.id, "MODERATOR")}}>
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                MODERATOR
                                {
                                  member.role === "MODERATOR" && (<Check className="h-4 w-4 ml-auto" />)
                                }
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {onKick(member.id)}}>
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                 )}
                 {loadingId === member.id && (
                  <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                 )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};