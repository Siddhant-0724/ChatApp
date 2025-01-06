import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HOST } from "@/utils/constant";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACT_ROUTES } from "@/utils/constant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { getColor, useAppStore } from "@/store";

const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openContactModel, setOpenContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const SelectNewContact = (contact) => {
    setOpenContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => {
                setOpenContactModel(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openContactModel} onOpenChange={setOpenContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg bg-[#2c2e3b] border-none"
              onChange={(e) => {
                searchContact(e.target.value);
              }}
            />
          </div>
          {searchContact.length > 0 && (
            <ScrollArea className="h-250px">
              <div className="flex flex-col gap-5">
                {searchedContacts.length > 0 ? (
                  searchedContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="flex gap-3 items-center cursor-pointer"
                      onClick={() => {
                        SelectNewContact(contact);
                      }}
                    >
                      {/* Avatar Section */}
                      <div className="w-12 h-12 relative">
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
                      </div>

                      {/* Contact Details */}
                      <div className="flex flex-col">
                        <span>
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : `${contact.email}`}
                        </span>
                        <span className="text-sm">{contact.email}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all text-red-600 mt-10">
                    <Lottie
                      isClickToPauseDisabled={true}
                      height={100}
                      width={100}
                      options={animationDefaultOptions}
                    />
                    <div className="text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-2xl text-xl transition-all duration-300 text-center mt-5">
                      <h3 className="poppins-medium">
                        Hi Search{" "}
                        <span className="text-purple-500 text-3xl">
                          Contact
                        </span>
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
