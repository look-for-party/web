// socket.io types
export type UserInfo = {
    id: string
    avatar: string  // url
    name: string
}

export type RoomInfo = {
    id: string
    icon: string    // url
    name: string
    members: UserInfo[]
    // undefined if not initialized, initialize when first time viewing the room
    history?: RoomMessageInfo[] 
}

export type RoomMessageInfo = {
    id: string
    userID: string
    roomID: string
    content: string
    timestamp: Date
}

export type JoinSocketMessage = {
    room: RoomInfo
    user: UserInfo
}
export type LeaveSocketMessage = {
    room: RoomInfo
    user: UserInfo
}

export type LoadHistorySocketMessage = {
    roomID: string
    history: RoomMessageInfo[]
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
