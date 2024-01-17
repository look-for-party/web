export const INIT = 'init' // get history chat, information about user, rooms, etc at first load
export const JOIN = 'join'
export const LOAD_HISTORY = 'load_history' // load history chat

// broadcast event
// client side: it is the received message by client as all information about the message
// server side: it is the message sent by user, received by server as raw socket message
export const BROADCAST = 'broadcast'
export const LEAVE = 'leave'   // only when user leave party, they also have to leave the room
