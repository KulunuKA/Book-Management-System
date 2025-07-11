import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { AuthPayload } from './entities/authPayload.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private jwtService: JwtService) {}

  private generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async create(input: CreateUserInput): Promise<AuthPayload> {
    const hashedPassword = await bcrypt.hash(input.password, 8);

    const newUser: User = {
      id: uuidv4(),
      email: input.email,
      password: hashedPassword,
    };

    this.users.push(newUser);

    const token = this.generateToken({
      id: newUser.id,
      email: newUser.email,
    });

    return {
      user: newUser,
      token,
    };
  }

  async login(input: CreateUserInput): Promise<AuthPayload> {
    const user = this.users.find((u) => u.email === input.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }
}
