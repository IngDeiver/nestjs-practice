import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/users/user';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/Jwt.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayload } from './dto/jwt-payload.dto'

const ACCESS_TOKEN_EXPIRE = '1d'
const REFRESH_TOKEN_EXPIRE = '120 days'

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UserService,
        private readonly _jwtService: JwtService
    ) { }

    async validateUser(email: string): Promise<UserDocument> {
        const userFound: UserDocument = await this._usersService.finByEmail(email)
        return userFound
    }

    async createJwt(user: UserDocument): Promise<JwtDto> {
        const payload = { username: user.username, sub: user._id }

        const access_token: string = await this._jwtService.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRE })
        const refresh_token: string = await this._jwtService.sign(payload, { expiresIn: REFRESH_TOKEN_EXPIRE })

        const jwt: JwtDto = { access_token, refresh_token }
        return jwt
    }

    async renewJwt(refreshToken: RefreshTokenDto): Promise<JwtDto> {
        const token = refreshToken.refresh_token
        try {
            const refesh_token_payload: JwtPayload = (this._jwtService.verify(token) as JwtPayload)
            const payload = { sub: refesh_token_payload.sub, username: refesh_token_payload.username }


            const access_token: string = await this._jwtService.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRE })
            const refresh_token: string = await this._jwtService.sign(payload, { expiresIn: REFRESH_TOKEN_EXPIRE })

            const jwt: JwtDto = { access_token, refresh_token }
            return jwt
        } catch (error) {
            throw new UnauthorizedException(error?.message)
        }

    }

    comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
