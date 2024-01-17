import type { ViteDevServer } from 'vite';
import { Server, type Socket } from 'socket.io'
import { INIT, JOIN, BROADCAST, LEAVE } from './events';
import type { BroadcastSocketMessage, InitSocketMessageFromClient, InitSocketMessageFromServer, RoomMessageInfo } from './types';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
// import { REDIS_URL } from '$env/dynamic/private';
// console.log(process.env)
// console.log(import.meta.env)

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
    // const subscriber = new Redis();
    socket.data.user = socket.handshake.auth.user

    // get user rooms from database
    const rooms = ['1']

    socket.join(rooms)
    // if the user joins or leaves the party, must update immediately
    // use redis to publish the changes (leave or join)
    // published message will be "leave:userID" or "join:userID"
    // msg.rooms.forEach(roomID => {
    //     subscriber.subscribe(roomID, (err, msg) => {
    //         if (err) {
    //             console.error(err)
    //             return
    //         }
    //         if (!msg) return
    //         const [event, userID] = (msg as string).split(':')
    //         if (event === 'join') {
    //             if (socket.data.user.id === userID) {
    //                 socket.join(roomID)
    //             }
    //             socket.emit(JOIN)
    //         } else if (event === 'leave') {
    //             if (socket.data.user.id === userID) {
    //                 socket.leave(roomID)
    //             }
    //             socket.emit(LEAVE)
    //         }
    //     })
    // })

    // initialize rooms data
    // consists of history chat, information about user, rooms, etc


    // mockdata, will be replaced data
    const im: InitSocketMessageFromServer = {
        rooms: [
            {
                id: '1',
                icon: '',
                name: 'Room 1',
                members: [
                    {
                        id: '1',
                        name: 'deez nuts',
                        avatar: ''
                    },
                    {
                        id: '2',
                        name: 'peter griffin',
                        avatar: ''
                    }
                ],
                history: [
                    {
                        id: '1',
                        userID: '1',
                        roomID: '1',
                        content: 'Hello',
                        timestamp: new Date()
                    },
                    {
                        id: '2',
                        userID: '2',
                        roomID: '1',
                        content: 'Hi',
                        timestamp: new Date()
                    }
                ]
            },
            {
                id: '2',
                icon: '',
                name: 'Room 2',
                members: [
                    {
                        id: '1',
                        name: 'deez nuts',
                        avatar: ''
                    },
                    {
                        id: '3',
                        name: 'lois griffin',
                        avatar: ''
                    }
                ],
            }
        ]
    }

    socket.emit(INIT, im)

    socket.on(BROADCAST, (msg: BroadcastSocketMessage) => {
        const message = createMessage(socket, msg)
        io.to(msg.roomID).emit(BROADCAST, message)
    })

}

function createMessage(socket: Socket, msg: BroadcastSocketMessage): RoomMessageInfo {
    // TODO: do something with database
    return {
        id: randomUUID(),
        userID: socket.data.user.id,
        roomID: msg.roomID,
        content: msg.content,
        timestamp: new Date()
    }
}
