const INIT = 'init' // get history chat, information about user, rooms, etc at first load
const JOIN = 'join'

// broadcast event
// client side: it is the received message by client as all information about the message
// server side: it is the message sent by user, received by server as raw socket message
const BROADCAST = 'broadcast'
const LEAVE = 'leave'   // only when user leave party


export {
    JOIN,
    BROADCAST,
    LEAVE,
    INIT
}