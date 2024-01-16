// socket.io types
export type UserInfo = {
    id: string
}

export type RoomInfo = {
    id: string
    icon: string    // url
    name: string
    members: UserInfo[]
    history: RoomMessageInfo[]
}

export type RoomMessageInfo = {
    id: string
    userID: string
    roomID: string
    content: string
    time: Date
}

export type JoinSocketMessage = {
    roomID: string
    user: UserInfo
}
export type LeaveSocketMessage = {
    roomID: string
    user: UserInfo
}

export type InitSocketMessageFromClient = {
    rooms: string[]
}

export type InitSocketMessageFromServer = {
    rooms: RoomInfo[]
}

export type BroadcastSocketMessage = {
    roomID: string
    content: string
}
