import { useAppStore } from "@/store";
import { HOST } from "@/utils/constant";
import { createContext, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo, selectedChatData, selectedChatType, addMessage,addChannelInChannelList,addContactsInDMContacts } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReciveMessage = (message) => {
        if (selectedChatType !== undefined && 
          (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
          console.log("message rece", message);
          addMessage(message);
        }
        addContactsInDMContacts(message)
      };

      const handleReceiveChannelMessage = (message) => {
        if (selectedChatType !== undefined && selectedChatData._id === message.channelId) {
          console.log("message rece", message);
          addMessage(message);
        }
        addChannelInChannelList(message)
      };

      socket.current.on("receiveMessage", handleReciveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

      socket.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo, selectedChatData, selectedChatType, addMessage]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
