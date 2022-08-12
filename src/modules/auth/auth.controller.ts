import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignInDto } from "src/modules/auth/dtos/signin.dto";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dtos/signup.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "signup",
  })
  @Post("signup")
  async signup(@Body() body: SignUpDto): Promise<Object> {
    return await this.authService.signUp(body);
  }

  @ApiOperation({
    summary: "signing",
  })
  @Post("signing")
  async signing(@Body() body: SignInDto): Promise<Object> {
    return await this.authService.signIn(body);
  }
}
