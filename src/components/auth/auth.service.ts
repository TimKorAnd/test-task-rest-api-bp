import { BadRequestException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Types } from 'mongoose';
import { TokensRepository } from '../repository/tokens.repository';
import { IToken } from '../tokens/interfaces/token.interface';
import { TokensService } from '../tokens/tokens.service';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { IAuthUserSignup } from './interfaces/auth.user-signup.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokensService,

    ) { }

    async signup(userSignup: IAuthUserSignup) {
        const user: IUser = await this.usersService.create(userSignup); // TODO it`s possible to increase db request to 2
        const token: IToken = await this.tokenService.create(user._id); // TODO if remove back relation from token to user
        user.token_id = token._id;
        user.save();

        return {
            user_id: user.id_user,
            token: token.token,
        }
    }

    async getValidUser(id_user: string, pass: string): Promise<any> {
        // check is user exists
        console.log(id_user);
        const user = await this.usersService.findOne({ id_user: id_user });
        console.log(user)
        if (!user) {
            throw new BadRequestException({
                message: `User with id: ${id_user} not found`, // TODO for test only. Remove email from response
            });
        }
        // passwor compare
        const passwordHash = createHash("sha256")
            .update(pass)
            .digest("hex");
        const isPasswordValid = user.password && (user.password === passwordHash);
        if (!isPasswordValid) {
            throw new BadRequestException({ message: 'Credential are invalid' });
        }
        // if already signin - error
        if (user.token_id) {
            const token = await this.tokenService.findById(user.token_id);
            if (token) {
                throw new BadRequestException({ message: 'User is already checkin' });
            }
        }
        // if not signin or token was expired and removed via ttl mongo
        const token: IToken = await this.tokenService.create(user._id);
        user.token_id = token._id;
        user.save();

        return {
            user_id: user.id_user,
            token: token.token,
        }
    }
}