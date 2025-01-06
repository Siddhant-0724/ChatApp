import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor, useAppStore } from "@/store";
import { HOST } from "@/utils/constant";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 boder-[#2f303b] flex items-center justify-between px-10">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 flex text-lg border-[1px] items-center justify-center rounded-full ${getColor(
                      selectedChatData.color
                    )}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.charAt(0)
                      : selectedChatData.email.charAt(0)}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#fffff22] h-10 w-10 flex items-center justify-center rounded-full">
                {selectedChatData.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            {console.log(selectedChatData)}
            {selectedChatType === "channel" && selectedChatData.name}

            {selectedChatType === "contact" &&
              `${selectedChatData.firstName || selectedChatData.email} ${
                selectedChatData.lastName || ""
              }`}
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
