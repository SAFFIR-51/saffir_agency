import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  FindEmailDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const IS_PROD = process.env.NODE_ENV === 'production';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7일

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ── Google ──────────────────────────────────────────────
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleCallback(req, res);
  }

  // ── Kakao ───────────────────────────────────────────────
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleCallback(req, res);
  }

  // ── Naver ───────────────────────────────────────────────
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  naverLogin() {}

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleCallback(req, res);
  }

  // ── 로컬(이메일·비밀번호) ────────────────────────────────
  /** 회원가입 — 성공 시 바로 로그인 상태로 만든다 */
  @Post('register')
  @HttpCode(201)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.register(dto);
    this.setAuthCookie(res, user);
    return this.publicUser(user);
  }

  /** 로그인 — 무차별 대입 방지로 분당 10회로 제한 */
  @Post('login')
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateLocal(dto.email, dto.password);
    this.setAuthCookie(res, user);
    return this.publicUser(user);
  }

  /** 아이디(가입 이메일) 찾기 — 이름 + 연락처, 결과는 마스킹해서 돌려준다 */
  @Post('find-email')
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  findEmail(@Body() dto: FindEmailDto) {
    return this.authService.findEmail(dto);
  }

  /** 비밀번호 찾기 — 재설정 링크 메일 발송. 계정 유무와 무관하게 같은 응답. */
  @Post('forgot-password')
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.requestPasswordReset(dto.email);
  }

  /** 비밀번호 재설정 — 메일 링크의 1회용 토큰 사용 */
  @Post('reset-password')
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.password);
    return { ok: true };
  }

  // ── Shared callback handler ──────────────────────────────
  private async handleCallback(req: Request, res: Response) {
    const user = await this.authService.findOrCreateUser(req.user as any);
    this.setAuthCookie(res, user);
    res.redirect(`${FRONTEND_URL}/portal`);
  }

  private setAuthCookie(
    res: Response,
    user: { id: number; name: string; email: string; role: string },
  ) {
    res.cookie('access_token', this.authService.issueToken(user), {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: IS_PROD ? 'none' : 'lax',
      maxAge: COOKIE_MAX_AGE,
    });
  }

  /** 비밀번호 해시 등 내부 필드는 절대 내보내지 않는다 */
  private publicUser(user: { id: number; name: string; email: string; role: string }) {
    return { sub: user.id, name: user.name, email: user.email, role: user.role };
  }

  // ── Me ──────────────────────────────────────────────────
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }

  // ── Logout ──────────────────────────────────────────────
  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.redirect(FRONTEND_URL);
  }
}
