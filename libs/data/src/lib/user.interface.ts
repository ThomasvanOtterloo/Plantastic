import { Id } from './id.type'
import { Review } from './review.interface'


export interface UserLogin {
    name: string
    password: string
}

export interface UserIdentity extends UserLogin{
    id: Id
}

export interface UserInfo extends UserIdentity {
    username: string | undefined
    token: string
}

export interface User extends UserInfo {
    reviews: Review[]
    wallet: number
    friends: UserIdentity[]
    products: Id[]
}