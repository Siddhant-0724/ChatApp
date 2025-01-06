import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { getColor, useAppStore } from "@/store";
import { HOST, LOGOUT } from "@/utils/constant";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo,setUserInfo } = useAppStore();
  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT,
        {},
        { withCredentials: true }
      );
      if(response.status===200){
        navigate('/auth')
        setUserInfo(null)
      toast.error("Logout Sucessfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logout");
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between p-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  flex text-lg border-[1px] items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
        <div className="flex gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FiEdit2
                  className="text-purple-500 font-medium text-xl"
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1e1b] border-none text-white">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoPowerSharp
                  className="text-blue-500 font-medium text-xl"
                  onClick={logout}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1e1b] border-none text-white">
                <p>Log Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
