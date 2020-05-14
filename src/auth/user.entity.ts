import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import * as bcrypt from 'bcrypt';



@Entity()
@Unique(['username'])       //check if user exist on backend side
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    //custom method
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;
    }
}