import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../shared/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserWithPasswordByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  getUserBy(filter: Partial<User>) {
    return this.userRepository.findOne({
      where: filter,
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(createdUser);

    return this.getUserBy({ id: createdUser.id });
  }

  async updateUser(id: number, user: Partial<User>) {
    await this.userRepository.update(id, user);
    return this.getUserBy({ id });
  }

  getUsersShrink() {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.name')
      .addSelect('user.email')
      .getMany();
  }

  getUserShrinkBy(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user.id')
      .addSelect('user.name')
      .addSelect('user.email')
      .getOne();
  }
}
