import { Equals, IsBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class RegisterDto {
  @IsString() @IsNotEmpty() @MaxLength(100) name!: string;
  @IsEmail() @MaxLength(200) email!: string;
  /** 규칙 검증은 password.ts 의 isStrongEnough 에서 한 번 더 한다 */
  @IsString() @MinLength(8) @MaxLength(72) password!: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string;
  @IsOptional() @IsString() @MaxLength(200) organization?: string;
  @IsOptional() @IsIn(['병원', '기업']) customerType?: string;
  /** 필수 동의(만 14세·이용약관·개인정보)를 모두 했는지. 화면에서 true로만 보낸다 */
  @IsOptional() @Equals(true) agreed?: boolean;
  @IsOptional() @IsBoolean() marketing?: boolean;
  /** 초대 링크로 가입할 때 (/invite?token=) */
  @IsOptional() @Matches(/^[a-f0-9]{64}$/) inviteToken?: string;
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

/** 포털 계정: 내 정보·회사 정보 수정. 빈 문자열이면 지운다 */
export class UpdateProfileDto {
  @IsOptional() @IsString() @IsNotEmpty() @MaxLength(100) name?: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string;
  @IsOptional() @IsString() @MaxLength(200) organization?: string;
  /** 숫자 10자리 (하이픈 있어도 됨) 또는 빈 값 */
  @IsOptional() @Matches(/^(\d{3}-?\d{2}-?\d{5})?$/, { message: '사업자등록번호는 숫자 10자리입니다.' })
  businessNumber?: string;
  @IsOptional() @ValidateIf((o: UpdateProfileDto) => o.taxEmail !== '') @IsEmail({}, { message: '세금계산서 이메일 형식을 확인해 주세요.' }) @MaxLength(200)
  taxEmail?: string;
}
