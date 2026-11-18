import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(config: ConfigService) {
    super({
      clientID: config.getOrThrow('KAKAO_CLIENT_ID'),
      clientSecret: config.getOrThrow('KAKAO_CLIENT_SECRET'),
      callbackURL: `${config.getOrThrow('CALLBACK_BASE_URL')}/api/auth/kakao/callback`,
      scope: ['profile_nickname', 'account_email'],
    } as any);
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, _json } = profile;
    const kakaoAccount = _json?.kakao_account;

    const name =
      kakaoAccount?.profile?.nickname ||
      _json?.properties?.nickname ||
      profile.displayName ||
      `카카오사용자_${id}`;

    const email = kakaoAccount?.email ?? null;

    done(null, {
      provider: 'kakao',
      providerId: String(id),
      name,
      email,
    });
  }
}
