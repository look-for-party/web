import { io, type Socket } from 'socket.io-client';
import { JOIN, LEAVE, BROADCAST, INIT, LOAD_HISTORY } from './events';
import type { LoadHistorySocketMessage, JoinSocketMessage, RoomMessageInfo, UserInfo, InitSocketMessageFromServer, LeaveSocketMessage, BroadcastSocketMessage, RoomInfo } from './types'
import { writable } from 'svelte/store';

let socket: Socket
let user: UserInfo
let connected = false;

// websocket stores
export const messageSender = writable<BroadcastSocketMessage | null>(null)
export const messageReceiver = writable<RoomMessageInfo | null>(null)

// local stores
// store id of the room that is currently viewed
export const currentRoomStore = writable<string | null>(null)
export const roomsStore = writable<RoomInfo[]>([])

export const connect = (u: UserInfo) => {
    if (connected) return;

    user = u;

    socket = io({
        auth: {
            user
        }
    });

    connected = true;
    socket.on('connect', () => {
        console.log("Connected")
    })

    // before this event occurs, show loading screen
    // init response from server
    socket.on(INIT, (msg: InitSocketMessageFromServer) => {
        // TODO: do something with rooms
        console.log("Initialize")
        roomsStore.set(msg.rooms)
        currentRoomStore.set(msg.rooms[0].id)
    })

    messageSender.subscribe((msg: BroadcastSocketMessage | null) => {
        if (msg) {
            socket.emit(BROADCAST, msg)
        }
    })

    socket.on(BROADCAST, (msg: RoomMessageInfo) => {
        // TODO: append message to messageFeed if the room is viewed, else show notification
        console.log("Broadcast")
        messageReceiver.set(msg)
    })

    socket.on(LOAD_HISTORY, (msg: LoadHistorySocketMessage) => {
        roomsStore.update((rooms) => {
            const room = rooms.find(room => room.id === msg.roomID)
            if (room) {
                room.history = msg.history
            }
            return rooms
        })
    })

    socket.on(LEAVE, (msg: LeaveSocketMessage) => {
        // when the user leaves party, user also leaves the room
        // TODO: update view, if the user is self, remove contact from contact list, else show notification
        console.log("Leave")
        roomsStore.update((rooms) => {
            if (msg.user.id === user.id) {
                return rooms.filter(room => room.id !== msg.room.id)
            } else {
                rooms.find(room => room.id === msg.room.id)?.members.filter(member => member.id !== msg.user.id)
                return rooms
            }
        })
    })

    socket.on(JOIN, (msg: JoinSocketMessage) => {
        // when the user joins party, user also joins the room
        // TODO: update view, if the user is self, add contact to contact list, else show notification
        console.log("Join")
        roomsStore.update((rooms) => {
            if (msg.user.id === user.id) {
                return [...rooms, msg.room]
            } else {
                rooms.find(room => room.id === msg.room.id)?.members.push(msg.user)
                return rooms
            }
        })
    })
};

