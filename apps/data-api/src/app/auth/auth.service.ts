import { Injectable } from '@nestjs/common';

import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Identity, IdentityDocument } from './identity.schema';
import { User, UserDocument } from '../user/user.schema';
import {UserInfo} from "@find-a-buddy/data";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(username: string): Promise<string> {
        const user = new this.userModel({username});
        await user.save();
        return user.id;
      }

    async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) reject(err);
                else resolve(payload);
            })
        })
    }

    async registerUser(username: string, password: string) {
        const generatedHash = await hash(password, parseInt(process.env.SALT_ROUNDS, 10));

        const identity = new this.identityModel({username, hash: generatedHash});

        console.log('registerUser', identity);

        await identity.save();
    }

    async generateToken(username: string, password: string): Promise<UserInfo> {
        const identity = await this.identityModel.findOne({username});

        console.log('generateToken', identity);
        if (!identity || !(await compare(password, identity.hash))) throw new Error("user not authorized");

        const user = await this.userModel.findOne({username: username});

        return new Promise((resolve, reject) => {
            sign({username, id: user.id}, process.env.JWT_SECRET, (err: Error, token: string) => {
                if (err) reject(err);
                else resolve({token: token, id: user.id, username: username, password: ''});
            });
        })
    }
}
/*
* {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRob21hcyIsImlkIjoiYzY1MDYwYzUtNTE4NC00MzJiLWE1NWEtMGUwNjkyNmE1NDg2IiwiaWF0IjoxNjY5NzMwMjcyfQ.4HgW4vSfKvwDhsRAyf-QwioHfheEH9Ar9tD_b6WSAyc","id":"c65060c5-5184-432b-a55a-0e06926a5486","username":"thomas","password":"","name":""}
* */