import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() @IsNotEmpty() @MaxLength(100) name!: string;
  @IsEmail() @MaxLength(200) email!: string;
  /** 규칙 검증은 password.ts 의 isStrongEnough 에서 한 번 더 한다 */
  @IsString() @MinLength(8) @MaxLength(72) password!: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string;
}

export class LoginDto {
  @IsEmail() @MaxLength(200) email!: string;
  @IsString() @IsNotEmpty() @MaxLength(72) password!: string;
}

/** 아이디(가입 이메일) 찾기 — 이름 + 연락처 */
export class FindEmailDto {
  @IsString() @IsNotEmpty() @MaxLength(100) name!: string;
  @IsString() @IsNotEmpty() @MaxLength(30) phone!: string;
}

export class ForgotPasswordDto {
  @IsEmail() @MaxLength(200) email!: string;
}

export class ResetPasswordDto {
  @IsString() @IsNotEmpty() @MaxLength(64) token!: string;
  @IsString() @MinLength(8) @MaxLength(72) password!: string;
}
