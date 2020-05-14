import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { User } from "./user.entity";

import { AuthCredentialsDto } from "./dto/auth.credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async sigUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        // const exist = this.findOne({ username })
        // if (exist) {}
        try {
            await user.save();
        } catch (error) {
            if (error.code == '23505') {      // code of duplicate username
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

}