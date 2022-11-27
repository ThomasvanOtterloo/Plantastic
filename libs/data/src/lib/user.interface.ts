import { Id } from './id.type'
import { Review } from './review.interface'

export interface UserIdentity extends UserLogin{
    id: Id
    name: string
    products: Id[]
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

export interface UserLogin {
    name: string
    password: string
}
