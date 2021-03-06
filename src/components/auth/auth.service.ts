import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
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
        private readonly configService: ConfigService,

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
        const user = await this.usersService.findOne({ id_user: id_user });
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

    // TODO decompose this method
    public async validateRequest(request: any): Promise<boolean> {
        // is token present in bearer header?
        if (!request.headers?.['authorization']) {
            throw new UnauthorizedException();
        }

        const bearerToken = request.headers?.['authorization'].slice(7);
        if (!bearerToken) {
            throw new UnauthorizedException();
        }

        // is token presents in db?
        const tokenFromDB = await this.tokenService.findOne({ token: bearerToken });
        if (!tokenFromDB) {
            throw new UnauthorizedException();
        }

        // is user corresponding to this token present
        const userFromDB = await this.usersService.findOne({ token_id: tokenFromDB._id });
        if (!userFromDB) {
            tokenFromDB.remove();
            throw new UnauthorizedException();
        }

        // hm, authorized only where cross relation user <-> token is duplexy correct, (or redundant?)
        if ((userFromDB.token_id?.toString() !== tokenFromDB._id.toString()) ||
         (userFromDB._id.toString() !== tokenFromDB.user_id?.toString())) {
            await tokenFromDB.remove();
            userFromDB.token_id = null;
            await userFromDB.save();
            throw new UnauthorizedException();
        }
        // TODO for "except singin/logout" transfer below logic to separate middleware (or interseptor? Decorator? )
        // TODO and add it to specified method of users.contoller only
        tokenFromDB.expireAt = this.tokenService.getDateWithAddedMinutes(new Date(), this.configService.get<number>('TOKEN_LIFETIME_IN_MINUTES'))
        await tokenFromDB.save();
        request.user = userFromDB;

        return true;
    }
}