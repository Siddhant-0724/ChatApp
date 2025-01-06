export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessageContact: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgess: 0,
  channels: [],
  addChannel: (newChannel) => {
    const { channels } = get(); // Get existing channels
    set({ channels: [newChannel, ...channels] }); // Add new channel
  },
  setChannels: (channels) => set({ channels }), // Use correct property
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgess: (fileDownloadProgess) => set({ fileDownloadProgess }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setdirectMessageContact: (directMessageContact) => {
    set({ directMessageContact });
  },
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addChannelInChannelList: (message) => {
    const channels = get().channels; // Get the channels array
    const index = channels.findIndex(
      (channel) => channel._id === message.channelId
    );

    // If the channel already exists, move it to the top
    if (index !== -1) {
      const updatedChannel = channels[index];
      const updatedChannels = [
        updatedChannel, // Move the matched channel to the front
        ...channels.filter((_, i) => i !== index), // Keep others intact
      ];
      set({ channels: updatedChannels }); // Update the state
    } else {
      // If the channel doesn't exist, add it to the top
      set({ channels: [message, ...channels] });
    }
  },

  addContactsInDMContacts: (message) => {
    const userId = get().userInfo.id; // Get the current user ID
    const fromId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id; // Determine the contact ID
  
    const formData =
      message.sender._id === userId ? message.recipient : message.sender; // Contact data
    const dmContacts = get().directMessageContact; // Get existing DM contacts
  
    // Find the contact in the list
    const index = dmContacts.findIndex((contact) => contact._id === fromId);
  
    let updatedContacts = [...dmContacts]; // Copy array to maintain immutability
  
    if (index !== -1) {
      // Move existing contact to the top
      const [existingContact] = updatedContacts.splice(index, 1); // Remove from current position
      updatedContacts.unshift(existingContact); // Add to the top
    } else {
      // Add new contact to the top
      updatedContacts.unshift(formData);
    }
  
    // Update state with new list
    set({ directMessageContact: updatedContacts });
  }
  
});
