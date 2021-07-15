import { Body, Controller, Post } from '@nestjs/common';
import { SkipAuth } from 'src/auth/skip-auth.decorator';
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service';

// Send emails

@Controller('users')
export class UserController {

  constructor(
    private readonly _userService: UserService
  ) { }

  @SkipAuth()
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this._userService.save(body)
  }
}
