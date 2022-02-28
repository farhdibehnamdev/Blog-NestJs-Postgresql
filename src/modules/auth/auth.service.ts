import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "../user/model/user.entity";
import { UserService } from "../user/user.service";
import { SignInDto } from "./model/signin.dto";

import * as bcrypt from "bcrypt";
import { SignUpDto } from "./model/signup.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }


  async signUp(user: SignUpDto) {


    const usersExist = await this.userService.findByEmailOrUsername(user.email, user.username);
    if (usersExist.length > 0)
      throw new BadRequestException("Email or username already exist");

    let newUser = {
      ...user,
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    const createdUser = await this.userService.create(newUser as UserEntity);



    return this.jwtSignUserId(createdUser.id);
  }


  async signIn(user: SignInDto): Promise<object> {
    const userExist = await this.userService.findOneByUsername(user.username);
    if (!userExist)
      throw new UnauthorizedException('invalid credentials');

    const passwordIsMatch = await bcrypt.compare(user.password, userExist.password);
    if (!passwordIsMatch)
      throw new UnauthorizedException('invalid credentials');

    return this.jwtSignUserId(userExist.id);
  }


  jwtSignUserId(userId: number): object {
    return {
      access_token: this.jwtService.sign({ userId })
    }
  }




}