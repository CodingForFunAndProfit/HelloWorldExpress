import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailUnique } from './isEmailUnique';
import { PasswordInput } from './PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(3, 30)
    public firstName!: string;

    @Field()
    @Length(3, 30)
    public lastName!: string;

    @Field()
    @IsEmail()
    @IsEmailUnique({ message: 'email is already registered' })
    public email!: string;
}