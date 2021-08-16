import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'id',
            passwordField: 'password',
        });
    }

    async validate(id_user: string, password: string): Promise<any> {
        console.log(
            'validate'
        );
        const user = await this.authService.getValidUser(id_user, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}