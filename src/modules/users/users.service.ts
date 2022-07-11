import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { UserRequest } from './types/userRequestToken.entity';
import { Jwt } from './types/jwt.type';
import { UserResponse } from './entities/userResponse.entity';

@Injectable()
export class UsersService {
  private readonly baseUrl: string;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('USERS_URL');
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const { data } = await this.httpService.axiosRef.post<UserResponse>(
        `${this.baseUrl}/register`,
        createUserInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<UserResponse>(
        `${this.baseUrl}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async getToken(userRequest: UserRequest) {
    try {
      const { data } = await this.httpService.axiosRef.post<Jwt>(
        `${this.baseUrl}/login`,
        userRequest,
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
