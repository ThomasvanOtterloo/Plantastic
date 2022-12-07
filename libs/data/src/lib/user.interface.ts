import { Id } from './id.type'
import { Review } from './review.interface'


export interface UserLogin {
    password: string
}

export interface UserIdentity extends UserLogin{
    id: Id
}

export interface friend extends UserInfo {

}

export interface UserInfo extends UserIdentity {
    username: string | undefined
    token: string
}

export interface User extends UserInfo {
    reviews: Review[]
    wallet: number
    following: UserIdentity[]
    products: Id[]
    orders: Id[]
}