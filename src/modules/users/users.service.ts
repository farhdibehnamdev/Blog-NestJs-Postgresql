import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "src/shared/interfaces/user.interface";
import { UsersRepository } from "./users.repository";
import { getResponseMessage } from "../../shared/constants/messages.constant";
import { responseData } from "src/shared/functions/response.func";
import { Role, RoleType } from "../../shared/interfaces/role.interface";

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}

  getProfile(user: User) {
    const myUser = user;
    delete myUser.password;
    return myUser;
  }

  async updateRole(userId: number, role: string) {
    try {
      const hasRole: RoleType | null = Role[role];
      if (!hasRole)
        throw new BadRequestException(getResponseMessage("INVALID_ROLE"));
      await this.userRepo.update(userId, {
        role: hasRole,
      });

      return hasRole;
    } catch (error) {
      throw new BadRequestException(getResponseMessage("INVALID_USER_ID"));
    }
  }
}
