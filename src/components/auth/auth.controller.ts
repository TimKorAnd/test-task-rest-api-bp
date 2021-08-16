import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TransformEmailToLowerCaseAndHashPasswordPipe } from './pipes/auth.signup-transform.pipe';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  signup(@Body(TransformEmailToLowerCaseAndHashPasswordPipe) signupDto: SignupDto) {
    console.dir(signupDto); // TODO remove
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  //signin(@Body(TransformEmailToLowerCaseAndHashPasswordPipe) signinDto: SigninDto) {
  async signin(@Request() req) {
    console.log('controller signin');
    return req.user;
    //return this.authService.signin(signinDto);
  }
}
