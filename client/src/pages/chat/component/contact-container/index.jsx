import React, { useEffect } from "react";
import ProfileInfo from "./component/profile-component";
import NewDM from "./component/new-dm";
import { apiClient } from "@/lib/api-client";
import { GET_CONTACT_FOR_DM_ROUTES, GET_USER_CHANNEL_ROUTES } from "@/utils/constant";
import { useAppStore } from "@/store";
import ContactList from "@/components/ContactList";
import CreateChannel from "./component/create-channel";

const ContactContainer = () => {
  const {setdirectMessageContact,directMessageContact,channels,setChannels} = useAppStore()
 try {
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_CONTACT_FOR_DM_ROUTES, {
          withCredentials: true,
        });
        if (response.data.contacts) {
          setdirectMessageContact(response.data.contacts);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    const getChannels = async () => {
      try {
        const response = await apiClient.get(GET_USER_CHANNEL_ROUTES, {
          withCredentials: true,
        });
        if (response.data.channels) {
          setChannels(response.data.channels);
        }
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
  
    getContacts();
    getChannels();
  }, [setdirectMessageContact, setChannels]);
  
 } catch (error) {
  console.log(error)
 }
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
        <div className="my-5">
          <div className="flex items-center justify-between pr-10">
            <Title text="Direct Messages" />
            <NewDM />
          </div>
          <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
            <ContactList contacts={directMessageContact}/>
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between pr-10">
            <Title text="Channels" />
            <CreateChannel/>
          </div>
          <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
            <ContactList contacts={channels} isChannel={true}/>
          </div>
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Chat Bubble */}
        <path
          d="M25 0C11.1935 0 0 9.84974 0 22C0 26.7597 1.73835 31.1639 4.74174 34.7117L1.36869 43.4102C0.909773 44.6043 2.16103 45.7292 3.23923 44.9474L12.6495 38.2675C16.4844 39.7885 20.6129 40.6613 25 40.6613C38.8065 40.6613 50 30.8116 50 18.6613C50 8.3497 38.8065 0 25 0Z"
          fill="#6C63FF"
        />
        {/* Inner Chat Tail */}
        <path
          d="M25 7C14.9736 7 7 13.7133 7 21.6613C7 25.1711 8.53271 28.3037 11.0714 30.6471L9.73784 35.8932C9.44159 37.0767 10.7108 38.0174 11.789 37.2516L19.8947 31.6613C21.9579 32.3191 23.9701 32.6613 26 32.6613C36.0264 32.6613 44 25.948 44 18C44 10.052 36.0264 7 25 7Z"
          fill="#BDA0FF"
        />
        {/* Three Message Dots */}
        <circle cx="16" cy="18" r="3" fill="white" />
        <circle cx="25" cy="18" r="3" fill="white" />
        <circle cx="34" cy="18" r="3" fill="white" />
      </svg>
      <span className="text-3xl font-semibold ">QuickChat</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className=" font-semibolduppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
