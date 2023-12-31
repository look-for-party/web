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
    rooms: string | string[]
}

export type InitSocketMessage = {
    rooms: RoomInfo[]
}

export type BroadcaseSocketMessage = {
    roomID: string
    content: string
}