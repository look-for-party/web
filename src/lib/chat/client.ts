import { io, type Socket } from 'socket.io-client';
import { JOIN, LEAVE, BROADCAST, INIT } from './events';
import type { InitSocketMessageFromClient, JoinSocketMessage, RoomMessageInfo, UserInfo, InitSocketMessageFromServer, LeaveSocketMessage, BroadcastSocketMessage } from './types'
import { writable } from 'svelte/store';

let socket: Socket
let connected = false;

// stores for signaling components
export const messageSender = writable<BroadcastSocketMessage | null>(null)
export const messageReceiver = writable<RoomMessageInfo | null>(null)
export const initStore = writable<InitSocketMessageFromServer | null>(null)
export const joinStore = writable<JoinSocketMessage | null>(null)
export const leaveStore = writable<LeaveSocketMessage | null>(null)

export const connect = (auth: { [key: string]: any } | undefined) => {
    if (connected) return;
    socket = io({
        auth
    });
    connected = true;
    socket.on('connect', () => {
        // mock data, to be removed
        const initMsg: InitSocketMessageFromClient = {
            rooms: ['1']
        }
        // init request from client
        socket.emit(INIT, initMsg)
    })

    // before this event occurs, show loading screen
    // init response from server
    socket.on(INIT, (msg: InitSocketMessageFromServer) => {
        // TODO: do something with rooms
        console.log("Initialize")
        initStore.set(msg)
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

    socket.on(LEAVE, (msg: LeaveSocketMessage) => {
        // when the user leaves party, user also leaves the room
        // TODO: update view, if the user is self, remove contact from contact list, else show notification
        console.log("Leave")
    })

    socket.on(JOIN, (msg: JoinSocketMessage) => {
        // when the user joins party, user also joins the room
        // TODO: update view, if the user is self, add contact to contact list, else show notification
        console.log("Join")
    })
};

