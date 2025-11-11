import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UserRegisterDto {
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(5, { message: "Пароль должен быть не менее 5 символов" })
  password: string;

  @IsOptional()
  @IsString({ message: "Incorrect role" })
  role?: string;
}
