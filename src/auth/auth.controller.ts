import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
// import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // http://localhost:3000/auth/signup
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        console.log(authCredentialsDto)
        return this.authService.signUp(authCredentialsDto);
    }

    // http://localhost:3000/auth/signin
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        console.log(authCredentialsDto)
        return this.authService.sigIn(authCredentialsDto);
    }


    // http://localhost:3000/auth/test
    // in section Headers in field key write Authorization | in field value write Bearer eJh***token**z1.....
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        // req is n object with our user data
        console.log(user);
    }


}
