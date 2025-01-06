export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth";
export const CONTACT_ROUTES = "api/contacts";
export const MESSAGE_ROUTES = "api/messages";
export const CHANNEL_ROUTES = "api/channel";


export const SINGUP_ROUTES = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTES = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMAGE_ROUTES = `${AUTH_ROUTES}/add-profile-img`
export const REMOVE_PROFILE_IMAGE_ROUTES = `${AUTH_ROUTES}/remove-profile-img`
export const LOGOUT = `${AUTH_ROUTES}/logout`



export const SEARCH_CONTACT_ROUTES = `${CONTACT_ROUTES}/search`
export const GET_CONTACT_FOR_DM_ROUTES = `${CONTACT_ROUTES}/get-contact-for-dm`
export const GET_ALL_CONTACT = `${CONTACT_ROUTES}/get-all-contact`



export const UPLOAD_FILE_ROUTES = `${MESSAGE_ROUTES}/upload-file`
export const GET_MESSAGES_ROUTES = `${MESSAGE_ROUTES}/get-messages`

export const CREATE_CHANNEL_ROUTES = `${CHANNEL_ROUTES}/create-channel`
export const GET_USER_CHANNEL_ROUTES = `${CHANNEL_ROUTES}/get-user-channels`
export const GET_CHANNEL_MESSAGES_ROUTES = `${CHANNEL_ROUTES}/get-channel-messages`


