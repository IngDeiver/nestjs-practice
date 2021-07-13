import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/loca-auth.guard';
import { SkipAuth } from './skip-auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return this._authService.createJwt(req.user)
    }

    @SkipAuth()
    @Post('renewAccessToken')
    renewAccessToken(@Body() refresh_token: RefreshTokenDto) {
        return this._authService.renewJwt(refresh_token)
    }

    @Get('profile') // Require auth 
    getProfile(@Req() req) {
        return req.user;
    }

}
