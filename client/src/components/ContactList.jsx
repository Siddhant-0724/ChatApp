import { getColor, useAppStore } from "@/store";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constant";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);

    // Clear messages when switching between contacts
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#2a2b33]"
          }`}
          onClick={() => handleClick(contact)} // Fixed click event
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 flex text-lg border-[1px] items-center justify-center rounded-full ${getColor(
                      contact.color
                    )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.charAt(0)
                      : contact.email.charAt(0)}
                  </div>
                )}
              </Avatar>
            )}

            {isChannel && (
              <div className="bg-[#fffff22] h-10 w-10 flex items-center justify-center rounded-full">
                {contact.name ? contact.name.charAt(0) : "?"}
              </div>
            )}

            <span>
              {isChannel
                ? contact.name
                : `${contact.firstName}${
                    contact.lastName ? " " + contact.lastName : ""
                  }`} {/* Fixed lastName */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;