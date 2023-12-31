import type { ViteDevServer } from 'vite';
import { Server, type Socket } from 'socket.io'
import { INIT, JOIN, BROADCAST } from './events';
import type { BroadcaseSocketMessage, InitSocketMessage, JoinSocketMessage, RoomMessageInfo } from './types';
import { randomUUID } from 'crypto';

export const webSocketServer = {
    name: 'web-socket-server',
    configureServer(server: ViteDevServer) {
        if (!server.httpServer) return
        const io = new Server(server.httpServer)

        io.on('connection', (socket) => {
            initServerSideSocket(io, socket)
        })
    }
} 

function initServerSideSocket(io: Server, socket: Socket) {
    socket.data.user = socket.handshake.auth.user
    socket.on(JOIN, (join: JoinSocketMessage) => {
        socket.join(join.rooms)
        // initialize rooms data
        // consists of history chat, information about user, rooms, etc


        // mockdata, will be replaced data
        const im: InitSocketMessage = {
            rooms: [
                {
                    id: '1',
                    icon: '',
                    name: 'Room 1',
                    members: [],
                    history: []
                }
            ]
        }

        socket.emit(INIT, im)
    })

    socket.on(BROADCAST, (msg: BroadcaseSocketMessage) => {
        const message = createMessage(socket, msg)
        io.to(msg.roomID).emit(BROADCAST, message)
    })
}

function createMessage(socket: Socket, msg: BroadcaseSocketMessage): RoomMessageInfo {
    // TODO: do something with database
    return {
        id: randomUUID(),
        userID: socket.data.user.id,
        roomID: msg.roomID,
        content: msg.content,
        time: new Date()
    }
}