import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { UserSignUpInput } from './dto/user-sign-up.input';
import { UserLoginInput } from './dto/user-login.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async userSignUp(input: UserSignUpInput) {
    const password = await this.generatePasswordHash(input.password);
    const token = await this.signToken();

    return await this.userService.createUser({
      ...input,
      password,
      token,
    });
  }

  signToken(data: { [key: string]: any } = {}) {
    const jwt_secret_key = this.configService.get('JWT_SECRET_KEY');

    return jwt.sign(data, jwt_secret_key);
  }

  generatePasswordHash(pass: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pass, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }

  async userLogin({ email, password }: UserLoginInput) {
    const user = await this.userService.getUserWithPasswordByEmail(email);
    if (!user) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, async (err, match) => {
        if (err || !match) {
          return reject({
            message: 'wrong email or password',
            status: HttpStatus.UNPROCESSABLE_ENTITY,
          });
        }
        const newToken = await this.signToken();
        return resolve(
          this.userService.updateUser(user.id, { token: newToken }),
        );
      });
    });
  }

  getToken(authHeader?: string) {
    if (!authHeader) return;

    const match = authHeader.match(/[Bb]earer (?<token>.*)/);
    if (!match) return;

    const { token } = match.groups;
    return token;
  }

  async logout(user: User, res: Response) {
    await this.userService.updateUser(user.id, { token: '' });
    return res.status(HttpStatus.OK).send({ status: 'success' });
  }
}
