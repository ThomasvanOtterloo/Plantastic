import { Id } from './id.type'
import { Review } from './review.interface'

export interface UserIdentity extends UserLogin{
    id: Id
    name: string
}

export interface UserInfo extends UserIdentity {
    username: string | undefined
    email: string
    token: string

}

export interface User extends UserInfo {
    reviews: Review[]
    wallet: number
}

export interface UserLogin {
    name: string
    password: string
}
